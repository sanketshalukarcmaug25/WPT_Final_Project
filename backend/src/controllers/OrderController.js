import { getConnectionObject } from "../configs/DbConfig.js";

export function createOrder(request, response) {
  try {
    const connection = getConnectionObject();
    const { customerId, productId, petId } = request.body;

    // ✅ Simple validation
    if (!customerId || !productId || !petId) {
      return response.status(400).send({ message: "Missing required fields" });
    }

    const currentDate = new Date();

    const placeOrderQuery = `
      INSERT INTO orders (customer_id, product_id, date_of_order, pet_id)
      VALUES (?, ?, ?, ?)
    `;

    connection.query(
      placeOrderQuery,
      [customerId, productId, currentDate, petId],
      (error, result) => {
        if (error) {
          console.error("Error placing order:", error);
          return response.status(500).send({ message: "Database error" });
        }

        response.status(201).send({
          message: "Order placed successfully",
          orderId: result.insertId,
        });
      }
    );
  } catch (error) {
    console.error(error);
    response.status(500).send({ message: "Something went wrong" });
  }
}
