import { useState } from "react";
import { api } from "../../../api/axios";
import { useCreateBanner, useGetCategories } from "../../../hooks/admin/useAdminData";

interface BannerFormProps {
  onSuccess?: () => void;
}

// Fixed pages the admin can link to
const FIXED_PAGES = [
  { label: "🏠 Home Page", value: "/" },
  { label: "📦 All Categories", value: "/categories" },
];

export function BannerForm({ onSuccess }: BannerFormProps) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("/");
  const [tag, setTag] = useState("");
  const [type, setType] = useState<"hero" | "promo">("hero");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [uploading, setUploading] = useState(false);

  const createBanner = useCreateBanner();
  const { data: categories } = useGetCategories();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await api.post("/upload?type=banner", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data.success) setImageUrl(res.data.url);
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) { alert("Please upload a banner image first."); return; }
    await createBanner.mutateAsync({ title, subtitle, image: imageUrl, redirectUrl, tag, type });
    setTitle(""); setSubtitle(""); setRedirectUrl("/"); setTag(""); setImageUrl("");
    onSuccess?.();
  };

  return (
    <form className="space-y-5 max-w-2xl" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Banner Title <span className="text-destructive">*</span></label>
          <input type="text" required value={title} onChange={e => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g. Best Mobiles at Best Prices" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Subtitle <span className="text-xs text-muted-foreground">(Hero banners only)</span></label>
          <input type="text" value={subtitle} onChange={e => setSubtitle(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g. Shop top brands at unbeatable prices" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Tag Label</label>
          <select value={tag} onChange={e => setTag(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-background">
            <option value="">No Tag</option>
            <option value="OFFER">🏷️ OFFER</option>
            <option value="SALE">🔥 SALE</option>
            <option value="NEW">✨ NEW</option>
            <option value="BULK">📦 BULK</option>
            <option value="SERVICE">🔧 SERVICE</option>
            <option value="HOT">🌶️ HOT</option>
          </select>
        </div>

        {/* Redirect URL — dynamic dropdown */}
        <div className="space-y-2 col-span-2">
          <label className="text-sm font-medium text-foreground">
            Redirect URL <span className="text-destructive">*</span>
            <span className="ml-2 text-xs text-muted-foreground font-normal">(Where user goes when they click this banner)</span>
          </label>
          <select
            value={redirectUrl}
            onChange={e => setRedirectUrl(e.target.value)}
            className="w-full px-4 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-background"
          >
            <optgroup label="📄 Pages">
              {FIXED_PAGES.map(page => (
                <option key={page.value} value={page.value}>{page.label}</option>
              ))}
            </optgroup>

            {categories && categories.length > 0 && (
              <optgroup label="📁 Categories">
                {categories.map((cat: any) => (
                  <option
                    key={cat._id}
                    value={`/categories/${cat.slug || cat.name.toLowerCase().replace(/ /g, '-')}`}
                  >
                    🗂️ {cat.name}
                  </option>
                ))}
              </optgroup>
            )}
          </select>

          {/* Preview of selected URL */}
          <p className="text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-lg">
            🔗 Selected: <span className="font-mono font-semibold text-foreground">{redirectUrl}</span>
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Banner Type</label>
          <select value={type} onChange={e => setType(e.target.value as "hero" | "promo")}
            className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-background">
            <option value="hero">🖼️ Hero Banner (Carousel)</option>
            <option value="promo">🃏 Promo Tile (Mobile Offers etc.)</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Banner Image <span className="text-destructive">*</span></label>
        <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 transition-colors cursor-pointer relative overflow-hidden">
          <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
          <p className="text-sm font-medium">{uploading ? "Uploading..." : "Click or drag image to upload"}</p>
          <p className="text-xs mt-1">Recommended: 16:9 ratio (1280×720px)</p>
        </div>
        {imageUrl && (
          <div className="mt-3 space-y-2">
            <img src={imageUrl} alt="Preview" className="w-full aspect-video object-cover rounded-xl border border-border" />
            <button type="button" onClick={() => setImageUrl("")} className="text-xs text-destructive hover:underline">Remove</button>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-border">
        <button type="button" onClick={() => onSuccess?.()} className="px-6 py-2 border border-border rounded-xl font-medium hover:bg-muted transition-colors">
          Cancel
        </button>
        <button type="submit" disabled={createBanner.isPending || uploading || !title.trim() || !imageUrl}
          className="px-6 py-2 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-50">
          {createBanner.isPending ? "Saving..." : "Save Banner"}
        </button>
      </div>
    </form>
  );
}
