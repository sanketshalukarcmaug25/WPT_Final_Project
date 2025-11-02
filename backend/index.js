import express from 'express';
import { connectDb } from "./src/configs/DbConfig.js";

import { addQuery, getAllQuery } from './src/controllers/contactUsController.js';


const app = express();
app.use(express.json());

app.get("/contactus",getAllQuery);
app.post("/contactus",addQuery);

app.listen(7655,()=>{
    connectDb();
})