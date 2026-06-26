import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router";
import { TrackingTimeline } from "../components/tracking/TrackingTimeline";
import { ChevronLeft } from "lucide-react";

export function Tracking() {
  const { trackingId } = useParams();

  // Mock data
  const currentStatus = "Shipped";
  const estimatedDelivery = "15 Oct 2024";

  return (
    <>
      <Helmet>
        <title>Track Order {trackingId} | SKML Mobiles</title>
      </Helmet>
      <div className="max-w-[800px] mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/orders" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-4">
            <ChevronLeft size={16} className="mr-1" /> Back to Orders
          </Link>
          <h1 className="font-poppins font-bold text-2xl text-foreground">Track Order</h1>
          <p className="text-muted-foreground text-sm mt-1">Order ID: {trackingId}</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex justify-between items-center mb-8 border-b border-border pb-4">
            <div>
              <p className="text-xs text-muted-foreground">Estimated Delivery</p>
              <p className="font-bold text-foreground">{estimatedDelivery}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Carrier</p>
              <p className="font-bold text-foreground">BlueDart Express</p>
            </div>
          </div>
          
          <TrackingTimeline currentStatus={currentStatus} />
        </div>
      </div>
    </>
  );
}
