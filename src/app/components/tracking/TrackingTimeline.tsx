import { CheckCircle2, Circle } from "lucide-react";

export function TrackingTimeline({ currentStatus }: { currentStatus: string }) {
  const steps = ["Pending", "Packed", "Shipped", "Delivered"];
  const currentIndex = steps.indexOf(currentStatus) !== -1 ? steps.indexOf(currentStatus) : 0;

  return (
    <div className="space-y-6">
      {steps.map((step, index) => {
        const isCompleted = index <= currentIndex;
        const isLast = index === steps.length - 1;
        return (
          <div key={step} className="flex items-start gap-4 relative">
            {!isLast && (
              <div className={`absolute left-[11px] top-6 bottom-[-24px] w-0.5 ${index < currentIndex ? "bg-primary" : "bg-border"}`} />
            )}
            <div className="relative z-10 flex-shrink-0 bg-background">
              {isCompleted ? (
                <CheckCircle2 size={24} className="text-primary bg-background rounded-full" />
              ) : (
                <Circle size={24} className="text-muted-foreground bg-background rounded-full" />
              )}
            </div>
            <div>
              <p className={`font-semibold text-sm ${isCompleted ? "text-foreground" : "text-muted-foreground"}`}>{step}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {isCompleted ? "Completed" : "Pending"}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
