
import React from 'react';
import MetricsOverview from '@/components/metrics/MetricsOverview';
import BiomarkersVisualizer from '@/components/biomarkers/BiomarkersVisualizer';
import InsightCards from '@/components/insights/InsightCards';
import ActivityFeed from '@/components/activity/ActivityFeed';
import BiomarkerQuickFilters from '@/components/biomarkers/BiomarkerQuickFilters';

interface SummaryTabProps {
  metrics: {
    steps: number;
    weight: number;
    heartRate: number;
  };
  biomarkerStats: {
    total: number;
    outOfRange: number;
    inRange: number;
  };
  activityItems: any[];
  insights: any[];
}

const SummaryTab: React.FC<SummaryTabProps> = ({ 
  metrics, 
  biomarkerStats, 
  activityItems, 
  insights 
}) => {
  // Mock lab results for the biomarker quick filters
  const labResults = [
    { id: '1', name: 'Vitamin D', value: '20 ng/mL', status: 'Out of Range' as const },
    { id: '2', name: 'Cholesterol (Total)', value: '240 mg/dL', status: 'Out of Range' as const },
    { id: '3', name: 'Triglycerides', value: '200 mg/dL', status: 'Out of Range' as const },
    { id: '4', name: 'Glucose (Fasting)', value: '110 mg/dL', status: 'Out of Range' as const }
  ];

  return (
    <div className="space-y-6">
      <MetricsOverview metrics={metrics} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column with Activity Feed and Insights */}
        <div className="space-y-6">
          <ActivityFeed 
            activities={activityItems}
            showSeeMore={true}
          />
          
          <InsightCards insights={insights} />
        </div>
        
        {/* Right column with Biomarkers visualization and quick filters */}
        <div className="md:col-span-2 space-y-6">
          {/* Add the BiomarkerQuickFilters here */}
          <BiomarkerQuickFilters 
            outOfRange={biomarkerStats.outOfRange}
            inRange={biomarkerStats.inRange}
            optimal={biomarkerStats.total - biomarkerStats.outOfRange - biomarkerStats.inRange}
            labResults={labResults}
          />
          
          <BiomarkersVisualizer 
            total={biomarkerStats.total}
            outOfRange={biomarkerStats.outOfRange}
            inRange={biomarkerStats.inRange}
          />
        </div>
      </div>
    </div>
  );
};

export default SummaryTab;
