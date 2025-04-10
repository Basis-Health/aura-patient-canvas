
import React from "react";
import { cn } from "@/lib/utils";

interface PatientTabsProps {
  tabs: string[];
  activeTab: string;
  onChange: (tab: string) => void;
}

const PatientTabs = ({ tabs, activeTab, onChange }: PatientTabsProps) => {
  return (
    <div className="flex border-b border-gray-200 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={cn(
            "px-6 py-3 text-sm font-medium",
            activeTab === tab
              ? "border-b-2 border-primary text-primary"
              : "text-gray-500 hover:text-gray-700"
          )}
          onClick={() => onChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default PatientTabs;
