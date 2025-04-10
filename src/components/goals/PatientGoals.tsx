
import React from 'react';
import { User } from 'lucide-react';
import { cn } from "@/lib/utils";

interface PatientGoalsProps {
  doctor: {
    name: string;
    title: string;
    avatarUrl?: string;
  };
  date: string;
  goals: string;
}

const PatientGoals = ({
  doctor,
  date,
  goals,
}: PatientGoalsProps) => {
  return (
    <div className="p-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
          {doctor.avatarUrl ? (
            <img 
              src={doctor.avatarUrl} 
              alt={doctor.name} 
              className="h-full w-full object-cover"
            />
          ) : (
            <User className="h-6 w-6 text-gray-400" />
          )}
        </div>
        
        <div>
          <div className="text-sm font-medium">{doctor.name}</div>
          <div className="text-xs text-gray-500">{doctor.title}</div>
        </div>
      </div>
      
      <div className="text-sm text-gray-500 mb-2">
        {date}
      </div>
      
      <h3 className="text-xl font-bold mb-3">
        Health goals selected by<br />
        Dr. {doctor.name.split(' ')[0]} for you
      </h3>
      
      <p className="text-gray-700">
        {goals}
      </p>
      
      <div className="mt-6 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <div className="text-xs uppercase text-gray-500 font-medium">NMN</div>
        <div className="text-sm text-gray-700">250mg weekly</div>
      </div>
    </div>
  );
};

export default PatientGoals;
