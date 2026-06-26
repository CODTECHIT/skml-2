import { Edit, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useGetMobiles, useDeleteMobile } from "../../../hooks/admin/useAdminData";

interface ProductTableProps {
  onEdit: (product: any) => void;
}

export function ProductTable({ onEdit }: ProductTableProps) {
  const { data: products, isLoading } = useGetMobiles();
  const deleteMobile = useDeleteMobile();

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-muted/50 rounded-xl w-full" />
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="py-12 text-center flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mb-4">
          <Trash2 size={24} className="text-muted-foreground" />
        </div>
        <h3 className="font-poppins font-medium text-lg text-foreground">No Mobiles Found</h3>
        <p className="text-muted-foreground text-sm mt-1">Start by adding a new mobile to your inventory.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-border text-muted-foreground text-sm font-medium">
            <th className="pb-4 px-4 font-medium uppercase tracking-wider text-xs">Mobile</th>
            <th className="pb-4 px-4 font-medium uppercase tracking-wider text-xs">Category</th>
            <th className="pb-4 px-4 font-medium uppercase tracking-wider text-xs">Price</th>
            <th className="pb-4 px-4 font-medium uppercase tracking-wider text-xs">Stock</th>
            <th className="pb-4 px-4 font-medium uppercase tracking-wider text-xs">Status</th>
            <th className="pb-4 px-4 font-medium uppercase tracking-wider text-xs text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {products.map((product: any, index: number) => (
            <motion.tr 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              key={product._id} 
              className="border-b border-border/50 hover:bg-muted/30 transition-all duration-200"
            >
              <td className="py-4 px-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-border/50 flex items-center justify-center p-1.5 overflow-hidden">
                    <img src={product.images?.[0] || "https://placehold.co/100"} alt={product.title} className="max-w-full max-h-full object-contain hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{product.title}</p>
                    <p className="text-xs text-muted-foreground">{product.brand}</p>
                  </div>
                </div>
              </td>
              <td className="py-4 px-4">
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-muted/50 text-muted-foreground">
                  {product.category?.name || "Uncategorized"}
                </span>
              </td>
              <td className="py-4 px-4 font-semibold text-foreground">
                ₹{product.price?.toLocaleString()}
                {product.originalPrice && (
                  <span className="text-xs text-muted-foreground line-through ml-2 font-normal">₹{product.originalPrice.toLocaleString()}</span>
                )}
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-emerald-500' : product.stock > 0 ? 'bg-amber-500' : 'bg-red-500'}`} />
                  <span className="font-medium">{product.stock}</span>
                </div>
              </td>
              <td className="py-4 px-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${product.status === 'Draft' ? 'bg-slate-50 text-slate-600 border-slate-200' : 'bg-emerald-50 text-emerald-600 border-emerald-200'}`}>
                  {product.status || 'Active'}
                </span>
              </td>
              <td className="py-4 px-4 text-right">
                <button
                  onClick={() => onEdit(product)}
                  className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors inline-flex"
                  title="Edit mobile"
                >
                  <Edit size={16} />
                </button>
                <button 
                  onClick={() => {
                    if(window.confirm('Are you sure you want to delete this mobile?')) {
                      deleteMobile.mutate(product._id);
                    }
                  }}
                  disabled={deleteMobile.isPending}
                  className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors ml-1 inline-flex disabled:opacity-50"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
