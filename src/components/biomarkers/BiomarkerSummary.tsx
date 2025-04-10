
import React from 'react';
import { cn } from "@/lib/utils";
import { Badge } from '@/components/ui/badge';

interface BiomarkerSummaryProps {
  optimal: number;
  inRange: number;
  outOfRange: number;
  onFilterChange?: (filter: string) => void;
  activeFilter?: string;
}

const BiomarkerSummary = ({ 
  optimal, 
  inRange, 
  outOfRange,
  onFilterChange,
  activeFilter = "",
}: BiomarkerSummaryProps) => {
  return (
    <div className="mb-6">
      <div className="grid grid-cols-3 gap-4">
        <div 
          className={cn(
            "bg-white rounded-lg p-4 border flex flex-col items-center cursor-pointer transition-all",
            activeFilter === "optimal" 
              ? "border-emerald-500 shadow-sm"
              : "border-gray-200 hover:border-emerald-200"
          )}
          onClick={() => onFilterChange?.("optimal")}
        >
          <div className="text-3xl font-bold text-emerald-500">{optimal}</div>
          <div className="text-sm text-gray-500 mt-1">Optimal</div>
        </div>
        
        <div 
          className={cn(
            "bg-white rounded-lg p-4 border flex flex-col items-center cursor-pointer transition-all",
            activeFilter === "inRange" 
              ? "border-blue-500 shadow-sm"
              : "border-gray-200 hover:border-blue-200"
          )}
          onClick={() => onFilterChange?.("inRange")}
        >
          <div className="text-3xl font-bold text-blue-500">{inRange}</div>
          <div className="text-sm text-gray-500 mt-1">In Range</div>
        </div>
        
        <div 
          className={cn(
            "bg-white rounded-lg p-4 border flex flex-col items-center cursor-pointer transition-all",
            activeFilter === "outOfRange" 
              ? "border-orange-500 shadow-sm"
              : "border-gray-200 hover:border-orange-200"
          )}
          onClick={() => onFilterChange?.("outOfRange")}
        >
          <div className="text-3xl font-bold text-orange-500">{outOfRange}</div>
          <div className="text-sm text-gray-500 mt-1">Out of Range</div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mt-4">
        <Badge variant="outline" className="bg-gray-50 hover:bg-gray-100 cursor-pointer">
          Cardiovascular
        </Badge>
        <Badge variant="outline" className="bg-gray-50 hover:bg-gray-100 cursor-pointer">
          Metabolic
        </Badge>
        <Badge variant="outline" className="bg-gray-50 hover:bg-gray-100 cursor-pointer">
          Thyroid
        </Badge>
        <Badge variant="outline" className="bg-gray-50 hover:bg-gray-100 cursor-pointer">
          Immune Regulation
        </Badge>
        <Badge variant="outline" className="bg-gray-50 hover:bg-gray-100 cursor-pointer">
          Liver
        </Badge>
        <Badge variant="outline" className="bg-gray-50 hover:bg-gray-100 cursor-pointer">
          Kidneys
        </Badge>
      </div>
    </div>
  );
};

export default BiomarkerSummary;
