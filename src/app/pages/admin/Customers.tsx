import { Helmet } from "react-helmet-async";
import { Search, Users as UsersIcon } from "lucide-react";
import { useGetCustomers } from "../../hooks/admin/useAdminData";
import { motion } from "framer-motion";

export function Customers() {
  const { data: customers, isLoading } = useGetCustomers();

  return (
    <>
      <Helmet>
        <title>Customers | Admin Portal</title>
      </Helmet>
      
      <div className="space-y-6">
        <h1 className="font-poppins font-bold text-2xl text-foreground">Customers</h1>

        <div className="bg-card border border-border rounded-2xl shadow-sm p-5">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search customers by name or email..." 
                className="w-full pl-10 pr-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-4 animate-pulse">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-muted/50 rounded-xl w-full" />
              ))}
            </div>
          ) : !customers || customers.length === 0 ? (
            <div className="py-12 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mb-4">
                <UsersIcon size={24} className="text-muted-foreground" />
              </div>
              <h3 className="font-poppins font-medium text-lg text-foreground">No Customers Found</h3>
              <p className="text-muted-foreground text-sm mt-1">Users who register will appear here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border text-muted-foreground text-sm">
                    <th className="pb-4 px-4 font-medium uppercase tracking-wider text-xs">Name</th>
                    <th className="pb-4 px-4 font-medium uppercase tracking-wider text-xs">Email</th>
                    <th className="pb-4 px-4 font-medium uppercase tracking-wider text-xs">Phone</th>
                    <th className="pb-4 px-4 font-medium uppercase tracking-wider text-xs">Joined</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {customers.map((customer: any, index: number) => (
                    <motion.tr 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      key={customer._id} 
                      className="border-b border-border/50 hover:bg-muted/30 transition-all duration-200"
                    >
                      <td className="py-4 px-4 font-semibold text-foreground flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                          {customer.name.charAt(0).toUpperCase()}
                        </div>
                        {customer.name}
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">{customer.email}</td>
                      <td className="py-4 px-4 text-muted-foreground">{customer.phone}</td>
                      <td className="py-4 px-4 text-muted-foreground">{new Date(customer.createdAt).toLocaleDateString()}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
