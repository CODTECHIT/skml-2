import { Trash2 } from "lucide-react";
import { useGetBanners, useDeleteBanner } from "../../../hooks/admin/useAdminData";

export function BannerTable() {
  const { data: banners, isLoading, isError } = useGetBanners();
  const deleteBanner = useDeleteBanner();

  if (isLoading) return <div className="p-8 text-center text-muted-foreground">Loading banners...</div>;
  if (isError) return <div className="p-8 text-center text-destructive">Failed to load banners.</div>;
  if (!banners || banners.length === 0) return (
    <div className="p-8 text-center text-muted-foreground">No banners yet. Add one above.</div>
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-border text-muted-foreground text-sm">
            <th className="pb-3 font-medium px-4">Image</th>
            <th className="pb-3 font-medium px-4">Title</th>
            <th className="pb-3 font-medium px-4">Type</th>
            <th className="pb-3 font-medium px-4">Redirect URL</th>
            <th className="pb-3 font-medium px-4">Status</th>
            <th className="pb-3 font-medium px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {banners.map((banner: any) => (
            <tr key={banner._id} className="border-b border-border hover:bg-muted/50 transition-colors">
              <td className="py-3 px-4">
                <img src={banner.image} alt={banner.title} className="h-14 w-24 object-cover rounded-lg border border-border" />
              </td>
              <td className="py-4 px-4 font-medium text-foreground">{banner.title}</td>
              <td className="py-4 px-4">
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
                  banner.type === 'promo' ? 'bg-purple-50 text-purple-600 border border-purple-200' : 'bg-blue-50 text-blue-600 border border-blue-200'
                }`}>{banner.type || "hero"}</span>
              </td>
              <td className="py-4 px-4 text-muted-foreground text-xs max-w-[200px] truncate">{banner.redirectUrl}</td>
              <td className="py-4 px-4">
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  banner.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-red-50 text-red-600 border border-red-200'
                }`}>{banner.status}</span>
              </td>
              <td className="py-4 px-4 text-right">
                <button
                  onClick={() => {
                    if (window.confirm("Delete this banner?")) deleteBanner.mutate(banner._id);
                  }}
                  disabled={deleteBanner.isPending}
                  className="p-2 text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50"
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
