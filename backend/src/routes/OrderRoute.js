
import express from "express";
import { createOrder, getAllOrders, getOrdersByCustomer, getOrdersByType } from "../controllers/OrderController.js";
import { verifyToken } from "../middlewares/VerifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createOrder);
router.get("/all", getAllOrders);
router.get("/customer", verifyToken, getOrdersByCustomer);


router.get("/type", verifyToken, getOrdersByType);

export default router;
