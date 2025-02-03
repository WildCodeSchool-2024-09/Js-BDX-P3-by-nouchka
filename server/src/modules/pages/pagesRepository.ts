import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Pages = {
  name: string;
  description: string;
  url_illustration: string;
};

class PagesRepository {
  async read(name: string) {
    const [rows] = await databaseClient.execute<Rows>(
      `SELECT * 
      FROM pages
      WHERE name = ?`,
      [name],
    );
    return rows[0] as Pages;
  }

  async readAll() {
    const [rows] = await databaseClient.query(
      `SELECT * 
      FROM pages`,
    );
    return rows as Pages[];
  }

  async update(page: Pages) {
    const [rows] = await databaseClient.execute<Result>(
      `UPDATE pages 
      SET description = ?, url_illustration = ? 
      WHERE name = ?`,
      [page.description, page.url_illustration, page.name],
    );

    return rows.affectedRows;
  }
}

export default new PagesRepository();
