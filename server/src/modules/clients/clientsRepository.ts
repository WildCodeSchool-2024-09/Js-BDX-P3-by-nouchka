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

      const [users] = await connection.query<Result>(
        `INSERT INTO users
            (lastname, firstname, mail, password)
            VALUES (?, ?, ?, ?)`,
        [clients.lastname, clients.firstname, clients.mail, clients.password],
      );
      const users_id = users.insertId;

      if (!users_id) {
        throw new Error("Failed to insert into users table.");
      }
      const [results] = await connection.query<Result>(
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
    const [rows] = await databaseClient.query<Rows>(
      `SELECT * 
        FROM  clients
        Inner Join users
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
        INNER JOIN clients
        ON clients.users_id = users.id`,
    );
    return rows as Clients[];
  }

  async update(clients: Clients) {
    const connection = await databaseClient.getConnection();
    try {
      await connection.beginTransaction();

      const [rows] = await connection.query<Result>(
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

      if (rows.affectedRows === 0) {
        throw new Error("Failed to update user.");
      }

      await connection.commit();
      return { id: clients.id, affectedRows: rows.affectedRows };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  async delete(clientsID: number) {
    const connection = await databaseClient.getConnection();

    try {
      await connection.beginTransaction();

      const [rows] = await connection.query<Result>(
        `DELETE FROM clients
            WHERE id = ?`,
        [clientsID],
      );

      if (rows.affectedRows === 0) {
        await connection.rollback();
        throw new Error(
          `Delete failed in clients.affectedRows:${rows.affectedRows}`,
        );
      }

      const [usersRow] = await connection.query<Result>(
        `DELETE FROM users 
            WHERE id = (SELECT users_id FROM clients WHERE id = ?)`,
        [clientsID],
      );

      await connection.commit();

      return {
        affectedRows: rows.affectedRows + usersRow.affectedRows,
      };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}

export default new ClientsRepository();
