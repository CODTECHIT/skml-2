import { Menu, Bell, User } from "lucide-react";
import { useAuthStore } from "../../store/authStore";

export function AdminHeader({ toggleSidebar }: { toggleSidebar: () => void }) {
  const { user } = useAuthStore();

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="lg:hidden p-2 hover:bg-muted rounded-lg text-muted-foreground transition-colors">
          <Menu size={20} />
        </button>
        <h2 className="font-poppins font-semibold text-foreground hidden sm:block">Admin Portal</h2>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-muted rounded-full text-muted-foreground transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
        </button>
        <div className="flex items-center gap-3 pl-4 border-l border-border">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
            <User size={16} />
          </div>
          <span className="text-sm font-medium text-foreground hidden sm:block">{user?.name}</span>
        </div>
      </div>
    </header>
  );
}
