import express from 'express';
import { connectDb } from './src/configs/DbConfig.js';


const app = express();
app.use(cors());
app.use(express.json());



app.listen(7655,()=>{
    connectDb();
})