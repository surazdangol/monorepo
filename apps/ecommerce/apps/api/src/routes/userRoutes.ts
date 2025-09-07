import { Router } from "express";
import { createUser, getUsers } from "../controllers/userController";
import { authUser } from "../controllers/authController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.post("/login", authUser);

router.get("/", protect, getUsers); 
router.get("/", getUsers);
router.post("/", createUser);


export default router;