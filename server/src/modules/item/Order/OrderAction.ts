import databaseClient from "../../../../database/client";

import type { Result, Rows } from "../../../../database/client";

type Order = {
  id: number;
  shippingAddress: string;
  billingAddress: string;
  user_id: number;
  created_at: Date;
};

class OrderRepository {
  async create(order: Omit<Order, "id" | "created_at">) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO `order` (shipping_address, billing_address, user_id) VALUES (?, ?, ?)",
      [order.shippingAddress, order.billingAddress, order.user_id],
    );

    return result.insertId;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM `order` WHERE id = ?",
      [id],
    );

    return rows[0] as Order;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM `order`");

    return rows as Order[];
  }

  async update(order: Partial<Order> & { id: number }) {
    const [result] = await databaseClient.query<Result>(
      `
      UPDATE \`order\`
      SET
        shipping_address = COALESCE(?, shipping_address),
        billing_address = COALESCE(?, billing_address),
        user_id = COALESCE(?, user_id)
      WHERE id = ?
      `,
      [order.shippingAddress, order.billingAddress, order.user_id, order.id],
    );

    return result.affectedRows > 0;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM `order` WHERE id = ?",
      [id],
    );

    return result.affectedRows > 0;
  }
}

export default new OrderRepository();
