import { Helmet } from "react-helmet-async";
import { Plus } from "lucide-react";
import { useState } from "react";
import { BannerTable } from "../../components/admin/banner/BannerTable";
import { BannerForm } from "../../components/admin/banner/BannerForm";

export function Banners() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Helmet>
        <title>Banners | Admin Portal</title>
      </Helmet>
      
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="font-poppins font-bold text-2xl text-foreground">
            {showForm ? "Add New Banner" : "Banners"}
          </h1>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="flex items-center justify-center gap-2 bg-primary text-white font-medium px-4 py-2.5 rounded-xl hover:bg-primary/90 transition-colors"
          >
            {showForm ? "Back to Banners" : <><Plus size={18} /> Add Banner</>}
          </button>
        </div>

        <div className="bg-card border border-border rounded-2xl shadow-sm p-5">
          {showForm ? <BannerForm onSuccess={() => setShowForm(false)} /> : <BannerTable />}
        </div>
      </div>
    </>
  );
}
