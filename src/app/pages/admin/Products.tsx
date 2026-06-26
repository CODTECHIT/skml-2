import { Helmet } from "react-helmet-async";
import { Plus, Search, Filter } from "lucide-react";
import { useState } from "react";
import { ProductTable } from "../../components/admin/product/ProductTable";
import { ProductForm } from "../../components/admin/product/ProductForm";

export function Products() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Helmet>
        <title>Products | Admin Portal</title>
      </Helmet>
      
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="font-poppins font-bold text-2xl text-foreground">
            {showForm ? "Add New Product" : "Products"}
          </h1>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="flex items-center justify-center gap-2 bg-primary text-white font-medium px-4 py-2.5 rounded-xl hover:bg-primary/90 transition-colors"
          >
            {showForm ? "Back to Products" : <><Plus size={18} /> Add Product</>}
          </button>
        </div>

        <div className="bg-card border border-border rounded-2xl shadow-sm p-5">
          {!showForm && (
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-xl text-foreground hover:bg-muted transition-colors font-medium">
                <Filter size={18} /> Filter
              </button>
            </div>
          )}

          {showForm ? <ProductForm /> : <ProductTable />}
        </div>
      </div>
    </>
  );
}
