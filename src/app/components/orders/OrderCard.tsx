import { Package, ChevronRight, ExternalLink } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";

export function OrderCard({ order }: { order: any }) {
  const [isOpen, setIsOpen] = useState(false);

  // Map order data from API to our needs
  const orderId = order._id;
  const orderDate = new Date(order.createdAt).toLocaleDateString();
  const orderStatus = order.orderStatus;
  const total = order.total;
  const hasTracking = order.trackingId && order.trackingUrl;
  
  // Fix property lookup to support 'title'
  const firstProductName = order.products?.[0]?.productId?.title || order.products?.[0]?.productId?.name || "Product";
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
        <div className="text-xs text-muted-foreground mt-2 font-poppins">
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
        return <p className="text-xs text-muted-foreground mt-2 font-poppins">Your order is being processed</p>;
      case 'Packed':
        return <p className="text-xs text-muted-foreground mt-2 font-poppins">Your order is being packed for shipment</p>;
      case 'Shipped':
        return <p className="text-xs text-muted-foreground mt-2 font-poppins">Your order has been shipped</p>;
      case 'Delivered':
        return <p className="text-xs text-muted-foreground mt-2 font-poppins">Your order has been delivered</p>;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="bg-card border border-border rounded-2xl p-4 shadow-sm font-poppins">
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
          <Link to={`/tracking/${orderId}`} className="flex-1 text-center bg-primary text-white text-xs font-semibold py-2.5 rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center">
            Track Order
          </Link>
          <button 
            onClick={() => setIsOpen(true)}
            className="flex-1 flex items-center justify-center gap-1 bg-background border border-border text-foreground text-xs font-semibold py-2.5 rounded-xl hover:bg-muted transition-colors"
          >
            Details <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Details Popup Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card border border-border w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200 font-poppins">
            {/* Header */}
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div>
                <h3 className="font-bold text-foreground text-lg">Order Details</h3>
                <p className="text-xs text-muted-foreground mt-0.5">ID: <span className="font-mono text-foreground">{orderId}</span></p>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-muted-foreground hover:text-foreground text-sm hover:bg-muted rounded-xl transition-colors w-8 h-8 flex items-center justify-center border border-border"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto space-y-5 flex-1">
              {/* Date & Status */}
              <div className="flex justify-between items-center bg-muted/40 p-4 rounded-2xl border border-border">
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Order Date</p>
                  <p className="text-sm font-semibold text-foreground mt-0.5">{orderDate}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground mb-0.5 font-medium">Status</p>
                  <span className={`inline-flex items-center text-xs font-bold px-3 py-0.5 rounded-full border ${getBadgeStyle()}`}>
                    {orderStatus}
                  </span>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                <h4 className="font-bold text-sm text-foreground">Items Ordered ({productCount})</h4>
                <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
                  {order.products?.map((item: any, idx: number) => {
                    const prodName = item.productId?.title || item.productId?.name || "Product";
                    const prodImg = item.productId?.img;
                    const prodPrice = item.price || item.productId?.price || 0;
                    return (
                      <div key={idx} className="flex gap-3 items-center bg-card border border-border p-3 rounded-2xl">
                        <div className="w-12 h-12 bg-muted rounded-xl p-1 flex-shrink-0 flex items-center justify-center border border-border">
                          {prodImg ? (
                            <img src={prodImg} alt={prodName} className="w-full h-full object-contain" />
                          ) : (
                            <Package size={16} className="text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-foreground truncate">{prodName}</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">
                            ₹{prodPrice.toLocaleString()} × {item.quantity}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-xs font-bold text-foreground">
                            ₹{(prodPrice * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Delivery Address */}
              {order.address && (
                <div className="space-y-2">
                  <h4 className="font-bold text-sm text-foreground">Shipping Address</h4>
                  <div className="bg-muted/30 border border-border p-4 rounded-2xl text-xs text-muted-foreground leading-relaxed">
                    <p className="font-bold text-foreground mb-1">{order.address.fullName}</p>
                    <p>{order.address.street}</p>
                    <p>{order.address.city}, {order.address.state} - {order.address.zipCode}</p>
                    <p className="mt-2 text-foreground/80 font-medium">Phone: {order.address.phone}</p>
                  </div>
                </div>
              )}

              {/* Payment Details */}
              <div className="grid grid-cols-2 gap-4 bg-muted/20 border border-border p-4 rounded-2xl text-xs">
                <div>
                  <p className="text-muted-foreground font-medium">Payment Method</p>
                  <p className="font-semibold text-foreground mt-0.5">
                    {order.paymentMethod === "COD" ? "Cash on Delivery" : "Online Payment (Razorpay)"}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground font-medium">Payment Status</p>
                  <p className={`font-semibold mt-0.5 ${order.paymentStatus === "Paid" ? "text-emerald-600" : "text-amber-600"}`}>
                    {order.paymentStatus || "Pending"}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Summary */}
            <div className="p-6 border-t border-border bg-muted/10">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-foreground">Total Order Value</span>
                <span className="text-primary text-lg font-bold">₹{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
