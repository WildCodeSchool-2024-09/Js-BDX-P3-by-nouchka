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
    // Execute the SQL INSERT query to add a new item to the "item" table
    const connection = await databaseClient.getConnection();
    await connection.beginTransaction();
    const [users] = await databaseClient.query<Result>(
      `INSERT INTO users 
        (lastname, firstname, mail, password)
      VALUES (?, ?, ?, ?) `,
      [admin.lastname, admin.firstname, admin.mail, admin.password],
    );
    const users_id = users.insertId;

    if (users_id) {
      const [result] = await databaseClient.query<Result>(
        `INSERT INTO admin 
          (users_id) 
         VALUES (?)`,
        [users_id],
      );

      // Return the ID of the newly inserted item
      if (result.insertId) {
        await connection.commit();
        return result.insertId;
      }
      await connection.rollback();
      throw new Error("Failed to insert into admin table.");
    }
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await databaseClient.query<Rows>(
      `SELECT * 
      FROM admin 
      WHERE id = ?`,
      [id],
    );

    // Return the first row of the result, which represents the item
    return rows[0] as Admin;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await databaseClient.query<Rows>("select * from admin");

    // Return the array of items
    return rows as Admin[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing item

  async update(admin: Admin) {
    const connection = await databaseClient.getConnection();
    await connection.beginTransaction();
    const [rows] = await databaseClient.query<Result>(
      `UPDATE users 
      SET lastname = ?, firstname = ?, mail = ?, password = ? 
      WHERE id = (SELECT users_id FROM admin WHERE id = ?)`,
      [admin.lastname, admin.firstname, admin.mail, admin.password, admin.id],
    );
    if (rows.affectedRows === 0) {
      await connection.rollback();
      throw new Error("Failed to update user.");
    }

    const [rowsAdmin] = await connection.query<Result>(
      `UPDATE admin 
    SET users_id = users_id 
    WHERE id = ?`,
      [admin.id],
    );

    if (rowsAdmin.affectedRows === 0) {
      await connection.rollback();
      throw new Error("Failed to update admin.");
    }

    await connection.commit();

    return {
      id: admin.id,
      affectedRows: rows.affectedRows + rowsAdmin.affectedRows,
    };
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an item by its ID

  async delete(adminId: number) {
    const connection = await databaseClient.getConnection();
    await connection.beginTransaction();

    const [rows] = await connection.query<Result>(
      `DELETE FROM admin 
      WHERE id = ?`,
      [adminId],
    );

    if (rows.affectedRows === 0) {
      await connection.rollback();
      return { message: "Admin not found", affectedRows: 0 };
    }

    const [userRows] = await connection.query<Result>(
      `DELETE FROM users 
      WHERE id = (SELECT users_id FROM admin WHERE id = ?)`,
      [adminId],
    );

    await connection.commit();

    return {
      affectedRows: rows.affectedRows + userRows.affectedRows,
      message: "Admin and associated user deleted successfully.",
    };
  }
}

export default new AdminRepository();
