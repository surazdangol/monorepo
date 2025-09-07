import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import userRoutes from "./routes/userRoutes";
import productRoutes from './routes/productRoutes';
import orderRoutes from "./routes/orderRoutes";
import cartRoutes from './routes/cartRoutes';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("api/carts", cartRoutes);

// Test route
// app.get("/",async (req, res) => {
//   const users = await User.find();
//   res.send(users);
// });

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost/27017/mern-ecom";
mongoose.connect(MONGO_URI)
.then( () => {
  console.log("✅ Mongo DB Connected");
  
  // Start server
  app.listen(PORT, () => {
  
    console.log(`Server running on http://localhost:${PORT}`);
  });

})
.catch( (err) => {
  console.error("❌ DB Connection Error", err)
}) ;