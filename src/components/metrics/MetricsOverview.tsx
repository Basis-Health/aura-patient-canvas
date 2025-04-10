
import React from "react";
import MetricCard from "./MetricCard";
import { Activity, Weight, Heart } from "lucide-react";

interface MetricsOverviewProps {
  metrics: {
    steps: number;
    weight: number;
    heartRate: number;
  };
}

const MetricsOverview = ({ metrics }: MetricsOverviewProps) => {
  const { steps, weight, heartRate } = metrics;

  return (
    <div className="grid grid-cols-3 gap-4">
      <MetricCard
        label="Steps"
        value={steps.toLocaleString()}
        icon={<Activity className="h-5 w-5 text-gray-400" />}
      />
      <MetricCard
        label="Weight"
        value={weight}
        unit="lb"
        color="primary"
        icon={<Weight className="h-5 w-5 text-gray-400" />}
        timestamp="Yesterday"
      />
      <MetricCard
        label="Resting Heart Rate"
        value={heartRate}
        color="primary"
        icon={<Heart className="h-5 w-5 text-gray-400" />}
        timestamp="Yesterday"
      />
    </div>
  );
};

export default MetricsOverview;
