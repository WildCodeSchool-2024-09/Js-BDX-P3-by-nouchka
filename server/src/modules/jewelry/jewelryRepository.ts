import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Jewelry = {
  id: number;
  type: string;
  stock: number;
  description: string;
  name: string;
  price: number;
  url: string;
};

class JewelryRepository {
  async create(jewelry: Omit<Jewelry, "id">) {
    const connection = await databaseClient.getConnection();

    try {
      await connection.beginTransaction();

      const [photos] = await connection.execute<Result>(
        `INSERT INTO photos
          (URL)
        VALUES (?) `,
        [jewelry.url],
      );
      const photos_id = photos.insertId;

      if (!photos_id) {
        throw new Error("Failed insertion into photos");
      }

      const [jewelryResult] = await connection.execute<Result>(
        `INSERT INTO jewelry 
          (type, stock, description, name, price) 
         VALUES (?, ?, ?, ?, ?)`,
        [
          jewelry.type,
          jewelry.stock,
          jewelry.description,
          jewelry.name,
          jewelry.price,
        ],
      );

      if (!jewelryResult.insertId) {
        throw new Error("Failed to insert into jewelry table.");
      }

      const [photos_jewelry] = await connection.execute<Result>(
        `INSERT INTO photos_jewelry
        (jewelry_id, photos_id)
        VALUES (?, ?)`,
        [jewelryResult.insertId, photos_id],
      );
      if (!photos_jewelry.insertId) {
        throw new Error("Failed to insert into photos_jewelry");
      }

      await connection.commit();

      return jewelryResult.insertId;
    } catch (error) {
      await connection.rollback();

      throw error;
    } finally {
      connection.release();
    }
  }

  async read(id: number) {
    const [rows] = await databaseClient.execute<Rows>(
      `SELECT * 
        FROM jewelry 
        INNER JOIN photos_jewelry ON jewelry.id = photos_jewelry.jewelry_id
        INNER JOIN photos ON photos_jewelry.photos_id = photos.id
        WHERE jewelry.id = ?`,
      [id],
    );

    return rows[0] as Jewelry;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT jewelry.*, photos.URL
      FROM jewelry
      INNER JOIN photos_jewelry ON jewelry.id = photos_jewelry.jewelry_id
      INNER JOIN photos ON photos_jewelry.photos_id = photos.id`,
    );

    return rows as Jewelry[];
  }

  async update(jewelry: Jewelry) {
    const connection = await databaseClient.getConnection();
    try {
      await connection.beginTransaction();
      const [rows] = await connection.execute<Result>(
        `UPDATE jewelry
        SET type=?, stock=?, description=?, name=?, price=?
        WHERE id = ?`,
        [
          jewelry.type,
          jewelry.stock,
          jewelry.description,
          jewelry.name,
          jewelry.price,
          jewelry.id,
        ],
      );
      if (!rows.affectedRows) {
        throw new Error("Failed update jewelry");
      }
      const [photos] = await connection.execute<Result>(
        `UPDATE photos 
          SET URL = ?
          WHERE id = (SELECT photos_id FROM photos_jewelry
          WHERE jewelry_id = ?)`,
        [jewelry.url, jewelry.id],
      );
      if (!photos.affectedRows) {
        throw new Error("Failed to update photos");
      }

      await connection.commit();
      return rows.affectedRows;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
  async delete(jewelryId: number) {
    const [result] = await databaseClient.execute<Result>(
      `DELETE jewelry, photos, photos_jewelry
       FROM jewelry
       INNER JOIN photos_jewelry ON photos_jewelry.jewelry_id = jewelry.id
       INNER JOIN photos ON photos.id = photos_jewelry.photos_id
       WHERE jewelry.id = ?`,
      [jewelryId],
    );

    return result.affectedRows;
  }
}

export default new JewelryRepository();
