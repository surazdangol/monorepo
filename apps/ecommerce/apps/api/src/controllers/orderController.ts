import { NextFunction, Request, Response } from "express";
import { Order } from "../models/orderModel";
import { Cart } from "../models/cartModel";
import { AuthRequest } from "../middleware/authMiddleware";


// @desc    Create new order
// @route   POST /api/orders
export const createOrder = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Not authorized" });

    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in user's orders
// @route   GET /api/orders/my-orders
export const getMyOrders = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Not authorized" });

    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateOrderToPaid = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update payment fields
    order.isPaid = true;
    order.paidAt = new Date();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateOrderToDelivered = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.isDelivered = true;
    order.deliveredAt = new Date();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// export const createOrderFromCart = async (req: Request, res: Response) => {
//   try {
//     const cart = await Cart.findOne({ user: req.user?._id }).populate("cartItems.product");

//     if (!cart || cart.cartItems.length === 0) {
//       return res.status(400).json({ message: "Cart is empty" });
//     }

//     // Prepare order items and total calculation
//     const orderItems = cart.cartItems.map((item) => ({
//       product: item.product._id,
//       name: item.product.name,
//       qty: item.qty,
//       price: item.product.price,
//     }));

//     const itemsPrice = orderItems.reduce((acc, item) => acc + item.qty * item.price, 0);
//     const shippingPrice = itemsPrice > 100 ? 0 : 10; // example
//     const taxPrice = itemsPrice * 0.1; // 10% tax
//     const totalPrice = itemsPrice + shippingPrice + taxPrice;

//     const order = new Order({
//       user: req.user?._id,
//       orderItems,
//       shippingAddress: req.body.shippingAddress,
//       paymentMethod: req.body.paymentMethod,
//       itemsPrice,
//       shippingPrice,
//       taxPrice,
//       totalPrice,
//     });

//     const createdOrder = await order.save();

//     // Clear the cart after order creation
//     cart.cartItems = [];
//     await cart.save();

//     res.status(201).json(createdOrder);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };