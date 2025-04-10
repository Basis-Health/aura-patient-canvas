
import React from "react";
import { MapPin, Calendar, X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PatientHeaderProps {
  patient: {
    name: string;
    email: string;
    location: string;
    birthdate: string;
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
        <div className="flex items-center space-x-4">
          <div className="h-24 w-24 rounded-md overflow-hidden bg-gray-200">
            {patient.avatarUrl ? (
              <img 
                src={patient.avatarUrl} 
                alt={patient.name} 
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-2xl font-medium text-gray-400">
                {patient.name.charAt(0)}
              </div>
            )}
          </div>
          
          <div>
            <h2 className="text-2xl font-bold">{patient.name}</h2>
            <div className="flex items-center mt-1 text-sm text-gray-600">
              <MapPin className="h-3.5 w-3.5 mr-1" />
              <span>{patient.location}</span>
            </div>
            <div className="flex items-center mt-1 text-sm text-gray-600">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              <span>{patient.birthdate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientHeader;
