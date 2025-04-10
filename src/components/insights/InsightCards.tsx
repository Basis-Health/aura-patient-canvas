
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, TrendingUp, TrendingDown, X, Check } from 'lucide-react';
import LineChart from '../charts/LineChart';

interface Insight {
  id: string;
  title: string;
  description: string;
  trend: 'up' | 'down' | 'neutral';
  percentage?: number;
  timeframe: string;
  chartData?: Array<{ date: string; value: number }>;
  type: 'metric' | 'biomarker' | 'adherence';
}

interface InsightCardsProps {
  insights: Insight[];
}

const InsightCards = ({ insights }: InsightCardsProps) => {
  const [currentInsight, setCurrentInsight] = useState(0);
  const [dismissedInsights, setDismissedInsights] = useState<string[]>([]);
  
  const activeInsights = insights.filter(insight => !dismissedInsights.includes(insight.id));
  
  if (activeInsights.length === 0) {
    return (
      <Card className="bg-gray-50 border border-gray-200">
        <CardContent className="p-6 text-center">
          <p className="text-gray-500">No insights available</p>
          <Button 
            variant="outline" 
            className="mt-3"
            onClick={() => setDismissedInsights([])}
          >
            Reset All Insights
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  const handlePrevious = () => {
    setCurrentInsight(prev => 
      prev > 0 ? prev - 1 : activeInsights.length - 1
    );
  };
  
  const handleNext = () => {
    setCurrentInsight(prev => 
      (prev + 1) % activeInsights.length
    );
  };
  
  const dismissInsight = (id: string) => {
    setDismissedInsights(prev => [...prev, id]);
    if (currentInsight >= activeInsights.length - 1) {
      setCurrentInsight(0);
    }
  };
  
  const insight = activeInsights[currentInsight];
  
  return (
    <Card className="border border-gray-200">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-1">
            <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
              INSIGHT
            </span>
            <span className="text-xs text-gray-500">
              {currentInsight + 1}/{activeInsights.length}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 text-gray-500 hover:text-gray-700"
              onClick={() => dismissInsight(insight.id)}
            >
              <X className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 text-gray-500 hover:text-gray-700"
              onClick={handlePrevious}
              disabled={activeInsights.length <= 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 text-gray-500 hover:text-gray-700"
              onClick={handleNext}
              disabled={activeInsights.length <= 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-3 mb-3">
          <div className={`p-2 rounded-full ${
            insight.trend === 'up' 
              ? 'bg-emerald-100 text-emerald-600' 
              : insight.trend === 'down' 
                ? 'bg-red-100 text-red-600' 
                : 'bg-blue-100 text-blue-600'
          }`}>
            {insight.trend === 'up' ? (
              <TrendingUp className="h-5 w-5" />
            ) : insight.trend === 'down' ? (
              <TrendingDown className="h-5 w-5" />
            ) : (
              <Check className="h-5 w-5" />
            )}
          </div>
          <div>
            <h3 className="font-medium">{insight.title}</h3>
            <p className="text-sm text-gray-600">{insight.description}</p>
          </div>
        </div>
        
        {insight.chartData && (
          <div className="mt-3 h-32">
            <LineChart 
              data={insight.chartData} 
              height={130}
              color={insight.trend === 'up' ? '#10B981' : insight.trend === 'down' ? '#EF4444' : '#3B82F6'}
            />
          </div>
        )}
        
        <div className="mt-2 text-xs text-gray-500 text-right">
          {insight.timeframe}
        </div>
      </CardContent>
    </Card>
  );
};

export default InsightCards;
