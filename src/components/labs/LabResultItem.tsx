
import React from "react";
import { cn } from "@/lib/utils";

interface LabResultItemProps {
  name: string;
  value: string | number;
  status: "Optimal" | "In Range" | "Out of Range";
}

const LabResultItem = ({ name, value, status }: LabResultItemProps) => {
  const statusClasses = {
    "Optimal": "status-optimal",
    "In Range": "status-in-range",
    "Out of Range": "status-out-of-range",
  };

  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-100">
      <div className="font-medium">{name}</div>
      <div className="flex items-center space-x-4">
        <div className="text-right font-mono">{value}</div>
        <div className={cn("status-badge", statusClasses[status])}>
          {status}
        </div>
      </div>
    </div>
  );
};

export default LabResultItem;
