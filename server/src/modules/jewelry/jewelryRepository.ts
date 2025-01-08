import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Jewelry = {
  id: number;
  type: string;
  stock: number;
  description: string;
  name: string;
  price: number;
  URL: string;
};

class jewelryRepository {
  async create(jewelry: Omit<Jewelry, "id">) {
    const connection = await databaseClient.getConnection();

    try {
      await connection.beginTransaction();

      const [photos] = await connection.query<Result>(
        `INSERT INTO photos 
          (URL)
        VALUES (?) `,
        [jewelry.URL],
      );
      const photos_id = photos.insertId;

      if (!photos_id) {
        await connection.rollback();
        throw new Error("Failed to insert into photos table.");
      }

      const [result] = await connection.query<Result>(
        `INSERT INTO jewelry 
          (photos_id, type, stock, description, name, price) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          photos_id,
          jewelry.type,
          jewelry.stock,
          jewelry.description,
          jewelry.name,
          jewelry.price,
        ],
      );

      if (!result.insertId) {
        await connection.rollback();
        throw new Error("Failed to insert into jewelry table.");
      }

      await connection.commit();

      return result.insertId;
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
        INNER JOIN photos
        ON jewelry.photos_id = photos.id
        WHERE jewelry.id = ?`,
      [id],
    );

    return rows[0] as Jewelry;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT URL
        FROM photos
        INNER JOIN jewelry
        ON jewelry.photos_id = photos.id`,
    );

    return rows as Jewelry[];
  }

  async update(jewelry: Jewelry) {
    const [rows] = await databaseClient.query<Result>(
      `UPDATE photos 
        SET URL = ?
        WHERE id = (SELECT photos_id FROM jewelry
        WHERE id = ?)`,
      [jewelry.URL, jewelry.id],
    );

    return {
      success: rows.affectedRows > 0,
    };
  }

  async delete(jewelryId: number) {
    const [rows] = await databaseClient.query<Result>(
      `DELETE FROM jewelry
         WHERE id = ?`,
      [jewelryId],
    );

    if (rows.affectedRows === 0) {
      throw new Error("Delete failed in admin. No rows affected.");
    }

    return {
      affectedRows: rows.affectedRows,
    };
  }
}

export default new jewelryRepository();
