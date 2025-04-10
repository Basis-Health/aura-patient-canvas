
import React from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ActivityItem } from './ActivityFeed';
import { 
  FileText, 
  AlertCircle, 
  MessageSquare, 
  ClipboardList, 
  CalendarClock, 
  ArrowRight, 
  ExternalLink 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import LabResultItem from '../labs/LabResultItem';

interface ActivityDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activities: ActivityItem[];
}

const ActivityDetailDrawer = ({ isOpen, onClose, activities }: ActivityDetailDrawerProps) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'biomarker':
        return <AlertCircle className="h-5 w-5 text-orange-500" />;
      case 'note':
        return <MessageSquare className="h-5 w-5 text-purple-500" />;
      case 'appointment':
        return <CalendarClock className="h-5 w-5 text-emerald-500" />;
      case 'protocol':
        return <ClipboardList className="h-5 w-5 text-gray-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Activity History</SheetTitle>
          <SheetDescription>
            View all activity history for this patient
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-6 space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 pb-4 border-b border-gray-200 last:border-0"
            >
              <div className="mt-0.5 p-2 rounded-full bg-gray-100">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">{activity.title}</h4>
                  <span className="text-xs text-gray-500 whitespace-nowrap">{activity.date}</span>
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
                    <Button variant="ghost" size="sm" className="p-0 h-auto text-sm text-blue-600 hover:text-blue-800">
                      View details <ExternalLink className="h-4 w-4 ml-1" />
                    </Button>
                  )}
                  
                  {activity.type === 'biomarker' && activity.details?.biomarkers && (
                    <div className="mt-4 space-y-2">
                      <h5 className="text-sm font-medium">Biomarker Details</h5>
                      {activity.details.biomarkers.map((biomarker: any) => (
                        <LabResultItem 
                          key={biomarker.id}
                          name={biomarker.name}
                          value={biomarker.value}
                          status={biomarker.status}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ActivityDetailDrawer;
