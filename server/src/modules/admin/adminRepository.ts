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
  // The C of CRUD - Create operation

  async create(admin: Omit<Admin, "id">) {
    const connection = await databaseClient.getConnection();

    try {
      await connection.beginTransaction();

      const [users] = await connection.execute<Result>(
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

      const [result] = await connection.execute<Result>(
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

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await databaseClient.execute<Rows>(
      `SELECT users.lastname, users.firstname, users.mail
     FROM admin
     INNER JOIN users
     ON admin.users_id = users.id
     WHERE admin.id = ?`,
      [id],
    );

    // Return the first row of the result, which represents the item
    return rows[0] as Admin;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await databaseClient.query<Rows>(
      `SELECT id, lastname, firstname, mail
      FROM users
      INNER JOIN admin
      ON admin.users_id = users.id`,
    );

    // Return the array of items
    return rows as Admin[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing item

  async update(admin: Admin) {
    const [rows] = await databaseClient.execute<Result>(
      `UPDATE users 
      SET lastname = ?, firstname = ?, mail = ?, password = ? 
      WHERE id = (SELECT users_id FROM admin WHERE id = ?)`,
      [admin.lastname, admin.firstname, admin.mail, admin.password, admin.id],
    );

    return rows.affectedRows > 0;
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an item by its ID

  async delete(adminId: number) {
    const [result] = await databaseClient.execute<Result>(
      `DELETE FROM users 
      WHERE id = (SELECT users_id FROM admin WHERE id = ?)`,
      [adminId],
    );

    return result.affectedRows;
  }
}

export default new AdminRepository();
