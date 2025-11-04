import express from 'express';
import cors from 'cors';
import { connectDb } from "./src/configs/DbConfig.js";
import { getAllPets, getPetById, addPet, updatePet, deletePetById } from './src/controllers/PetController.js';
import multer from "multer";
import path from "path";
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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder where images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });


//product API's
// app.get("/products",verifyToken, authorize([ROLES.ADMIN, ROLES.CUSTOMER]) , getAllProducts);
// app.get("/products/:id", verifyToken, authorize([ROLES.ADMIN, ROLES.CUSTOMER]), getProductById);
// app.post("/products",verifyToken, authorize([ROLES.ADMIN]), addProduct);
// app.delete("/products/:id", verifyToken,authorize([ROLES.ADMIN]), deleteProductById);
// app.put("/products/:id",verifyToken, authorize([ROLES.ADMIN]), updateProduct);

app.get("/products", getAllProducts);
app.get("/products/:id", getProductById);
app.post("/products", addProduct);
app.delete("/products/:id", deleteProductById);
app.put("/products/:id", updateProduct);
app.put("/products/:id", upload.single("image"), updateProduct);


// Pet API
app.get("/pets", getAllPets);
app.get("/pets/:id", getPetById);
app.post("/pets",verifyToken, authorize([ROLES.ADMIN]), addPet);
app.put("/pets/:id",verifyToken, authorize([ROLES.ADMIN]) ,updatePet);
app.delete("/pets/:id",verifyToken, authorize([ROLES.ADMIN]) ,deletePetById);


// Contact us API's
app.get("/contactus",getAllQuery);
app.post("/contactus",addQuery);
app.delete("/contactus",deleteQuery);
//Customers API's
app.post("/customers", registerCustomer);

//Admin API's
app.post("/admins",   registerAdmin);

//Login API's
app.post("/login", login);


app.listen(7655, () => {

    connectDb();
});
