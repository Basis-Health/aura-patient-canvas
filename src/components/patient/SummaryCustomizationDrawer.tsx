
import React, { useState } from 'react';
import { 
  Check, LineChart, Heart, Moon, Activity, 
  FileText, Beaker, ListChecks, CalendarDays 
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface CustomizationOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  defaultEnabled: boolean;
}

const SummaryCustomizationDrawer = () => {
  const options: CustomizationOption[] = [
    {
      id: 'metrics',
      label: 'Metrics Overview',
      icon: <LineChart className="h-4 w-4" />,
      defaultEnabled: true
    },
    {
      id: 'protocol',
      label: 'Protocol',
      icon: <ListChecks className="h-4 w-4" />,
      defaultEnabled: true
    },
    {
      id: 'activity',
      label: 'Activity Feed',
      icon: <Activity className="h-4 w-4" />,
      defaultEnabled: true
    },
    {
      id: 'insights',
      label: 'Insights',
      icon: <Heart className="h-4 w-4" />,
      defaultEnabled: true
    },
    {
      id: 'labResults',
      label: 'Lab Results',
      icon: <Beaker className="h-4 w-4" />,
      defaultEnabled: false
    },
    {
      id: 'documents',
      label: 'Documents',
      icon: <FileText className="h-4 w-4" />,
      defaultEnabled: false
    },
    {
      id: 'schedule',
      label: 'Schedule',
      icon: <CalendarDays className="h-4 w-4" />,
      defaultEnabled: false
    }
  ];

  const [selectedOptions, setSelectedOptions] = useState(
    options.filter(option => option.defaultEnabled).map(option => option.id)
  );
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (optionId: string) => {
    setSelectedOptions(prev => 
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-4">Customize Summary View</h3>
      <p className="text-sm text-gray-500 mb-6">
        Select which modules to display on the patient summary page.
      </p>

      <div className="space-y-4">
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border rounded-md">
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left">
            <span className="font-medium">Display Modules</span>
            <div className="bg-gray-100 text-xs font-medium rounded-full px-2 py-0.5">
              {selectedOptions.length} selected
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 pt-0 border-t">
            <div className="space-y-2">
              {options.map((option) => (
                <div 
                  key={option.id} 
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer"
                  onClick={() => toggleOption(option.id)}
                >
                  <div className={`w-5 h-5 flex items-center justify-center rounded-md border ${
                    selectedOptions.includes(option.id) 
                      ? 'bg-primary border-primary text-white' 
                      : 'border-gray-300'
                  }`}>
                    {selectedOptions.includes(option.id) && <Check className="h-3 w-3" />}
                  </div>
                  <div className="flex items-center gap-2">
                    {option.icon}
                    <span>{option.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      <div className="mt-8">
        <button className="w-full bg-primary text-white rounded-md py-2 font-medium hover:bg-primary/90 transition-colors">
          Apply Changes
        </button>
      </div>
    </div>
  );
};

export default SummaryCustomizationDrawer;
