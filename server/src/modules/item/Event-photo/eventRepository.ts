import databaseClient from "../../../../database/client";
import type { Result, Rows } from "../../../../database/client";

type Event = {
  id: number;
  name: string;
  date: string;
  location: string;
  description: string;
};
type Photo = {
  photoUrl: string;
};

class EventRepository {
  async create(event: Omit<Event, "id"> & Photo) {
    const connection = await databaseClient.getConnection();

    try {
      await connection.beginTransaction();

      const [result] = await connection.query<Result>(
        `INSERT INTO events (name, date, location, description) 
        VALUES (?, ?, ?, ?)`,
        [event.name, event.date, event.location, event.description],
      );

      if (!result.insertId)
        throw new Error("Failed to insert into events table.");

      const eventId = result.insertId;

      const [photoResult] = await connection.query<Result>(
        `INSERT INTO photos (url) 
        VALUES (?)`,
        [event.photoUrl],
      );

      if (!photoResult.insertId)
        throw new Error("Failed to insert into photo table.");

      const photoId = photoResult.insertId;

      const [photoEventResult] = await connection.query<Result>(
        `INSERT INTO photos_events (events_id, photos_id) 
        VALUES (?, ?)`,
        [eventId, photoId],
      );

      if (!photoEventResult.insertId)
        throw new Error("Failed to insert into photos_events table.");

      await connection.commit();
      return eventId;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT * FROM events 
      WHERE id = ?`,
      [id],
    );
    return rows[0] as Event;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM events");
    return rows as Event[];
  }

  async readPhoto(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT * FROM photos
       WHERE id = ?`,
      [id],
    );
    return rows[0] as Photo;
  }

  async readAllPhotos() {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM photos");
    return rows as Photo[];
  }

  async readPhotoEvent(eventId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT * FROM photos
       JOIN photos_events ON photos.id = photos_events.photos_id
       WHERE photos_events.events_id = ?`,
      [eventId],
    );
    return rows as Photo[];
  }

  async readAllPhotoEvents() {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT * FROM events
       JOIN photos_events ON events.id = photos_events.events_id
       JOIN photos ON photos.id = photos_events.photos_id`,
    );
    return rows;
  }

  async update(event: Event & Photo) {
    const connection = await databaseClient.getConnection();

    try {
      await connection.beginTransaction();

      const [eventRows] = await connection.query<Result>(
        `UPDATE events
        SET name = ?, date = ?, location = ?, description = ?
        WHERE id = ?`,
        [event.name, event.date, event.location, event.description, event.id],
      );

      if (eventRows.affectedRows === 0) {
        throw new Error("Failed to update events table.");
      }

      const [photoRows] = await connection.query<Result>(
        `UPDATE photos
        SET url = ?
        WHERE id = (SELECT photos_id FROM photos_events WHERE events_id = ?)`,
        [event.photoUrl, event.id],
      );

      if (photoRows.affectedRows === 0) {
        throw new Error("Failed to update photos table.");
      }

      await connection.commit();
      return { success: true };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
  async delete(eventId: number) {
    const connection = await databaseClient.getConnection();
    try {
      await connection.beginTransaction();

      const [photosEventsRows] = await connection.query<Result>(
        `DELETE FROM photos_events
         WHERE events_id = ?`,
        [eventId],
      );

      if (photosEventsRows.affectedRows === 0) {
        throw new Error(
          "Delete failed. No rows affected in photos_events table.",
        );
      }

      const [photoRows] = await connection.query<Result>(
        `DELETE FROM photos
        WHERE id = (SELECT photos_id FROM photos_events WHERE events_id = ?)`,

        [eventId],
      );

      if (photoRows.affectedRows === 0) {
        throw new Error("Delete failed. No rows affected in photos table.");
      }

      const [eventRows] = await connection.query<Result>(
        `DELETE FROM events
         WHERE events.id = ?`,
        [eventId],
      );

      if (eventRows.affectedRows === 0) {
        throw new Error("Delete failed. No rows affected in events table.");
      }

      await connection.commit();
      return eventRows && photoRows && photosEventsRows;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}

export default new EventRepository();
