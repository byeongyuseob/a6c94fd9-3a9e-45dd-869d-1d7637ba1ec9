
import { Sparkles } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Logo = ({ size = "md", className = "" }: LogoProps) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10", 
    lg: "h-12 w-12"
  };

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6"
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`p-2.5 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-xl shadow-medium ${sizeClasses[size]}`}>
        <Sparkles className={iconSizes[size]} />
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-lg tracking-tight">
          ProjectHub
        </span>
        <span className="text-xs text-muted-foreground">
          프로젝트 관리 플랫폼
        </span>
      </div>
    </div>
  );
};
