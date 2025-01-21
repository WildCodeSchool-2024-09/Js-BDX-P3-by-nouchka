import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Admin = {
  id: number;
  lastname: string;
  firstname: string;
  mail: string;
  password: string;
};

class AdminRepository {
  async create(admin: Omit<Admin, "id">) {
    const connection = await databaseClient.getConnection();

    try {
      await connection.beginTransaction();
      const [users] = await connection.query<Result>(
        `INSERT INTO users 
          (lastname, firstname, mail, password)
        VALUES (?, ?, ?, ?) `,
        [admin.lastname, admin.firstname, admin.mail, admin.password],
      );
      const users_id = users.insertId;
      if (!users_id) {
        await connection.rollback();
        throw new Error("Failed to insert into users table.");
      }
      const [result] = await connection.query<Result>(
        `INSERT INTO admin 
          (users_id) 
         VALUES (?)`,
        [users_id],
      );
      if (!result.insertId) {
        await connection.rollback();
        throw new Error("Failed to insert into admin table.");
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
      `SELECT users.lastname, users.firstname, users.mail
     FROM admin
     INNER JOIN users
     ON admin.users_id = users.id
     WHERE admin.id = ?`,
      [id],
    );
    return rows[0] as Admin;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT lastname, firstname, mail
      FROM users
      INNER JOIN admin
      ON admin.users_id = users.id`,
    );

    return rows as Admin[];
  }
  async update(admin: Admin) {
    const [rows] = await databaseClient.query<Result>(
      `UPDATE users 
      SET lastname = ?, firstname = ?, mail = ?, password = ? 
      WHERE id = (SELECT users_id FROM admin WHERE id = ?)`,
      [admin.lastname, admin.firstname, admin.mail, admin.password, admin.id],
    );

    return rows.affectedRows > 0;
  }
  async delete(adminId: number) {
    const [result] = await databaseClient.query<Result>(
      `DELETE users, admin
       FROM users
       INNER JOIN admin ON users.id = admin.users_id
       WHERE admin.id = ?`,
      [adminId],
    );

    return result.affectedRows > 0;
  }
}

export default new AdminRepository();
