import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { api } from "../../../api/axios";
import { useCreateMobile, useUpdateMobile, useGetCategories } from "../../../hooks/admin/useAdminData";
import { motion } from "framer-motion";

interface ProductFormProps {
  onClose?: () => void;
  editId?: string;
  initialData?: any;
}

export function ProductForm({ onClose, editId, initialData }: ProductFormProps) {
  const isEditing = !!editId;
  const [images, setImages] = useState<string[]>(initialData?.images || []);
  const [uploading, setUploading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: initialData
      ? {
          title: initialData.title,
          brand: initialData.brand,
          category: initialData.category?._id || initialData.category,
          price: initialData.price,
          originalPrice: initialData.originalPrice,
          stock: initialData.stock,
          description: initialData.description,
          status: initialData.status,
        }
      : {}
  });

  const createMobile = useCreateMobile();
  const updateMobile = useUpdateMobile();
  const { data: categories } = useGetCategories();

  // Keep images in sync if initialData changes
  useEffect(() => {
    if (initialData?.images) setImages(initialData.images);
  }, [initialData]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploading(true);
    
    const files = Array.from(e.target.files);
    const uploadedUrls: string[] = [];

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("image", file);

        const res = await api.post("/upload?type=product", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        
        if (res.data.success) {
          uploadedUrls.push(res.data.url);
        }
      }

      if (uploadedUrls.length > 0) {
        setImages(prev => [...prev, ...uploadedUrls]);
      }
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setUploading(false);
      // Reset the input value so the same files can be selected again if needed
      e.target.value = "";
    }
  };

  const onSubmit = (data: any) => {
    const payload = {
      ...data,
      price: Number(data.price),
      originalPrice: data.originalPrice ? Number(data.originalPrice) : undefined,
      stock: Number(data.stock),
      images
    };

    if (isEditing) {
      updateMobile.mutate(
        { id: editId!, data: payload },
        {
          onSuccess: () => {
            if (onClose) onClose();
          }
        }
      );
    } else {
      createMobile.mutate(payload, {
        onSuccess: () => {
          reset();
          setImages([]);
          if (onClose) onClose();
        }
      });
    }
  };

  const isPending = isEditing ? updateMobile.isPending : createMobile.isPending;

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Mobile Title *</label>
          <input
            {...register("title", { required: true })}
            type="text"
            className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
            placeholder="e.g. iPhone 15 Pro Max"
          />
          {errors.title && <span className="text-xs text-destructive">Title is required</span>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Brand *</label>
          <input
            {...register("brand", { required: true })}
            type="text"
            className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
            placeholder="e.g. Apple"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Category *</label>
          <select
            {...register("category", { required: true })}
            className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-background transition-shadow"
          >
            <option value="">Select Category</option>
            {categories?.map((cat: any) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Selling Price (₹) *</label>
          <input
            {...register("price", { required: true, min: 0 })}
            type="number"
            className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
            placeholder="0"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Original Price (₹)</label>
          <input
            {...register("originalPrice")}
            type="number"
            className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
            placeholder="Optional MRP"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Stock *</label>
          <input
            {...register("stock", { required: true, min: 0 })}
            type="number"
            className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
            placeholder="0"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Status</label>
          <select
            {...register("status")}
            className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-background transition-shadow"
          >
            <option value="Active">Active</option>
            <option value="Draft">Draft</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Description *</label>
        <textarea
          {...register("description", { required: true })}
          rows={4}
          className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary resize-none transition-shadow"
          placeholder="Detailed mobile specifications..."
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Images</label>
        <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 hover:border-primary/50 transition-all cursor-pointer relative overflow-hidden group">
          <input type="file" multiple accept="image/png, image/jpeg, image/jpg, image/webp" onChange={handleImageUpload} disabled={uploading} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
          <p className="text-sm font-medium group-hover:text-primary transition-colors">{uploading ? "Uploading to Cloudinary..." : "Click or drag images to upload"}</p>
        </div>
        {images.length > 0 && (
          <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
            {images.map((url, idx) => (
              <div key={idx} className="relative group flex-shrink-0">
                <img src={url} alt={`Preview ${idx}`} className="h-24 w-24 object-cover rounded-xl border shadow-sm border-border" />
                <button
                  type="button"
                  onClick={() => setImages(images.filter((_, i) => i !== idx))}
                  className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-border">
        {onClose && (
          <button type="button" onClick={onClose} className="px-6 py-2 border border-border rounded-xl font-medium hover:bg-muted transition-colors">Cancel</button>
        )}
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2 bg-primary text-white rounded-xl font-medium shadow-md hover:shadow-lg hover:bg-primary/90 transition-all disabled:opacity-50"
        >
          {isPending ? "Saving..." : isEditing ? "Update Mobile" : "Save Mobile"}
        </button>
      </div>
    </motion.form>
  );
}
