import { Request, Response , NextFunction} from "express";
import { Cart } from "../models/cartModel";
import { AuthRequest } from "../middleware/authMiddleware";

// @desc    Get user's cart
// @route   GET /api/cart

export const getCart = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Not authorized" });

    const cart = await Cart.findOne({ user: req.user._id }).populate("cartItems.product");
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    res.json(cart);
  } catch (error) {
    next(error);
  }
};
// @desc    Add item to cart
// @route   POST /api/cart

export const addToCart = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Not authorized" });

    const { productId, qty } = req.body;

    let cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      const itemIndex = cart.cartItems.findIndex((item) => item.product.toString() === productId);

      if (itemIndex > -1) {
        cart.cartItems[itemIndex].qty += qty;
      } else {
        cart.cartItems.push({ product: productId, qty });
      }

      await cart.save();
    } else {
      cart = new Cart({
        user: req.user._id,
        cartItems: [{ product: productId, qty }],
      });
      await cart.save();
    }

    res.status(201).json(cart);
  } catch (error) {
    next(error);
  }
};