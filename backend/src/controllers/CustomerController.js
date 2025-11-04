import { compareSync, hashSync } from "bcrypt";
import { getConnectionObject } from "../configs/DbConfig.js";
import jwt from "jsonwebtoken";

export async function registerCustomer(request, response) {
    try {
        const connection = getConnectionObject();
        const { name, phone, password, email, address } = request.body;
        const encryptedPassword = hashSync(password, 12);
        const qry = `INSERT INTO customer(name,phone,password,email,address) VALUES('${name}','${phone}','${encryptedPassword}','${email}', '${address}')`;
        const [resultSet] = await connection.query(qry);
        if (resultSet.affectedRows === 1) {
            response.status(200).send({ message: 'Registration succesfull, now you can login' });
        }
        else {
            response.status(500).send({ message: 'Customer registration failed' });
        }
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Something went wrong' });
    }
}