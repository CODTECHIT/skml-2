import { useState, useEffect } from "react";
import { api } from "../../../api/axios";
import { useCreateCategory, useUpdateCategory } from "../../../hooks/admin/useAdminData";

interface CategoryFormProps {
  onSuccess?: () => void;
  editId?: string;
  initialData?: { name: string; image: string };
}

export function CategoryForm({ onSuccess, editId, initialData }: CategoryFormProps) {
  const isEditing = !!editId;
  const [name, setName] = useState(initialData?.name || "");
  const [imageUrl, setImageUrl] = useState<string>(initialData?.image || "");
  const [uploading, setUploading] = useState(false);

  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();

  // Sync when switching between edit targets
  useEffect(() => {
    setName(initialData?.name || "");
    setImageUrl(initialData?.image || "");
  }, [initialData]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await api.post("/upload?type=category", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      if (res.data.success) {
        setImageUrl(res.data.url);
      }
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (isEditing) {
      await updateCategory.mutateAsync({ id: editId!, data: { name, image: imageUrl } });
    } else {
      await createCategory.mutateAsync({ name, image: imageUrl });
    }

    setName("");
    setImageUrl("");
    onSuccess?.();
  };

  const isPending = isEditing ? updateCategory.isPending : createCategory.isPending;

  return (
    <form className="space-y-6 max-w-2xl" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Category Name <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g. Smartphones"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Category Image</label>
          <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 transition-colors cursor-pointer relative overflow-hidden">
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/webp"
              onChange={handleImageUpload}
              disabled={uploading}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <p className="text-sm font-medium">{uploading ? "Uploading..." : "Click or drag image to upload"}</p>
            <p className="text-xs mt-1">PNG, JPG, WEBP up to 5MB</p>
          </div>
          {imageUrl && (
            <div className="mt-3 flex items-center gap-3">
              <img src={imageUrl} alt="Category Preview" className="h-20 w-20 object-cover rounded-lg border border-border" />
              <button type="button" onClick={() => setImageUrl("")} className="text-xs text-destructive hover:underline">Remove</button>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-border">
        <button
          type="button"
          onClick={() => { setName(""); setImageUrl(""); onSuccess?.(); }}
          className="px-6 py-2 border border-border rounded-xl font-medium hover:bg-muted transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending || uploading || !name.trim()}
          className="px-6 py-2 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {isPending ? "Saving..." : isEditing ? "Update Category" : "Save Category"}
        </button>
      </div>
    </form>
  );
}
