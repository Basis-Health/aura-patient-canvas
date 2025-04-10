
import React from 'react';
import { cn } from "@/lib/utils";

interface BiologicalAgeCardProps {
  biologicalAge: number;
  chronologicalAge: number;
  difference: number;
}

const BiologicalAgeCard = ({
  biologicalAge,
  chronologicalAge,
  difference,
}: BiologicalAgeCardProps) => {
  const isYounger = biologicalAge < chronologicalAge;
  
  return (
    <div className="rounded-lg overflow-hidden">
      <div className="bg-gradient-to-br from-orange-400 to-amber-600 p-4">
        <div className="text-sm font-medium text-white/80 mb-1">
          Biological age
        </div>
        <div className="text-4xl font-bold text-white">
          {biologicalAge}
        </div>
        <div className="text-sm text-white/90 mt-1">
          {isYounger ? 
            `${difference} years younger than your chronological age` :
            `${difference} years older than your chronological age`
          }
        </div>
      </div>
    </div>
  );
};

export default BiologicalAgeCard;
