
import React from "react";
import MetricCard from "./MetricCard";
import { Activity, Moon, ThermometerSnowflake, Heart } from "lucide-react";
import BiologicalAgeCard from "../biomarkers/BiologicalAgeCard";

interface MetricsOverviewProps {
  metrics: {
    steps: number;
    weight: number;
    heartRate: number;
  };
}

const MetricsOverview = ({ metrics }: MetricsOverviewProps) => {
  // New scores to display instead of the old metrics
  const scores = {
    activity: 82,
    sleep: 76,
    readiness: 89,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <MetricCard
        label="Activity Score"
        value={scores.activity}
        unit="/100"
        icon={<Activity className="h-5 w-5 text-gray-400" />}
        color="success"
        timestamp="Last 30 days"
      />
      <MetricCard
        label="Sleep Score"
        value={scores.sleep}
        unit="/100"
        icon={<Moon className="h-5 w-5 text-gray-400" />}
        color="primary"
        timestamp="Last 30 days"
      />
      <MetricCard
        label="Readiness Score"
        value={scores.readiness}
        unit="/100"
        icon={<Heart className="h-5 w-5 text-gray-400" />}
        color="success"
        timestamp="Last 30 days"
      />
      <div className="relative h-full">
        <BiologicalAgeCard
          biologicalAge={28}
          chronologicalAge={30}
          difference={2}
        />
      </div>
    </div>
  );
};

export default MetricsOverview;
