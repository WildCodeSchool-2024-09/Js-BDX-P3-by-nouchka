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

      const [photos] = await connection.query<Result>(
        `INSERT INTO photos
          (URL)
        VALUES (?) `,
        [jewelry.url],
      );
      const photos_id = photos.insertId;

      const [jewelryResult] = await connection.query<Result>(
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
        await connection.rollback();
        throw new Error("Failed to insert into jewelry table.");
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
    const [rows] = await databaseClient.query<Rows>(
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
    const [rows] = await databaseClient.query<Result>(
      `UPDATE photos 
        SET URL = ?
        WHERE id = (SELECT photos_id FROM photos_jewelry
        WHERE jewelry_id = ?)`,
      [jewelry.url, jewelry.id],
    );

    return rows.affectedRows > 0;
  }
  async delete(jewelryId: number) {
    const connection = await databaseClient.getConnection();

    try {
      await connection.beginTransaction();

      const [result] = await connection.query<Result>(
        `DELETE FROM jewelry 
             WHERE id = ?`,
        [jewelryId],
      );

      await connection.commit();
      return result.affectedRows > 0;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}

export default new JewelryRepository();
