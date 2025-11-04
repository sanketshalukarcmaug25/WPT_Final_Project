import { compareSync } from "bcrypt";
import { getConnectionObject } from "../configs/DbConfig.js";
import { ROLES } from "../constants/RoleConstants.js";
import jwt from 'jsonwebtoken';

export async function login(request, response) {
    try {
        const connection = getConnectionObject();
        const { phone, password, role } = request.body;
        const tableName  = role === ROLES.ADMIN ? 'admin' : 'customer';
        const qry = `SELECT * FROM ${tableName} WHERE phone='${phone}'`;
        const [rows] = await connection.query(qry);
        if (rows.length === 0) {
            response.status(400).send({ message: "Login failed, phone doesn't exist" });
        }
        else {
            if(compareSync(password,rows[0].password)){
                const token = jwt.sign({
                    userId:rows[0].id,
                    role:role
                } ,'user1234');
                response.status(200).send({token,message:'Login successful'});
            }
            else{
                response.status(400).send({ message: "Login failed, password is invalid" });
            }
            // compare the password
        }
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Something went wrong' });
    }
}