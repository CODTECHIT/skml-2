import { Helmet } from "react-helmet-async";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useGetAnalytics } from "../../hooks/admin/useAdminData";

export function Reports() {
  const { data: analytics, isLoading } = useGetAnalytics();

  if (isLoading) {
    return <div className="p-8 text-center text-muted-foreground animate-pulse font-medium">Loading premium analytics dashboard...</div>;
  }

  const { summary, salesData } = analytics || { summary: { totalRevenue: 0, totalOrders: 0, totalCustomers: 0 }, salesData: [] };

  return (
    <>
      <Helmet>
        <title>Reports | Admin Portal</title>
      </Helmet>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-poppins font-bold text-2xl text-foreground">Sales Reports</h1>
          <select className="px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-background font-medium shadow-sm">
            <option>Last 7 Days</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm col-span-1 md:col-span-3 lg:col-span-2">
            <h3 className="font-poppins font-bold text-foreground text-lg mb-4">Revenue Trend</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00B4D8" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#00B4D8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <Tooltip 
                    formatter={(value: number) => [`₹${value.toLocaleString()}`, "Revenue"]} 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#00B4D8" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
            <h3 className="font-poppins font-bold text-foreground text-lg mb-4">Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-primary/5 rounded-xl border border-primary/10">
                <span className="text-primary font-semibold">Total Revenue</span>
                <span className="font-bold text-foreground text-xl">₹{summary.totalRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-muted/50 rounded-xl border border-border/50">
                <span className="text-muted-foreground font-medium">Total Orders</span>
                <span className="font-bold text-foreground">{summary.totalOrders}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-muted/50 rounded-xl border border-border/50">
                <span className="text-muted-foreground font-medium">Total Customers</span>
                <span className="font-bold text-foreground">{summary.totalCustomers}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
