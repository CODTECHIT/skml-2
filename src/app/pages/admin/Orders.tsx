import { Helmet } from "react-helmet-async";
import { Search, Filter } from "lucide-react";
import { OrderTable } from "../../components/admin/order/OrderTable";

export function Orders() {
  return (
    <>
      <Helmet>
        <title>Orders | Admin Portal</title>
      </Helmet>
      
      <div className="space-y-6">
        <h1 className="font-poppins font-bold text-2xl text-foreground">Orders</h1>

        <div className="bg-card border border-border rounded-2xl shadow-sm p-5">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search by Order ID or Customer..." 
                className="w-full pl-10 pr-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-xl text-foreground hover:bg-muted transition-colors font-medium">
              <Filter size={18} /> Filter
            </button>
          </div>

          <OrderTable />
        </div>
      </div>
    </>
  );
}
