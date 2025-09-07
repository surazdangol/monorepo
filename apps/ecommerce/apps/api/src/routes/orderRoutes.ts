import express from "express";
import { createOrder, getMyOrders, getOrderById, updateOrderToDelivered, updateOrderToPaid } from "../controllers/orderController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();


router.post("/", protect,createOrder);
router.get("/my-orders", protect, getMyOrders);
router.get("/:id", getOrderById);
router.put("/:id/pay", updateOrderToPaid); // ✅ payment endpoint

router.put("/:id/deliver", updateOrderToDelivered);

export default router;