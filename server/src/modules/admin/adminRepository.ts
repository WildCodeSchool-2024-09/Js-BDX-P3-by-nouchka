import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Admin = {
  id: number;
  users_id: number;
};

class AdminRepository {
  // The C of CRUD - Create operation

  async create(admin: Omit<Admin, "id">) {
    // Execute the SQL INSERT query to add a new item to the "item" table
    const [result] = await databaseClient.query<Result>(
      "insert into admin (users_id) values (?)",
      [admin.users_id],
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from admin where id = ?",
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
    const [rows] = await databaseClient.query<Result>(
      "update admin set users_id = ? where id = ?",
      [admin.users_id, admin.id],
    );
    return rows.affectedRows;
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an item by its ID

  async delete(admin: Admin) {
    const [rows] = await databaseClient.query<Result>(
      "delete from admin where id = ? ",
      [admin.users_id, admin.id],
    );
    return rows.affectedRows;
  }
}

export default new AdminRepository();
