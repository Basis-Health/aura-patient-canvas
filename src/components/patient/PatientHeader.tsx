
import React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PatientHeaderProps {
  patient: {
    name: string;
    email: string;
    location?: string;
    birthdate?: string;
    avatarUrl?: string;
  };
  onClose?: () => void;
}

const PatientHeader = ({ patient, onClose }: PatientHeaderProps) => {
  return (
    <div className="mb-6">
      <div className="flex items-center mb-4">
        <div className="flex-1">
          <div className="bg-gray-100 rounded-md px-3 py-1.5 inline-flex items-center text-sm text-gray-800">
            <span className="truncate max-w-[220px]">{patient.email}</span>
            <button 
              onClick={onClose} 
              className="ml-2 hover:bg-gray-200 rounded-full p-0.5"
            >
              <X className="h-3.5 w-3.5 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">{patient.name}</h2>
        </div>
      </div>
    </div>
  );
};

export default PatientHeader;
