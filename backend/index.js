import express from 'express';
import { connectDb } from "./src/configs/DbConfig.js";
import { getAllPets, getPetById, addPet, updatePet, deletePetById } from './src/controllers/PetController.js';
import cors from "cors";
import { addQuery, getAllQuery, deleteQuery } from './src/controllers/ContactUsController.js';




const app = express();

// ✅ Enable CORS globally (for all origins and routes)
app.use(cors());
app.use(express.json());

// Pet API
app.get("/pets", getAllPets);
app.get("/pets/:id", getPetById);
app.post("/pets", addPet);
app.put("/pets/:id", updatePet);
app.delete("/pets/:id", deletePetById);

// Contact us API's
app.get("/contactus", getAllQuery);
app.post("/contactus", addQuery);
app.delete("/contactus/:id", deleteQuery);

app.listen(7655, () => {
    connectDb();
});
