import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Pages = {
  name: string;
  title: string;
  description: string;
  url_illustration: string;
};

type PageWithJewelry = Pages & {
  selected_jewelry: { id: number; name: string; URL: string }[];
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

  async readWithJewelry(name: string) {
    const [pageRows] = await databaseClient.execute<Rows>(
      `SELECT * 
      FROM pages 
      WHERE name = ?`,
      [name],
    );

    if (!pageRows.length) return null;

    const page = pageRows[0] as Pages;

    const [jewelryRows] = await databaseClient.execute<Rows>(
      `SELECT jewelry.id, jewelry.name, photos.URL
       FROM pages_jewelry
       JOIN jewelry ON pages_jewelry.jewelry_id = jewelry.id
       JOIN photos_jewelry ON jewelry.id = photos_jewelry.jewelry_id
       JOIN photos ON photos_jewelry.photos_id = photos.id
       WHERE pages_jewelry.page_name = ?`,
      [name],
    );

    return { ...page, selected_jewelry: jewelryRows } as PageWithJewelry;
  }

  async readAll() {
    const [rows] = await databaseClient.query(
      `SELECT * 
      FROM pages`,
    );
    return rows as Pages[];
  }

  async update(page: Pages) {
    console.info(page);
    const [rows] = await databaseClient.execute<Result>(
      `UPDATE pages 
      SET title = ?, description = ?, url_illustration = ? 
      WHERE name = ?`,
      [page.title, page.description, page.url_illustration, page.name],
    );

    return rows.affectedRows > 0;
  }

  async updateWithJewelry(page: Pages, selectedJewelry: number[]) {
    const connection = await databaseClient.getConnection();

    try {
      await connection.beginTransaction();

      const pageUpdated = await this.update(page);
      if (!pageUpdated) {
        throw new Error("Échec de la mise à jour de la page.");
      }

      await connection.execute(
        `DELETE FROM pages_jewelry 
        WHERE page_name = ?`,
        [page.name],
      );

      if (Array.isArray(selectedJewelry) && selectedJewelry.length > 0) {
        for (const jewelry of selectedJewelry) {
          console.info(jewelry);
          await connection.execute(
            `INSERT INTO pages_jewelry (page_name, jewelry_id) 
            VALUES (?, ?)`,
            [page.name, jewelry],
          );
        }
      }

      await connection.commit();
      return true;
    } catch (error) {
      await connection.rollback();
      console.error(
        "Erreur lors de la mise à jour des bijoux de la page :",
        error,
      );
      return false;
    } finally {
      connection.release();
    }
  }
}

export default new PagesRepository();
