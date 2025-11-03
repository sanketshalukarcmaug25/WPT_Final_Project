import { compareSync, hashSync } from "bcrypt";
import { getConnectionObject } from "../configs/DbConfig.js";
import jwt from "jsonwebtoken";

export async function registerAdmin(request, response) {
    try {
        const connection = getConnectionObject();
        const { name, phone, password, email } = request.body;
        const encryptedPassword = hashSync(password, 12);
        const qry = `INSERT INTO admin(name,phone,password,email) VALUES('${name}','${phone}','${encryptedPassword}','${email}')`;
        const [resultSet] = await connection.query(qry);
        if (resultSet.affectedRows === 1) {
            response.status(200).send({ message: 'Admin registered' });
        }
        else {
            response.status(500).send({ message: 'Admin registration failed' });
        }
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Something went wrong' });
    }
}