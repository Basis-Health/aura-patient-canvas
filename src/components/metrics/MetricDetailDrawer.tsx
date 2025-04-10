
import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import LineChart from '../charts/LineChart';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  Info,
  MessageSquare
} from 'lucide-react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';

interface MetricInsight {
  id: string;
  date: string;
  insight: string;
  changePercentage?: number;
  trend: 'up' | 'down' | 'neutral';
}

interface MetricDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  metric: {
    name: string;
    value: string | number;
    unit?: string;
    type?: string;
  } | null;
}

const MetricDetailDrawer: React.FC<MetricDetailDrawerProps> = ({ 
  isOpen, 
  onClose, 
  metric 
}) => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  
  if (!metric) return null;

  // Generate mock data based on time range
  const getMockChartData = () => {
    switch (timeRange) {
      case 'week':
        return [
          { date: 'Mon', value: 44 },
          { date: 'Tue', value: 43 },
          { date: 'Wed', value: 45 },
          { date: 'Thu', value: 44 },
          { date: 'Fri', value: 46 },
          { date: 'Sat', value: 47 },
          { date: 'Sun', value: 45 },
        ];
      case 'month':
        return [
          { date: 'Week 1', value: 44 },
          { date: 'Week 2', value: 43 },
          { date: 'Week 3', value: 45 },
          { date: 'Week 4', value: 47 },
        ];
      case 'quarter':
        return [
          { date: 'Jan', value: 43 },
          { date: 'Feb', value: 44 },
          { date: 'Mar', value: 45 },
        ];
      case 'year':
        return [
          { date: 'Q1', value: 44 },
          { date: 'Q2', value: 47 },
          { date: 'Q3', value: 42 },
          { date: 'Q4', value: 45 },
        ];
      default:
        return [
          { date: 'Jan', value: 43 },
          { date: 'Feb', value: 44 },
          { date: 'Mar', value: 45 },
          { date: 'Apr', value: 47 },
        ];
    }
  };

  // Mock insights
  const mockInsights: MetricInsight[] = [
    {
      id: '1',
      date: 'Apr 8, 2025',
      insight: 'Significant improvement of 12% in VO2 Max following the increased Zone 2 cardio training in the last 3 weeks.',
      changePercentage: 12,
      trend: 'up',
    },
    {
      id: '2',
      date: 'Mar 15, 2025',
      insight: 'VO2 Max has stabilized after 2 weeks of increased workout frequency. Consider increasing intensity for further improvements.',
      trend: 'neutral',
    },
    {
      id: '3',
      date: 'Feb 22, 2025',
      insight: 'Decreased VO2 Max value likely related to 10-day break from aerobic exercise during client travel.',
      changePercentage: 8,
      trend: 'down',
    },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="right" className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{metric.name}</SheetTitle>
          <SheetDescription>
            Current value: {metric.value} {metric.unit || ''}
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium">Trend Analysis</h3>
            <div className="flex border rounded-md overflow-hidden">
              <Button 
                variant={timeRange === 'week' ? 'default' : 'ghost'} 
                size="sm" 
                className="text-xs h-8"
                onClick={() => setTimeRange('week')}
              >
                Week
              </Button>
              <Button 
                variant={timeRange === 'month' ? 'default' : 'ghost'} 
                size="sm" 
                className="text-xs h-8"
                onClick={() => setTimeRange('month')}
              >
                Month
              </Button>
              <Button 
                variant={timeRange === 'quarter' ? 'default' : 'ghost'} 
                size="sm" 
                className="text-xs h-8"
                onClick={() => setTimeRange('quarter')}
              >
                Quarter
              </Button>
              <Button 
                variant={timeRange === 'year' ? 'default' : 'ghost'} 
                size="sm" 
                className="text-xs h-8"
                onClick={() => setTimeRange('year')}
              >
                Year
              </Button>
            </div>
          </div>
          
          <div className="h-48 mb-6">
            <LineChart 
              data={getMockChartData()} 
              height={200} 
              color="#3B82F6"
            />
          </div>
          
          <Tabs defaultValue="insights">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="insights">Insights</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>
            
            <TabsContent value="insights" className="space-y-4 mt-4">
              <h3 className="text-sm font-medium flex items-center">
                <MessageSquare className="h-4 w-4 mr-2 text-blue-500" />
                AI Insights
              </h3>
              
              {mockInsights.map((insight) => (
                <Card key={insight.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full mt-1 ${
                        insight.trend === 'up' 
                          ? 'bg-emerald-100 text-emerald-600' 
                          : insight.trend === 'down' 
                            ? 'bg-red-100 text-red-600' 
                            : 'bg-blue-100 text-blue-600'
                      }`}>
                        {insight.trend === 'up' ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : insight.trend === 'down' ? (
                          <TrendingDown className="h-4 w-4" />
                        ) : (
                          <Calendar className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm">{insight.insight}</p>
                        <div className="flex justify-between mt-2">
                          <span className="text-xs text-gray-500">{insight.date}</span>
                          {insight.changePercentage && (
                            <span className={`text-xs font-medium ${
                              insight.trend === 'up' 
                                ? 'text-emerald-600' 
                                : insight.trend === 'down' 
                                  ? 'text-red-600' 
                                  : 'text-blue-600'
                            }`}>
                              {insight.trend === 'up' ? '+' : ''}{insight.changePercentage}%
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="about" className="space-y-4 mt-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                      <Info className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm mb-1">About {metric.name}</h3>
                      <p className="text-sm text-gray-600">
                        VO2 max measures the maximum amount of oxygen your body can utilize during intense exercise. It's an excellent indicator of cardiovascular fitness and endurance capacity. Higher values generally indicate better aerobic fitness and are associated with reduced risk of cardiovascular disease.
                      </p>
                      <div className="mt-3 text-xs text-gray-500">
                        <h4 className="font-medium mb-1">Reference ranges:</h4>
                        <ul className="space-y-1">
                          <li>• Excellent: &gt;50 ml/kg/min</li>
                          <li>• Good: 40-50 ml/kg/min</li>
                          <li>• Average: 35-40 ml/kg/min</li>
                          <li>• Below Average: &lt;35 ml/kg/min</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <SheetFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>Close</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MetricDetailDrawer;
