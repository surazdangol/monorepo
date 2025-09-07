import express from "express";
import { getCart, addToCart } from "../controllers/cartController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", protect, getCart);
router.post("/", protect, addToCart);

export default router;