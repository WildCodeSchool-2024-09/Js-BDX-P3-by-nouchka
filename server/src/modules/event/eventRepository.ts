import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Event = {
  id: number;
  name: string;
  date: string;
  location: string;
  description: string;
  url: string;
};

class EventsRepository {
  async create(events: Omit<Event, "id">) {
    const connection = await databaseClient.getConnection();

    try {
      await connection.beginTransaction();

      const [photos] = await connection.execute<Result>(
        `INSERT INTO photos
          (URL)
        VALUES (?) `,
        [events.url],
      );
      const photos_id = photos.insertId;

      if (!photos_id) {
        throw new Error("Failed insertion into photos");
      }

      const [eventsResult] = await connection.execute<Result>(
        `INSERT INTO events 
          (name, date, location, description) 
         VALUES (?, ?, ?, ?)`,
        [events.name, events.date, events.location, events.description],
      );

      if (!eventsResult.insertId) {
        throw new Error("Failed to insert into events table.");
      }

      const [photos_events] = await connection.execute<Result>(
        `INSERT INTO photos_events
        (events_id, photos_id)
        VALUES (?, ?)`,
        [eventsResult.insertId, photos_id],
      );
      if (!photos_events.insertId) {
        throw new Error("Failed to insert into photos_events");
      }

      await connection.commit();

      return eventsResult.insertId;
    } catch (error) {
      await connection.rollback();

      throw error;
    } finally {
      connection.release();
    }
  }

  async read(id: number) {
    const [rows] = await databaseClient.execute<Rows>(
      `SELECT * 
        FROM events 
        INNER JOIN photos_events ON events.id = photos_events.events_id
        INNER JOIN photos ON photos_events.photos_id = photos.id
        WHERE events.id = ?`,
      [id],
    );

    return rows[0] as Event;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT events.*, photos.URL
      FROM events
      INNER JOIN photos_events ON events.id = photos_events.events_id
      INNER JOIN photos ON photos_events.photos_id = photos.id`,
    );

    return rows as Event[];
  }

  async update(events: Event) {
    const connection = await databaseClient.getConnection();
    try {
      await connection.beginTransaction();
      const [rows] = await connection.execute<Result>(
        `UPDATE events
        SET name=?, date=?, location=?, description=?
        WHERE id = ?`,
        [
          events.name,
          events.date,
          events.location,
          events.description,
          events.id,
        ],
      );
      if (!rows.affectedRows) {
        throw new Error("Failed update events");
      }
      const [photos] = await connection.execute<Result>(
        `UPDATE photos 
          SET URL = ?
          WHERE id = (SELECT photos_id FROM photos_events
          WHERE events_id = ?)`,
        [events.url, events.id],
      );
      if (!photos.affectedRows) {
        throw new Error("Failed to update photos");
      }

      await connection.commit();
      return rows.affectedRows;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
  async delete(eventsId: number) {
    const [result] = await databaseClient.execute<Result>(
      `DELETE events, photos, photos_events
       FROM events
       INNER JOIN photos_events ON photos_events.events_id = events.id
       INNER JOIN photos ON photos.id = photos_events.photos_id
       WHERE events.id = ?`,
      [eventsId],
    );

    return result.affectedRows;
  }
}

export default new EventsRepository();
