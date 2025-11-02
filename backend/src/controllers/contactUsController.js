import { getConnectionObject } from "../configs/DbConfig.js";


export async function addQuery(request, response){
    try {
        const connection = getConnectionObject();
        const { name, email, phone, description } = request.body;
        const qry = `INSERT INTO contact_us(name, phone, description) VALUES('${name}',${phone},'${description}')`;
        const [resultSet] = await connection.query(qry);
        if(resultSet.affectedRows === 1){
            response.status(200).send({message:' Your message has been received! We will contact you soon.'});
        }
        else{
            response.status(500).send({message:'Unable to submit your message at this time. Please try again later.'});
        }
    } catch (error) {
        console.log(error);
        response.status(500).send({message:'Something went wrong'});
    }
}


export async function getAllQuery(request, response){
    try {
        const connection = getConnectionObject();
        const qry = `SELECT * FROM contact_us`;
        const [rows] = await connection.query(qry);
        response.status(200).send(rows);
    } catch (error) {
        console.log(error);
        response.status(500).send({message:'Something went wrong'});
    }
}