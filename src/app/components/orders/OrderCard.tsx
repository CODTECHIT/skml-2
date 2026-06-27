import { Package, ChevronRight, ExternalLink } from "lucide-react";
import { Link } from "react-router";

export function OrderCard({ order }: { order: any }) {
  // Map order data from API to our needs
  const orderId = order._id;
  const orderDate = new Date(order.createdAt).toLocaleDateString();
  const orderStatus = order.orderStatus;
  const total = order.total;
  const hasTracking = order.trackingId && order.trackingUrl;
  const firstProductName = order.products?.[0]?.productId?.name || "Product";
  const productCount = order.products?.length || 0;

  // Get status-specific badge style
  const getBadgeStyle = () => {
    switch (orderStatus) {
      case 'Delivered': return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      case 'Shipped': return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'Packed': return 'bg-amber-50 text-amber-600 border-amber-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  // Get status message
  const getStatusMessage = () => {
    if (hasTracking && (orderStatus === 'Shipped' || orderStatus === 'Delivered')) {
      return (
        <div className="text-xs text-muted-foreground mt-2">
          <p>Tracking ID: <span className="font-semibold text-foreground">{order.trackingId}</span></p>
          <a 
            href={order.trackingUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-1 text-primary hover:underline mt-1"
          >
            Track your order here <ExternalLink size={10} />
          </a>
        </div>
      );
    }
    switch (orderStatus) {
      case 'Pending':
        return <p className="text-xs text-muted-foreground mt-2">Your order is being processed</p>;
      case 'Packed':
        return <p className="text-xs text-muted-foreground mt-2">Your order is being packed for shipment</p>;
      case 'Shipped':
        return <p className="text-xs text-muted-foreground mt-2">Your order has been shipped</p>;
      case 'Delivered':
        return <p className="text-xs text-muted-foreground mt-2">Your order has been delivered</p>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-4 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3 mb-3">
        <div>
          <p className="text-xs text-muted-foreground mb-0.5">Order #{orderId.substring(orderId.length - 8)}</p>
          <p className="text-sm font-semibold text-foreground">{orderDate}</p>
        </div>
        <div className="text-right">
          <span className={`inline-flex items-center text-[11px] font-bold px-2 py-0.5 rounded-full border ${getBadgeStyle()}`}>
            {orderStatus}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0 text-muted-foreground">
          <Package size={20} />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground line-clamp-1">
            {firstProductName} {productCount > 1 && `+${productCount - 1} more`}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">Total: <span className="font-semibold text-foreground">₹{total.toLocaleString()}</span></p>
        </div>
      </div>
      {getStatusMessage()}
      <div className="flex gap-2 mt-4">
        <Link to={`/tracking/${orderId}`} className="flex-1 text-center bg-primary text-white text-xs font-semibold py-2 rounded-xl hover:bg-primary/90 transition-colors">
          Track Order
        </Link>
        <button className="flex-1 flex items-center justify-center gap-1 bg-background border border-border text-foreground text-xs font-semibold py-2 rounded-xl hover:bg-muted transition-colors">
          Details <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
