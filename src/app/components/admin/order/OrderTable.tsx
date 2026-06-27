import { Edit, Package, Save } from "lucide-react";
import { useGetOrders, useUpdateOrderStatus } from "../../../hooks/admin/useAdminData";
import { motion } from "framer-motion";
import { useState } from "react";

export function OrderTable() {
  const { data: orders, isLoading } = useGetOrders();
  const updateOrder = useUpdateOrderStatus();
  const [editingOrder, setEditingOrder] = useState<string | null>(null);
  const [trackingIdInput, setTrackingIdInput] = useState("");
  const [trackingUrlInput, setTrackingUrlInput] = useState("");

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-muted/50 rounded-xl w-full" />
        ))}
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="py-12 text-center flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mb-4">
          <Package size={24} className="text-muted-foreground" />
        </div>
        <h3 className="font-poppins font-medium text-lg text-foreground">No Orders Found</h3>
        <p className="text-muted-foreground text-sm mt-1">Waiting for customers to make a purchase.</p>
      </div>
    );
  }

  const startEditing = (order: any) => {
    setEditingOrder(order._id);
    setTrackingIdInput(order.trackingId || "");
    setTrackingUrlInput(order.trackingUrl || "");
  };

  const saveOrder = (orderId: string, currentStatus: string) => {
    updateOrder.mutate({
      id: orderId,
      orderStatus: currentStatus,
      trackingId: trackingIdInput,
      trackingUrl: trackingUrlInput
    });
    setEditingOrder(null);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-border text-muted-foreground text-sm">
            <th className="pb-4 px-4 font-medium uppercase tracking-wider text-xs">Order ID</th>
            <th className="pb-4 px-4 font-medium uppercase tracking-wider text-xs">Customer</th>
            <th className="pb-4 px-4 font-medium uppercase tracking-wider text-xs">Date</th>
            <th className="pb-4 px-4 font-medium uppercase tracking-wider text-xs">Total</th>
            <th className="pb-4 px-4 font-medium uppercase tracking-wider text-xs">Status</th>
            <th className="pb-4 px-4 font-medium uppercase tracking-wider text-xs">Tracking ID</th>
            <th className="pb-4 px-4 font-medium uppercase tracking-wider text-xs">Tracking URL</th>
            <th className="pb-4 px-4 font-medium uppercase tracking-wider text-xs text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {orders.map((order: any, index: number) => (
            <motion.tr 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              key={order._id} 
              className="border-b border-border/50 hover:bg-muted/30 transition-all duration-200"
            >
              <td className="py-4 px-4 font-semibold text-foreground uppercase text-xs tracking-wider">
                {order._id.substring(order._id.length - 8)}
              </td>
              <td className="py-4 px-4 text-muted-foreground font-medium">
                {order.address?.fullName || "Guest"}
              </td>
              <td className="py-4 px-4 text-muted-foreground">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>
              <td className="py-4 px-4 font-bold text-foreground">₹{order.total?.toLocaleString()}</td>
              <td className="py-4 px-4">
                <select 
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border appearance-none cursor-pointer outline-none shadow-sm transition-colors ${
                    order.orderStatus === 'Delivered' ? 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100' : 
                    order.orderStatus === 'Shipped' ? 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100' :
                    'bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100'
                  }`}
                  defaultValue={order.orderStatus}
                  onChange={(e) => {
                    if (editingOrder === order._id) {
                      // If editing, just update - we'll save on click
                    } else {
                      updateOrder.mutate({ id: order._id, orderStatus: e.target.value });
                    }
                  }}
                  disabled={updateOrder.isPending}
                >
                  <option value="Pending">Pending</option>
                  <option value="Packed">Packed</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </td>
              <td className="py-4 px-4">
                {editingOrder === order._id ? (
                  <input
                    type="text"
                    value={trackingIdInput}
                    onChange={(e) => setTrackingIdInput(e.target.value)}
                    placeholder="Tracking ID"
                    className="w-full px-2 py-1 text-xs border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                ) : (
                  <span className="text-xs text-muted-foreground">{order.trackingId || "-"}</span>
                )}
              </td>
              <td className="py-4 px-4">
                {editingOrder === order._id ? (
                  <input
                    type="text"
                    value={trackingUrlInput}
                    onChange={(e) => setTrackingUrlInput(e.target.value)}
                    placeholder="Tracking URL"
                    className="w-full px-2 py-1 text-xs border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                ) : order.trackingUrl ? (
                  <a href={order.trackingUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline truncate block">
                    {order.trackingUrl}
                  </a>
                ) : (
                  <span className="text-xs text-muted-foreground">-</span>
                )}
              </td>
              <td className="py-4 px-4 text-right">
                {editingOrder === order._id ? (
                  <button 
                    onClick={() => saveOrder(order._id, order.orderStatus)}
                    disabled={updateOrder.isPending}
                    className="p-2 text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <Save size={16} />
                  </button>
                ) : (
                  <button 
                    onClick={() => startEditing(order)}
                    className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                )}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
