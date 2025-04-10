
import React from 'react';
import MetricsOverview from '@/components/metrics/MetricsOverview';
import BiomarkersVisualizer from '@/components/biomarkers/BiomarkersVisualizer';
import InsightCards from '@/components/insights/InsightCards';
import ActivityFeed from '@/components/activity/ActivityFeed';

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
  return (
    <div className="space-y-6">
      <MetricsOverview metrics={metrics} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Activity Feed up in left column */}
        <div className="space-y-6">
          <ActivityFeed 
            activities={activityItems}
            showSeeMore={true}
          />
          
          {/* Insights moved below Activity Feed */}
          <InsightCards insights={insights} />
        </div>
        
        <div className="md:col-span-2">
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
