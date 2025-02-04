import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type User = {
  id: number;
  lastname: string;
  firstname: string;
  mail: string;
  password: string;
};

class UsersRepository {
  async readByEmailWithPassword(mail: string) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT id, lastname, firstname, mail, password 
          FROM users 
          WHERE mail = ?`,
      [mail],
    );

    return rows[0] as User;
  }
}

export default new UsersRepository();
