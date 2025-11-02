import express from 'express';
import { connectDb } from "./src/configs/DbConfig.js";
import { getAllPets, getPetById, addPet, updatePet, deletePetById } from './src/controllers/PetController.js';

import { addQuery, getAllQuery } from './src/controllers/contactUsController.js';


const app = express();
app.use(express.json());

// Pet API
app.get("/pets", getAllPets);
app.get("/pets/:id", getPetById);
app.post("/pets", addPet);
app.put("/pets/:id", updatePet);
app.delete("/pets/:id", deletePetById);
// Contact us API's
app.get("/contactus",getAllQuery);
app.post("/contactus",addQuery);

app.listen(7655,()=>{
    connectDb();
})