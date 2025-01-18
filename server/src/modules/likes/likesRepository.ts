import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Likes = {
  clients_id: number;
  jewelry_id: number;
  status: boolean;
};

class LikesRepository {
  async create(likes: Omit<Likes, "id">) {
    const connection = await databaseClient.getConnection();
    try {
      await connection.beginTransaction();

      const [likeResult] = await connection.query<Result>(
        `INSERT INTO likes (status)
         VALUES (?)`,
        [true],
      );
      const likeId = likeResult.insertId;

      if (!likeId) {
        throw new Error("Failed to insert into likes table.");
      }

      const [clientLikeResult] = await connection.query<Result>(
        `INSERT INTO likes_clients (clients_id, likes_id)
              VALUES (?, ?)`,
        [likes.clients_id, likeId],
      );

      if (!clientLikeResult) {
        throw new Error("Failed to insert into likes_clients table.");
      }
      const [jewelryLikeResult] = await connection.query<Result>(
        `INSERT INTO likes_jewelry (jewelry_id, likes_id)
                VALUES (?, ?)`,
        [likes.jewelry_id, likeId],
      );

      if (!jewelryLikeResult) {
        throw new Error("Failed to insert into likes_jewelry table ");
      }
      await connection.commit();
      return {
        likeId,
        clients_id: likes.clients_id,
        jewelry_id: likes.jewelry_id,
      };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT likes.id, likes.status, likes_clients.clients_id, likes_jewelry.jewelry_id
      FROM likes
      LEFT JOIN likes_clients ON likes.id = likes_clients.likes_id
      LEFT JOIN likes_jewelry ON likes.id = likes_jewelry.likes_id
      WHERE likes.id = ?`,
      [id],
    );
    return rows[0] as Likes;
  }
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT likes.id, likes.status, likes_clients.clients_id, likes_jewelry.jewelry_id
     FROM likes
     LEFT JOIN likes_clients ON likes.id = likes_clients.likes_id
     LEFT JOIN likes_jewelry ON likes.id = likes_jewelry.likes_id`,
    );
    return rows as Likes[];
  }
  async delete(likeId: number) {
    try {
      const [rows] = await databaseClient.query<Result>(
        `DELETE FROM likes
         WHERE id = ?`,
        [likeId],
      );
      return rows.affectedRows;
    } catch (error) {
      throw new Error(`You've got an error: ${(error as Error).message}`);
    }
  }
}

export default new LikesRepository();
