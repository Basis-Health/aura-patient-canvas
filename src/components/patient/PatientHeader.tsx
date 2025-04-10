
import React from "react";
import { X, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import SummaryCustomizationDrawer from "./SummaryCustomizationDrawer";

interface PatientHeaderProps {
  patient: {
    name: string;
    email: string;
    location?: string;
    birthdate?: string;
    avatarUrl?: string;
  };
  onClose?: () => void;
  activeTab?: string;
}

const PatientHeader = ({ patient, onClose, activeTab }: PatientHeaderProps) => {
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
        {activeTab === "Summary" && (
          <Drawer>
            <DrawerTrigger asChild>
              <button className="p-2 rounded-md hover:bg-gray-100 transition-colors flex items-center gap-2 text-sm font-medium text-gray-600">
                <SlidersHorizontal className="h-4 w-4" />
                Customize View
              </button>
            </DrawerTrigger>
            <DrawerContent>
              <SummaryCustomizationDrawer />
            </DrawerContent>
          </Drawer>
        )}
      </div>
    </div>
  );
};

export default PatientHeader;
