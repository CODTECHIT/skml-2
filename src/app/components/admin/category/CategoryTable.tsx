import { Edit, Trash2 } from "lucide-react";
import { useGetCategories, useDeleteCategory } from "../../../hooks/admin/useAdminData";

interface CategoryTableProps {
  onEdit: (category: any) => void;
}

export function CategoryTable({ onEdit }: CategoryTableProps) {
  const { data: categories, isLoading, isError } = useGetCategories();
  const deleteCategory = useDeleteCategory();

  if (isLoading) return <div className="p-8 text-center text-muted-foreground">Loading categories...</div>;
  if (isError) return <div className="p-8 text-center text-destructive">Failed to load categories.</div>;
  if (!categories || categories.length === 0) return <div className="p-8 text-center text-muted-foreground">No categories found. Add one above.</div>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-border text-muted-foreground text-sm">
            <th className="pb-3 font-medium px-4">Image</th>
            <th className="pb-3 font-medium px-4">Category Name</th>
            <th className="pb-3 font-medium px-4">Slug</th>
            <th className="pb-3 font-medium px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {categories.map((cat: any) => (
            <tr key={cat._id} className="border-b border-border hover:bg-muted/50 transition-colors">
              <td className="py-4 px-4">
                <img src={cat.image} alt={cat.name} className="w-12 h-12 object-cover rounded border border-border" />
              </td>
              <td className="py-4 px-4 font-medium text-foreground">{cat.name}</td>
              <td className="py-4 px-4 text-muted-foreground">{cat.slug}</td>
              <td className="py-4 px-4 text-right">
                <button
                  onClick={() => onEdit(cat)}
                  className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                  title="Edit category"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => {
                    if(window.confirm("Are you sure you want to delete this category?")) {
                      deleteCategory.mutate(cat._id);
                    }
                  }}
                  disabled={deleteCategory.isPending}
                  className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors ml-1 disabled:opacity-50"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
