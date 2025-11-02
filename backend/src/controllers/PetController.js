import { getConnectionObject } from "../configs/DbConfig.js";

/**
 * Add a new Pet
 */
export async function addPet(request, response) {
    try {
        const connection = getConnectionObject();
        const { age, breed, type, description, price } = request.body;

        const qry = `INSERT INTO pet(age, breed, type, description, price)
                     VALUES(${age}, '${breed}', '${type}', '${description}', ${price})`;

        const [resultSet] = await connection.query(qry);

        if (resultSet.affectedRows === 1) {
            response.status(200).send({ message: 'Pet Added Successfully' });
        } else {
            response.status(500).send({ message: 'Cannot add Pet at this time' });
        }
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Something went wrong' });
    }
}

/**
 * Update Pet by ID
 */
export async function updatePet(request, response) {
    try {
        const connection = getConnectionObject();
        const { age, breed, type, description, price } = request.body;

        const qry = `UPDATE pet 
                     SET age=${age}, breed='${breed}', type='${type}', 
                         description='${description}', price=${price}
                     WHERE id=${request.params.id}`;

        const [resultSet] = await connection.query(qry);

        if (resultSet.affectedRows === 1) {
            response.status(200).send({ message: 'Pet Updated Successfully' });
        } else {
            response.status(500).send({ message: 'Pet update operation failed' });
        }
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Something went wrong' });
    }
}

/**
 * Get all Pets
 */
export async function getAllPets(request, response) {
    try {
        const connection = getConnectionObject();
        const qry = 'SELECT * FROM pet';
        const [rows] = await connection.query(qry);
        response.status(200).send(rows);
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Something went wrong' });
    }
}

/**
 * Get Pet by ID
 */
export async function getPetById(request, response) {
    try {
        const connection = getConnectionObject();
        const qry = `SELECT * FROM pet WHERE id=${request.params.id}`;

        const [rows] = await connection.query(qry);

        if (rows.length === 0) {
            response.status(404).send({ message: 'Pet not found' });
        } else {
            response.status(200).send(rows[0]);
        }
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Something went wrong' });
    }
}

/**
 * Delete Pet by ID
 */
export async function deletePetById(request, response) {
    try {
        const connection = getConnectionObject();
        const qry = `DELETE FROM pet WHERE id=${request.params.id}`;
        const [resultSet] = await connection.query(qry);

        if (resultSet.affectedRows === 1) {
            response.status(200).send({ message: 'Pet Deleted Successfully' });
        } else {
            response.status(404).send({ message: 'Pet not found' });
        }
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Something went wrong' });
    }
}