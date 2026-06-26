import { User } from "lucide-react";

export function ProfileCard({ user }: { user: any }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-sm flex items-center gap-4">
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center flex-shrink-0 border-2 border-primary/20">
        <User size={30} className="text-muted-foreground" />
      </div>
      <div>
        <h2 className="font-poppins font-bold text-foreground text-lg">{user?.name || "Guest User"}</h2>
        <p className="text-sm text-muted-foreground">{user?.email || "No email provided"}</p>
        <p className="text-sm text-muted-foreground mt-0.5">{user?.phone || "+91 XXXXXXXXXX"}</p>
      </div>
    </div>
  );
}
