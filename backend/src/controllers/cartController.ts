import { Request, Response, NextFunction } from "express";
import { Cart } from "../models/Cart";
import { Product } from "../models/Product";

export const getCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let cart = await Cart.findOne({ userId: (req as any).user._id }).populate("items.productId");
    if (!cart) {
      cart = await Cart.create({ userId: (req as any).user._id, items: [] });
    }
    res.status(200).json({ success: true, message: "Cart fetched", data: cart.items });
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId) {
      return res.status(400).json({ success: false, message: "Product ID is required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const qty = Number(quantity) || 1;
    let cart = await Cart.findOne({ userId: (req as any).user._id });
    if (!cart) {
      cart = await Cart.create({ userId: (req as any).user._id, items: [] });
    }

    const existingIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (existingIndex > -1) {
      const newQty = cart.items[existingIndex].quantity + qty;
      if (product.stock < newQty) {
        return res.status(400).json({ success: false, message: `Only ${product.stock} items in stock` });
      }
      cart.items[existingIndex].quantity = newQty;
    } else {
      if (product.stock < qty) {
        return res.status(400).json({ success: false, message: `Only ${product.stock} items in stock` });
      }
      cart.items.push({ productId, quantity: qty } as any);
    }

    await cart.save();
    const populated = await cart.populate("items.productId");
    res.status(200).json({ success: true, message: "Item added to cart", data: populated.items });
  } catch (error) {
    next(error);
  }
};

export const updateCartItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params; // productId
    const { quantity } = req.body;
    const qty = Number(quantity);

    let cart = await Cart.findOne({ userId: (req as any).user._id });
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    if (qty <= 0) {
      cart.items = cart.items.filter(item => item.productId.toString() !== id) as any;
    } else {
      if (product.stock < qty) {
        return res.status(400).json({ success: false, message: `Only ${product.stock} items in stock` });
      }
      const existingIndex = cart.items.findIndex(item => item.productId.toString() === id);
      if (existingIndex > -1) {
        cart.items[existingIndex].quantity = qty;
      } else {
        cart.items.push({ productId: id, quantity: qty } as any);
      }
    }

    await cart.save();
    const populated = await cart.populate("items.productId");
    res.status(200).json({ success: true, message: "Cart updated", data: populated.items });
  } catch (error) {
    next(error);
  }
};

export const removeFromCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params; // productId
    let cart = await Cart.findOne({ userId: (req as any).user._id });
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    cart.items = cart.items.filter(item => item.productId.toString() !== id) as any;
    await cart.save();
    const populated = await cart.populate("items.productId");
    res.status(200).json({ success: true, message: "Item removed from cart", data: populated.items });
  } catch (error) {
    next(error);
  }
};

export const clearCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let cart = await Cart.findOne({ userId: (req as any).user._id });
    if (cart) {
      cart.items = [] as any;
      await cart.save();
    }
    res.status(200).json({ success: true, message: "Cart cleared", data: [] });
  } catch (error) {
    next(error);
  }
};
