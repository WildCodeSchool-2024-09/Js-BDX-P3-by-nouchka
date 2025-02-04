import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Order = {
  id: number;
  status?: boolean;
  date?: string;
  billing_address: Omit<Address, "id">;
  shipping_address: Omit<Address, "id">;
  jewelries: Jewelry[];
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
          order.billing_address.street_number,
          order.billing_address.street_name,
          order.billing_address.postal_code,
          order.billing_address.city,
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

      if (!billing_addressInsert.insertId) {
        throw new Error("Failed to insert into billing_address");
      }

      const [shipping_address] = await connection.execute<Result>(
        `INSERT INTO address
          (street_number, street_name, postal_code, city)
        
        VALUES (?, ?, ?, ?) `,
        [
          order.shipping_address.street_number,
          order.shipping_address.street_name,
          order.shipping_address.postal_code,
          order.shipping_address.city,
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
          (billing_address_id, shipping_address_id)
      
        VALUES (?, ?) `,
        [billing_addressInsert.insertId, shippingAddressInsert.insertId],
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
        if (clientsOrder.insertId) {
          throw new Error("Failed to insert client order");
        }
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
      `SELECT 
    ba.street_number AS street_number_ba, 
    ba.street_name AS street_name_ba,
    ba.postal_code AS postal_code_ba,
    ba.city AS city_ba,

    sa.street_number AS street_number_sa,
    sa.street_name AS street_name_sa,
    sa.postal_code AS postal_code_sa,
    sa.city AS city_sa,

    JSON_ARRAYAGG(
        JSON_OBJECT(
            'name', jewelry.name,
            'price', jewelry.price,
            'quantity', jewelry_orders.quantity
        )
    ) AS jewelries

FROM orders
INNER JOIN billing_address ON orders.billing_address_id = billing_address.id
INNER JOIN shipping_address ON orders.shipping_address_id = shipping_address.id
INNER JOIN address ba ON ba.id = billing_address.address_id
INNER JOIN address sa ON sa.id = shipping_address.address_id
INNER JOIN jewelry_orders ON orders.id = jewelry_orders.orders_id
INNER JOIN jewelry ON jewelry.id = jewelry_orders.jewelry_id
WHERE orders.id = ?
GROUP BY ba.street_number, ba.street_name, ba.postal_code, ba.city, 
 sa.street_number, sa.street_name, sa.postal_code, sa.city
`,
      [id],
    );

    return rows[0] as Order;
  }

  async readAll() {
    const [rows] = await databaseClient.execute<Rows>(
      `SELECT 
    ba.street_number AS street_number_ba, 
    ba.street_name AS street_name_ba,
    ba.postal_code AS postal_code_ba,
    ba.city AS city_ba,

    sa.street_number AS street_number_sa,
    sa.street_name AS street_name_sa,
    sa.postal_code AS postal_code_sa,
    sa.city AS city_sa,

    JSON_ARRAYAGG(
        JSON_OBJECT(
            'name', jewelry.name,
            'price', jewelry.price,
            'quantity', jewelry_orders.quantity
        )
    ) AS jewelries

FROM orders
INNER JOIN billing_address ON orders.billing_address_id = billing_address.id
INNER JOIN shipping_address ON orders.shipping_address_id = shipping_address.id
INNER JOIN address ba ON ba.id = billing_address.address_id
INNER JOIN address sa ON sa.id = shipping_address.address_id
INNER JOIN jewelry_orders ON orders.id = jewelry_orders.orders_id
INNER JOIN jewelry ON jewelry.id = jewelry_orders.jewelry_id
GROUP BY ba.street_number, ba.street_name, ba.postal_code, ba.city, 
 sa.street_number, sa.street_name, sa.postal_code, sa.city
`,
    );

    return rows as Order[];
  }

  async update(order: { id: number; status: boolean }) {
    const [rows] = await databaseClient.execute<Result>(
      `UPDATE orders
        SET status=?
        WHERE id = ?`,
      [order.status, order.id],
    );

    return rows.affectedRows;
  }
  async delete(orderId: number) {
    const [result] = await databaseClient.execute<Result>(
      `DELETE FROM orders
       WHERE id = ?`,
      [orderId],
    );

    return result.affectedRows;
  }
}

export default new OrderRepository();
