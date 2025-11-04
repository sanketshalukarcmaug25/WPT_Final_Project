import express from 'express';
import cors from 'cors';
import { connectDb } from "./src/configs/DbConfig.js";
import { getAllPets, getPetById, addPet, updatePet, deletePetById } from './src/controllers/PetController.js';

import { login } from './src/controllers/LoginController.js';
import { registerCustomer } from './src/controllers/CustomerController.js';
import { registerAdmin } from './src/controllers/AdminController.js';
import { authorize, verifyToken } from './src/middlewares/VerifyToken.js';
import { addQuery, getAllQuery,deleteQuery} from './src/controllers/contactUsController.js';
import { createOrder } from './src/controllers/OrderController.js';
import { addProduct, deleteProductById, getAllProducts, getProductById, updateProduct } from './src/controllers/ProductController.js';
import { ROLES } from './src/constants/RoleConstants.js';


const app = express();
app.use(cors());
app.use(express.json());

//order API's
app.post('/orders', createOrder);


//product API's
app.get("/products",verifyToken, authorize([ROLES.ADMIN, ROLES.CUSTOMER]) , getAllProducts);
app.get("/products/:id", verifyToken, authorize([ROLES.ADMIN, ROLES.CUSTOMER]), getProductById);
app.post("/products",verifyToken, authorize([ROLES.ADMIN]), addProduct);
app.delete("/products/:id", verifyToken,authorize([ROLES.ADMIN]), deleteProductById);
app.put("/products/:id",verifyToken, authorize([ROLES.ADMIN]), updateProduct);

// Pet API
app.get("/pets", getAllPets);
app.get("/pets/:id", getPetById);
app.post("/pets", addPet);
app.put("/pets/:id", updatePet);
app.delete("/pets/:id", deletePetById);


// Contact us API's
app.get("/contactus",getAllQuery);
app.post("/contactus",addQuery);

//Customers API's
app.post("/customers", registerCustomer);

//Admin API's
app.post("/admins", verifyToken, authorize([ROLES.ADMIN]), registerAdmin);

//Login API's
app.post("/login", login);


// Contact us API's
app.get("/contactus", getAllQuery);
app.post("/contactus", addQuery);
app.delete("/contactus/:id", deleteQuery);

app.listen(7655, () => {

    connectDb();
});
