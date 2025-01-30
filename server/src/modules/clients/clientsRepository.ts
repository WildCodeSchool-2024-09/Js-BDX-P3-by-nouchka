import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Clients = {
  id: number;
  lastname: string;
  firstname: string;
  mail: string;
  password: string;
};

class ClientsRepository {
  async create(clients: Omit<Clients, "id">) {
    const connection = await databaseClient.getConnection();
    try {
      await connection.beginTransaction();

      const [users] = await connection.execute<Result>(
        `INSERT INTO users
            (lastname, firstname, mail, password)
            VALUES (?, ?, ?, ?)`,
        [clients.lastname, clients.firstname, clients.mail, clients.password],
      );
      const users_id = users.insertId;

      if (!users_id) {
        throw new Error("Failed to insert into users table.");
      }
      const [results] = await connection.execute<Result>(
        `INSERT INTO clients
            (users_id)
            VALUES (?)`,
        [users_id],
      );
      if (!results.insertId) {
        throw new Error("Failed to insert into clients table.");
      }
      await connection.commit();
      return results.insertId;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
  async read(id: number) {
    const [rows] = await databaseClient.execute<Rows>(
      `SELECT lastname, firstname, mail
        FROM  users
        Inner Join clients
        ON clients.users_id = users.id
        WHERE clients.id = ?`,
      [id],
    );
    return rows[0] as Clients;
  }
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT lastname, firstname, mail
     FROM users
     INNER JOIN clients ON clients.users_id = users.id`,
    );
    return rows as Clients[];
  }

  async update(clients: Clients) {
    const [rows] = await databaseClient.execute<Result>(
      `UPDATE users
         SET lastname = ?, firstname = ?, mail = ?, password = ?
         WHERE id = (SELECT users_id FROM clients WHERE id = ?)`,
      [
        clients.lastname,
        clients.firstname,
        clients.mail,
        clients.password,
        clients.id,
      ],
    );
    return rows.affectedRows;
  }

  async getLikedJewelry(clientId: number, jewelryId: number) {
    const [rows] = await databaseClient.execute<Rows>(
      `SELECT id FROM likes 
      WHERE jewelry_id = ? AND clients_id = ?`,
      [jewelryId, clientId],
    );
    console.info(rows[0]);
    return rows[0];
  }
  async likeJewelry(clientId: number, jewelryId: number) {
    const [result] = await databaseClient.execute<Result>(
      `INSERT INTO likes ( jewelry_id, clients_id) 
          VALUES (?, ?)`,
      [jewelryId, clientId],
    );
    return result.insertId;
  }
  async unlikeJewelry(likeId: number) {
    const [result] = await databaseClient.execute<Result>(
      `DELETE FROM likes 
      WHERE id = ?`,
      [likeId],
    );
    return result.affectedRows;
  }

  async delete(clientsID: number) {
    const [rows] = await databaseClient.execute<Result>(
      `DELETE FROM users
            WHERE id =(SELECT users_id FROM clients WHERE id = ?)`,
      [clientsID],
    );

    return rows.affectedRows;
  }
}

export default new ClientsRepository();
