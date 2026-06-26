import { Helmet } from "react-helmet-async";
import { DollarSign, ShoppingBag, ShoppingCart, Users, AlertTriangle, TrendingUp } from "lucide-react";
import { StatCard } from "../../components/admin/StatCard";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { useGetAnalytics } from "../../hooks/admin/useAdminData";
import { useGetProducts } from "../../hooks/useData";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/axios";

export function Dashboard() {
  const { data: analytics, isLoading: analyticsLoading } = useGetAnalytics();
  const { data: products } = useGetProducts();

  // Get customer count and orders via analytics data
  const summary = analytics?.summary || {};
  const salesData = analytics?.salesData || [];

  // Low stock count from products
  const lowStockCount = (products || []).filter((p: any) => p.stock != null && p.stock < 5).length;

  const formatCurrency = (val: number) => {
    if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
    if (val >= 1000) return `₹${(val / 1000).toFixed(1)}K`;
    return `₹${val}`;
  };

  return (
    <>
      <Helmet>
        <title>Dashboard | Admin Portal</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-poppins font-bold text-2xl text-foreground">Dashboard</h1>
          {analyticsLoading && <span className="text-xs text-muted-foreground animate-pulse">Loading data...</span>}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
          <StatCard title="Total Products" value={analyticsLoading ? "..." : (products?.length ?? 0)} icon={ShoppingBag} trend="+new" />
          <StatCard title="Total Orders" value={analyticsLoading ? "..." : (summary.totalOrders ?? 0)} icon={ShoppingCart} trend="live" />
          <StatCard title="Pending Orders" value={analyticsLoading ? "..." : (summary.pendingOrders ?? 0)} icon={TrendingUp} trend="live" />
          <StatCard title="Revenue" value={analyticsLoading ? "..." : formatCurrency(summary.totalRevenue ?? 0)} icon={DollarSign} trend="live" />
          <StatCard title="Customers" value={analyticsLoading ? "..." : (summary.totalCustomers ?? 0)} icon={Users} trend="live" />
          <StatCard title="Low Stock" value={analyticsLoading ? "..." : lowStockCount} icon={AlertTriangle} trend="alert" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
            <h3 className="font-poppins font-bold text-foreground text-lg mb-4">Revenue (Last 7 Days)</h3>
            <div className="h-[300px]">
              {salesData.length === 0 ? (
                <div className="h-full flex items-center justify-center text-muted-foreground text-sm">No sales data yet</div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00B4D8" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#00B4D8" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <Tooltip formatter={(value: number) => [`₹${value.toLocaleString()}`, "Revenue"]} />
                    <Area type="monotone" dataKey="revenue" stroke="#00B4D8" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
            <h3 className="font-poppins font-bold text-foreground text-lg mb-4">Orders (Last 7 Days)</h3>
            <div className="h-[300px]">
              {salesData.length === 0 ? (
                <div className="h-full flex items-center justify-center text-muted-foreground text-sm">No orders data yet</div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip formatter={(value: number) => [value, "Orders"]} cursor={{ fill: "#f3f4f6" }} />
                    <Bar dataKey="orders" fill="#0A2E36" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
