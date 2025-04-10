
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BiomarkerSummary from '@/components/biomarkers/BiomarkerSummary';
import LabResultItem from '@/components/labs/LabResultItem';

const LabsTab: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("");
  
  // Mock lab results
  const labResults = [
    { id: '1', name: 'Vitamin D', value: '20 ng/mL', status: 'Out of Range' as const },
    { id: '2', name: 'Cholesterol (Total)', value: '240 mg/dL', status: 'Out of Range' as const },
    { id: '3', name: 'Triglycerides', value: '200 mg/dL', status: 'Out of Range' as const },
    { id: '4', name: 'Glucose (Fasting)', value: '110 mg/dL', status: 'Out of Range' as const },
    { id: '5', name: 'HDL Cholesterol', value: '55 mg/dL', status: 'Optimal' as const },
    { id: '6', name: 'Iron', value: '80 μg/dL', status: 'In Range' as const },
    { id: '7', name: 'Magnesium', value: '2.1 mg/dL', status: 'In Range' as const },
    { id: '8', name: 'TSH', value: '2.5 mIU/L', status: 'Optimal' as const },
    { id: '9', name: 'Free T3', value: '3.1 pg/mL', status: 'In Range' as const },
    { id: '10', name: 'Free T4', value: '1.2 ng/dL', status: 'Optimal' as const },
  ];
  
  // Calculate biomarker statistics
  const biomarkerStats = {
    optimal: labResults.filter(lab => lab.status === 'Optimal').length,
    inRange: labResults.filter(lab => lab.status === 'In Range').length,
    outOfRange: labResults.filter(lab => lab.status === 'Out of Range').length,
  };
  
  // Filter lab results based on active filter
  const filteredResults = activeFilter
    ? labResults.filter(lab => lab.status.toLowerCase().replace(' ', '') === activeFilter.toLowerCase())
    : labResults;
  
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter === activeFilter ? "" : filter);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Lab Results</CardTitle>
        </CardHeader>
        <CardContent>
          <BiomarkerSummary 
            optimal={biomarkerStats.optimal} 
            inRange={biomarkerStats.inRange} 
            outOfRange={biomarkerStats.outOfRange}
            onFilterChange={handleFilterChange}
            activeFilter={activeFilter}
          />
          
          <div className="space-y-4">
            {filteredResults.map(result => (
              <LabResultItem 
                key={result.id}
                name={result.name}
                value={result.value}
                status={result.status}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LabsTab;
