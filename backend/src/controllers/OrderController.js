
import { getConnectionObject } from "../configs/DbConfig.js";


export function createOrder(req, res) {
  const connection = getConnectionObject();
  const customerId = req.loggedInUserId;
  const { items } = req.body;

  if (!customerId || !items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).send({ message: "Missing required fields" });
  }

  const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

  const promises = items.map(
    (item) =>
      new Promise((resolve, reject) => {
        const { product_id, pet_id, quantity } = item;
        if (!product_id && !pet_id) return resolve();

        const query = `
          INSERT INTO orders (customer_id, product_id, pet_id, quantity, date_of_order)
          VALUES (?, ?, ?, ?, ?)
        `;

        connection.query(
          query,
          [customerId, product_id || null, pet_id || null, quantity || 1, currentDate],
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          }
        );
      })
  );

  Promise.all(promises)
    .then(() => res.status(201).send({ message: "Orders placed successfully" }))
    .catch((err) => {
      res.status(500).send({ message: "Failed to place some orders" });
    });
}


export async function getAllOrders(req, res) {
  const connection = getConnectionObject();

  const query = `
    SELECT * FROM orders ORDER BY date_of_order DESC
  `;

  try {
    const [results] = await connection.execute(query);
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send({ message: "Database error" });
  }
}


export async function getOrdersByCustomer(req, res) {
  const connection = getConnectionObject();
  const customerId = req.loggedInUserId;

  const query = `
    SELECT
      o.id,
      o.date_of_order,
      o.quantity,
      COALESCE(p.name, pt.type) AS item_name,
      COALESCE(p.price, pt.price) AS item_price,
      CASE WHEN o.product_id IS NOT NULL THEN 'Product' ELSE 'Pet' END AS order_type
    FROM orders o
    LEFT JOIN product p ON o.product_id = p.id
    LEFT JOIN pet pt ON o.pet_id = pt.id
    WHERE o.customer_id = ?
    ORDER BY o.id DESC
  `;

  try {
    const [results] = await connection.execute(query, [customerId]);
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send({ message: "Database error" });
  }
}


export async function getOrdersByType(req, res) {
  const connection = getConnectionObject();
  const customerId = req.loggedInUserId;
  const orderType = req.query.type; 

  const query = `
    SELECT
      o.id,
      o.date_of_order,
      o.quantity,
      COALESCE(p.name, pt.type) AS item_name,
      COALESCE(p.price, pt.price) AS item_price,
      CASE WHEN o.product_id IS NOT NULL THEN 'Product' ELSE 'Pet' END AS order_type
    FROM orders o
    LEFT JOIN product p ON o.product_id = p.id
    LEFT JOIN pet pt ON o.pet_id = pt.id
    WHERE o.customer_id = ?
      ${orderType ? "AND ((o.product_id IS NOT NULL AND ?='Product') OR (o.pet_id IS NOT NULL AND ?='Pet'))" : ""}
    ORDER BY o.date_of_order DESC
  `;

  try {
    const [results] = await connection.execute(query, orderType ? [customerId, orderType, orderType] : [customerId]);
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send({ message: "Database error" });
  }
}
