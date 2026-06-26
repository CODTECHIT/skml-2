import { Package, ChevronRight } from "lucide-react";
import { Link } from "react-router";

export function OrderCard({ order }: { order: any }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-4 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3 mb-3">
        <div>
          <p className="text-xs text-muted-foreground mb-0.5">Order #{order.id}</p>
          <p className="text-sm font-semibold text-foreground">{order.date}</p>
        </div>
        <div className="text-right">
          <span className="inline-flex items-center bg-[#E3F7FB] text-primary text-[11px] font-bold px-2 py-0.5 rounded-full">
            {order.status}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0 text-muted-foreground">
          <Package size={20} />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground line-clamp-1">{order.items[0]?.name} {order.items.length > 1 && `+${order.items.length - 1} more`}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Total: <span className="font-semibold text-foreground">₹{order.total.toLocaleString()}</span></p>
        </div>
      </div>
      <div className="flex gap-2">
        <Link to={`/tracking/${order.id}`} className="flex-1 text-center bg-primary text-white text-xs font-semibold py-2 rounded-xl hover:bg-primary/90 transition-colors">
          Track Order
        </Link>
        <button className="flex-1 flex items-center justify-center gap-1 bg-background border border-border text-foreground text-xs font-semibold py-2 rounded-xl hover:bg-muted transition-colors">
          Details <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
