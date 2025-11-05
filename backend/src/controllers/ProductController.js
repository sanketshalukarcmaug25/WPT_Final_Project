import { getConnectionObject } from "../configs/DbConfig.js";


export async function addProduct(request, response) {
  try {
    const connection = getConnectionObject();
    const { name, price, quantity, description, image_path } = request.body;

    const qry = `
      INSERT INTO product (name, price, quantity, description, image_path)
      VALUES ('${name}', ${price}, ${quantity}, '${description}', '${image_path}')
    `;

    const [resultSet] = await connection.query(qry);

    if (resultSet.affectedRows === 1) {
      response.status(200).send({ message: "Product Added" });
    } else {
      response.status(500).send({ message: "Cannot add Product at this time" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).send({ message: "Something went wrong" });
  }
}


export async function updateProduct(request, response) {
  try {
    const connection = getConnectionObject();
    const { name, price, quantity, description, image_path } = request.body;

    const qry = `
      UPDATE product
      SET name='${name}', price=${price}, quantity=${quantity},
          description='${description}', image_path='${image_path}'
      WHERE id=${request.params.id}
    `;

    const [resultSet] = await connection.query(qry);

    if (resultSet.affectedRows === 1) {
      response.status(200).send({ message: "Product Updated" });
    } else {
      response.status(404).send({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).send({ message: "Something went wrong" });
  }
}


export async function getAllProducts(request, response) {
  try {
    const connection = getConnectionObject();
    const qry = `SELECT * FROM product`;
    const [rows] = await connection.query(qry);
    response.status(200).send(rows);
  } catch (error) {
    console.error(error);
    response.status(500).send({ message: "Something went wrong" });
  }
}


export async function getProductById(request, response) {
  try {
    const connection = getConnectionObject();
    const qry = `SELECT * FROM product WHERE id=${request.params.id}`;
    const [rows] = await connection.query(qry);
    if (rows.length === 0) {
      response.status(404).send({ message: "Product not found" });
    } else {
      response.status(200).send(rows[0]);
    }
  } catch (error) {
    console.error(error);
    response.status(500).send({ message: "Something went wrong" });
  }
}


export async function deleteProductById(request, response) {
  try {
    const connection = getConnectionObject();
    const qry = `DELETE FROM product WHERE id=${request.params.id}`;
    const [resultSet] = await connection.query(qry);
    if (resultSet.affectedRows === 1) {
      response.status(200).send({ message: "Product Deleted" });
    } else {
      response.status(404).send({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).send({ message: "Something went wrong" });
  }
}
