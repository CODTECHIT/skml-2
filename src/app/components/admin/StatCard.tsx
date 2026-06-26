import { LucideIcon } from "lucide-react";

export function StatCard({ title, value, icon: Icon, trend }: { title: string; value: string | number; icon: LucideIcon; trend?: string }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
          <Icon size={20} />
        </div>
      </div>
      <h3 className="font-poppins font-bold text-2xl text-foreground mb-1">{value}</h3>
      {trend && (
        <p className={`text-xs font-semibold ${trend.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>
          {trend} from last month
        </p>
      )}
    </div>
  );
}
