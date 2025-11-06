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
import { addQuery, getAllQuery, deleteQuery } from './src/controllers/contactUsController.js';
import orderRoutes from "./src/routes/OrderRoute.js";
import { addProduct, deleteProductById, getAllProducts, getProductById, updateProduct } from './src/controllers/ProductController.js';
import { ROLES } from './src/constants/RoleConstants.js';

const app = express();
const PORT = 7655;

app.use(cors());
app.use(express.json());


app.use("/orders", orderRoutes);


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });


app.get("/products", getAllProducts);
app.get("/products/:id", getProductById);
app.post("/products", verifyToken, authorize([ROLES.ADMIN]), addProduct);
app.delete("/products/:id", verifyToken, authorize([ROLES.ADMIN]), deleteProductById);
app.put("/products/:id", verifyToken, authorize([ROLES.ADMIN]), upload.single("image"), updateProduct);


app.get("/pets", getAllPets);
app.get("/pets/:id", getPetById);
app.post("/pets", verifyToken, authorize([ROLES.ADMIN]), addPet);
app.put("/pets/:id", verifyToken, authorize([ROLES.ADMIN]), updatePet);
app.delete("/pets/:id", verifyToken, authorize([ROLES.ADMIN]), deletePetById);


app.get("/contactus", getAllQuery);
app.post("/contactus", addQuery);
app.delete("/contactus/:id", verifyToken, authorize([ROLES.ADMIN]), deleteQuery);


app.post("/customers", registerCustomer);
app.post("/admins", registerAdmin);


app.post("/login", login);


app.listen(PORT, async () => {
  try {
    await connectDb();
    console.log(`Server running on http://localhost:${PORT}`);
  } catch (err) {
    console.error("Database connection failed:", err);
  }
});
