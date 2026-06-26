import { Request, Response, NextFunction } from "express";
import { Order } from "../models/Order";
import { User } from "../models/User";

export const getAnalytics = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Basic aggregation for total revenue, orders, and customers
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ orderStatus: "Pending" });
    const totalCustomers = await User.countDocuments({ role: "customer" });
    
    const revenueAggregation = await Order.aggregate([
      { $match: { paymentStatus: "Paid" } },
      { $group: { _id: null, totalRevenue: { $sum: "$total" } } }
    ]);
    const totalRevenue = revenueAggregation.length > 0 ? revenueAggregation[0].totalRevenue : 0;

    // Daily Sales Data for the chart (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const salesDataRaw = await Order.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          revenue: { $sum: { $cond: [{ $eq: ["$paymentStatus", "Paid"] }, "$total", 0] } },
          orders: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Format for Recharts
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const salesData = salesDataRaw.map(item => {
      const date = new Date(item._id);
      return {
        name: days[date.getDay()],
        date: item._id,
        revenue: item.revenue,
        orders: item.orders,
      };
    });

    res.status(200).json({
      success: true,
      data: {
        summary: {
          totalRevenue,
          totalOrders,
          pendingOrders,
          totalCustomers,
        },
        salesData
      }
    });
  } catch (error) {
    next(error);
  }
};
