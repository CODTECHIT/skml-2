import { Helmet } from "react-helmet-async";
import { Plus } from "lucide-react";
import { useState } from "react";
import { CategoryTable } from "../../components/admin/category/CategoryTable";
import { CategoryForm } from "../../components/admin/category/CategoryForm";

export function Categories() {
  const [showForm, setShowForm] = useState(false);
  const [editCategory, setEditCategory] = useState<any>(null);

  const handleEdit = (category: any) => {
    setEditCategory(category);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setEditCategory(null);
  };

  const formTitle = editCategory ? `Edit: ${editCategory.name}` : "Add New Category";

  return (
    <>
      <Helmet>
        <title>Categories | Admin Portal</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="font-poppins font-bold text-2xl text-foreground">
            {showForm ? formTitle : "Categories"}
          </h1>
          <button
            onClick={() => {
              if (showForm) {
                handleClose();
              } else {
                setShowForm(true);
              }
            }}
            className="flex items-center justify-center gap-2 bg-primary text-white font-medium px-4 py-2.5 rounded-xl hover:bg-primary/90 transition-colors"
          >
            {showForm ? "Back to Categories" : <><Plus size={18} /> Add Category</>}
          </button>
        </div>

        <div className="bg-card border border-border rounded-2xl shadow-sm p-5">
          {showForm ? (
            <CategoryForm
              onSuccess={handleClose}
              editId={editCategory?._id}
              initialData={editCategory ? { name: editCategory.name, image: editCategory.image } : undefined}
            />
          ) : (
            <CategoryTable onEdit={handleEdit} />
          )}
        </div>
      </div>
    </>
  );
}
