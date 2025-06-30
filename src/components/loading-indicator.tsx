import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type LoadingIndicatorProps = {
  text?: string;
  className?: string;
};

export function LoadingIndicator({ text, className }: LoadingIndicatorProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-4 text-primary", className)}>
      <Loader2 className="h-12 w-12 animate-spin" />
      {text && <p className="text-lg font-medium text-foreground">{text}</p>}
    </div>
  );
}
