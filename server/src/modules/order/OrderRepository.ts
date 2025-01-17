import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Order = {
  id: number;
  status?: boolean;
  date?: string;
  billing_address?: Omit<Address, "id">;
  shipping_address?: Omit<Address, "id">;
  jewelries?: Jewelry[];
  clients_id?: number;
};

type Address = {
  id: number;
  street_number: string;
  street_name: string;
  postal_code: string;
  city: string;
};

type Jewelry = {
  id: number;
  name: string;
  quantity: number;
};

class OrderRepository {
  async create(order: Omit<Order, "id">) {
    const connection = await databaseClient.getConnection();

    try {
      await connection.beginTransaction();

      const [billing_address] = await connection.execute<Result>(
        `INSERT INTO address
          (street_number, street_name, postal_code, city)
      
        VALUES (?, ?, ?, ?) `,
        [
          order.billing_address?.street_number,
          order.billing_address?.street_name,
          order.billing_address?.postal_code,
          order.billing_address?.city,
        ],
      );

      const billing_addressId = billing_address.insertId;

      if (!billing_addressId) {
        throw new Error("Failed insertion into billing_address");
      }

      const [billing_addressInsert] = await connection.execute<Result>(
        `INSERT INTO billing_address 
          (address_id) 
         VALUES (?)`,
        [billing_addressId],
      );

      if (!billing_address.insertId) {
        throw new Error("Failed to insert into billing_address");
      }

      const [shipping_address] = await connection.execute<Result>(
        `INSERT INTO address
          (street_number, street_name, postal_code, city)
      
        VALUES (?, ?, ?, ?) `,
        [
          order.shipping_address?.street_number,
          order.shipping_address?.street_name,
          order.shipping_address?.postal_code,
          order.shipping_address?.city,
        ],
      );

      const shippingAddressId = shipping_address.insertId;

      if (!shippingAddressId) {
        throw new Error("Failed insertion into shipping_address");
      }

      const [shippingAddressInsert] = await connection.execute<Result>(
        "INSERT INTO shipping_address (address_id) VALUES (?)",
        [shippingAddressId],
      );

      if (!shippingAddressInsert.insertId) {
        throw new Error("Failed to insert into shipping_address table.");
      }

      const [ordersResult] = await connection.execute<Result>(
        `INSERT INTO orders
          (billing_address, shipping_address)
      
        VALUES (?, ?) `,
        [billing_addressId, shippingAddressId],
      );
      const ordersId = ordersResult.insertId;
      if (!ordersId) {
        throw new Error("Failed to insert into orders table.");
      }

      order.jewelries?.map(async (jewelry: Jewelry) => {
        const [jewelryResult] = await connection.execute<Result>(
          `INSERT INTO jewelry_orders
          (jewelry_id, orders_id, quantity)
      
        VALUES (?, ?, ?) `,
          [jewelry.id, ordersId, jewelry.quantity],
        );
        if (!jewelryResult.insertId) {
          throw new Error("Failed to insert jewelryorders ");
        }
      });

      if (order.clients_id) {
        const [clientsOrder] = await connection.execute<Result>(
          ` 
          INSERT INTO clients_orders
          (clients_id, orders_id)
          VALUES (?, ?)
          `,
          [order.clients_id, ordersId],
        );
      }

      await connection.commit();

      return ordersId;
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
        FROM order 
        INNER JOIN billing_address ON order.id = billing_address_order.order_id
        INNER JOIN billing_address ON billing_address_order.billing_address_id = billing_address.id
        WHERE order.id = ?`,
      [id],
    );

    return rows[0] as Order;
  }

  async readAll() {
    const [rows] = await databaseClient.execute<Rows>(
      `SELECT order.*,
      FROM order
      INNER JOIN shipping_address_order ON order.id = shipping_address_order.order_id
      INNER JOIN shipping_address ON shipping_address_order.shipping_address_id = shipping_address.id`,
    );

    return rows as Order[];
  }

  async update(order: Order) {
    const connection = await databaseClient.getConnection();
    try {
      await connection.beginTransaction();
      const [rows] = await connection.execute<Result>(
        `UPDATE order
        SET type=?, stock=?, description=?, name=?, price=?
        WHERE id = ?`,
        [
          order.billing_address,
          order.shipping_address,
          order.jewelries,
          order.date,
          order.status,
          order.id,
          order.clients_id,
        ],
      );
      if (!rows.affectedRows) {
        throw new Error("Failed update order");
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
  async delete(orderId: number) {
    const [result] = await databaseClient.execute<Result>(
      `DELETE order, order, order_order
       FROM order
       INNER JOIN order_order ON order_order.order_id = order.id
       INNER JOIN order ON order.id = order_order.order_id
       WHERE order.id = ?`,
      [orderId],
    );

    return result.affectedRows;
  }
}

export default new OrderRepository();
