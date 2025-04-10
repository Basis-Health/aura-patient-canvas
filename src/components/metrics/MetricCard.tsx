
import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon?: React.ReactNode;
  timestamp?: string;
  className?: string;
  color?: "default" | "primary" | "success" | "warning" | "danger"; 
}

const MetricCard = ({ 
  label, 
  value, 
  unit, 
  icon, 
  timestamp = "Today", 
  className,
  color = "default" 
}: MetricCardProps) => {
  const valueColorClasses = {
    default: "text-gray-900",
    primary: "text-primary",
    success: "text-emerald-500",
    warning: "text-amber-500",
    danger: "text-red-500",
  };

  return (
    <div className={cn("metric-card", className)}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-gray-500">{timestamp}</span>
        {icon}
      </div>
      <div className="space-y-1">
        <h4 className="text-sm font-medium text-gray-500">{label}</h4>
        <div className="flex items-baseline">
          <span className={cn("text-2xl font-bold", valueColorClasses[color])}>
            {value}
          </span>
          {unit && (
            <span className="ml-1 text-sm text-gray-500">
              {unit}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
