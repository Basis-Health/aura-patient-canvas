
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, AlertCircle } from 'lucide-react';
import { 
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import LabResultItem from '../labs/LabResultItem';

interface BiomarkerQuickFiltersProps {
  outOfRange: number;
  inRange: number;
  optimal: number;
  labResults: Array<{
    id: string;
    name: string;
    value: string;
    status: "Optimal" | "In Range" | "Out of Range";
  }>;
}

const BiomarkerQuickFilters = ({ outOfRange, inRange, optimal, labResults }: BiomarkerQuickFiltersProps) => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  
  const outOfRangeResults = labResults.filter(result => result.status === "Out of Range");
  
  return (
    <div className="mb-6 bg-white rounded-lg p-4 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Biomarker Status</h2>
        
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <AlertCircle className="h-4 w-4 text-orange-500" />
              <span>{outOfRange} Out of Range</span>
              <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-lg">
              <DrawerHeader>
                <DrawerTitle>Out of Range Biomarkers</DrawerTitle>
                <DrawerDescription>
                  {outOfRange} biomarkers are currently out of range for this client
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4 space-y-2">
                {outOfRangeResults.map(result => (
                  <LabResultItem 
                    key={result.id}
                    name={result.name}
                    value={result.value}
                    status={result.status}
                  />
                ))}
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        <div 
          onClick={() => setSelectedFilter(selectedFilter === 'optimal' ? null : 'optimal')}
          className={`flex flex-col items-center justify-center p-3 rounded-lg border cursor-pointer transition-all ${
            selectedFilter === 'optimal' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-emerald-200'
          }`}
        >
          <span className="text-2xl font-bold text-emerald-500">{optimal}</span>
          <span className="text-sm text-gray-600">Optimal</span>
        </div>
        
        <div 
          onClick={() => setSelectedFilter(selectedFilter === 'inRange' ? null : 'inRange')}
          className={`flex flex-col items-center justify-center p-3 rounded-lg border cursor-pointer transition-all ${
            selectedFilter === 'inRange' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-200'
          }`}
        >
          <span className="text-2xl font-bold text-blue-500">{inRange}</span>
          <span className="text-sm text-gray-600">In Range</span>
        </div>
        
        <div 
          onClick={() => setSelectedFilter(selectedFilter === 'outOfRange' ? null : 'outOfRange')}
          className={`flex flex-col items-center justify-center p-3 rounded-lg border cursor-pointer transition-all ${
            selectedFilter === 'outOfRange' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-200'
          }`}
        >
          <span className="text-2xl font-bold text-orange-500">{outOfRange}</span>
          <span className="text-sm text-gray-600">Out of Range</span>
        </div>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2">
        <Badge variant="outline" className="bg-gray-50 hover:bg-gray-100 cursor-pointer">Cardiovascular</Badge>
        <Badge variant="outline" className="bg-gray-50 hover:bg-gray-100 cursor-pointer">Metabolic</Badge>
        <Badge variant="outline" className="bg-gray-50 hover:bg-gray-100 cursor-pointer">Thyroid</Badge>
        <Badge variant="outline" className="bg-gray-50 hover:bg-gray-100 cursor-pointer">Inflammatory</Badge>
        <Badge variant="outline" className="bg-gray-50 hover:bg-gray-100 cursor-pointer">Hormonal</Badge>
      </div>
    </div>
  );
};

export default BiomarkerQuickFilters;
