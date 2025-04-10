
import React from 'react';
import { 
  FileText, AlertCircle, MessageSquare, ClipboardList, 
  CalendarClock, ArrowRight, ExternalLink, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from '@/components/ui/badge';
import LabResultItem from '../labs/LabResultItem';

export interface ActivityItem {
  id: string;
  type: 'document' | 'biomarker' | 'note' | 'appointment' | 'protocol' | 'lab_result' | 'protocol_change' | 'message';
  title: string;
  description: string;
  date: string;
  status?: string;
  link?: string;
  icon?: string;
  details?: any;
}

interface ActivityFeedProps {
  activities: ActivityItem[];
  showSeeMore?: boolean;
  onSeeMore?: () => void;
}

const ActivityFeed = ({ activities, showSeeMore = false, onSeeMore }: ActivityFeedProps) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText className="h-4 w-4 text-blue-500" />;
      case 'biomarker':
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case 'note':
        return <MessageSquare className="h-4 w-4 text-purple-500" />;
      case 'appointment':
        return <CalendarClock className="h-4 w-4 text-emerald-500" />;
      case 'protocol':
        return <ClipboardList className="h-4 w-4 text-gray-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const renderSheetContent = (activity: ActivityItem) => {
    if (activity.type === 'biomarker' && activity.details?.biomarkers) {
      return (
        <>
          <SheetHeader>
            <SheetTitle>{activity.title}</SheetTitle>
            <SheetDescription>{activity.description}</SheetDescription>
          </SheetHeader>
          <div className="py-6 space-y-2">
            {activity.details.biomarkers.map((biomarker: any) => (
              <LabResultItem 
                key={biomarker.id}
                name={biomarker.name}
                value={biomarker.value}
                status={biomarker.status}
              />
            ))}
          </div>
        </>
      );
    }
    
    return (
      <>
        <SheetHeader>
          <SheetTitle>{activity.title}</SheetTitle>
          <SheetDescription>{activity.description}</SheetDescription>
        </SheetHeader>
        <div className="py-6">
          <p>Additional details not available</p>
        </div>
      </>
    );
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activities.map((activity) => (
            <div 
              key={activity.id} 
              className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0"
            >
              <div className="mt-0.5 p-2 rounded-full bg-gray-100">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-medium text-sm">{activity.title}</h4>
                  <span className="text-xs text-gray-500">{activity.date}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                
                {activity.status && (
                  <Badge 
                    variant="outline" 
                    className={`mt-2 ${
                      activity.status === 'critical' ? 'text-red-600 border-red-200 bg-red-50' : 
                      activity.status === 'warning' ? 'text-amber-600 border-amber-200 bg-amber-50' : 
                      'text-blue-600 border-blue-200 bg-blue-50'
                    }`}
                  >
                    {activity.status}
                  </Badge>
                )}
                
                <div className="mt-2">
                  {activity.link && (
                    <Button variant="ghost" size="sm" className="p-0 h-auto text-xs text-blue-600 hover:text-blue-800">
                      View details <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                  )}
                  
                  {activity.type === 'biomarker' && activity.details?.biomarkers && (
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="ghost" size="sm" className="p-0 h-auto text-xs text-blue-600 hover:text-blue-800">
                          View biomarkers <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="right" className="w-full sm:max-w-md">
                        {renderSheetContent(activity)}
                        <SheetFooter>
                          <Button variant="outline">Close</Button>
                        </SheetFooter>
                      </SheetContent>
                    </Sheet>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {showSeeMore && onSeeMore && (
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-2 text-blue-600 border-blue-200 hover:bg-blue-50"
              onClick={onSeeMore}
            >
              See more activities <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;
