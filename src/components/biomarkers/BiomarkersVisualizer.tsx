
import React from 'react';
import { cn } from "@/lib/utils";

interface BiomarkersVisualizerProps {
  total: number;
  outOfRange: number;
  inRange: number;
}

const BiomarkersVisualizer = ({
  total,
  outOfRange,
  inRange,
}: BiomarkersVisualizerProps) => {
  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <div className="text-sm font-medium text-gray-400 mb-1">
        Biomarkers
      </div>
      <div className="text-2xl font-bold text-white">
        {total} biomarkers tested
      </div>
      
      <div className="mt-4 h-6 bg-gray-800 rounded-full overflow-hidden flex">
        <div style={{ flex: `0 0 ${(outOfRange / total) * 100}%` }} className="bg-gradient-to-r from-pink-500 to-purple-500 h-full" />
        <div style={{ flex: `0 0 ${(inRange / total) * 100}%` }} className="bg-gradient-to-r from-green-500 to-emerald-500 h-full" />
      </div>
      
      <div className="mt-4 text-center">
        <div className="inline-flex rounded-full overflow-hidden">
          <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-full bg-pink-500"></span>
            <span className="text-white font-medium">{outOfRange} out of range</span>
          </div>
          <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-full bg-green-500"></span>
            <span className="text-white font-medium">{inRange} in range</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiomarkersVisualizer;
