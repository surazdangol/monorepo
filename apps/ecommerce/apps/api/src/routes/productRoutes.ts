import { Router } from "express";
import {
  getProducts,
  getProductById,
  createProduct
} from "../controllers/productController";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", createProduct); // Admin only - to be added later

export default router;