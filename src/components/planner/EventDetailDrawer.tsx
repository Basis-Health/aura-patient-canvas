
import React from 'react';
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
import { Moon, Activity, Clock } from 'lucide-react';

interface EventDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  event: {
    id: string;
    title: string;
    start: string;
    end: string;
    type: string;
    details?: any;
  } | null;
}

const EventDetailDrawer: React.FC<EventDetailDrawerProps> = ({ 
  isOpen, 
  onClose, 
  event 
}) => {
  if (!event) return null;
  
  // Mock data based on event type
  const getSleepData = () => {
    return [
      { date: '10:00 PM', value: 0 },
      { date: '11:00 PM', value: 1 }, // falling asleep
      { date: '12:00 AM', value: 3 }, // deep sleep
      { date: '1:00 AM', value: 2 }, // light sleep
      { date: '2:00 AM', value: 3 }, // deep sleep
      { date: '3:00 AM', value: 2 }, // light sleep
      { date: '4:00 AM', value: 1 }, // REM
      { date: '5:00 AM', value: 2 }, // light sleep
      { date: '6:00 AM', value: 1 }, // REM
      { date: '7:00 AM', value: 0 }, // awake
    ];
  };

  const getWorkoutData = () => {
    return [
      { date: '0:00', value: 65 },
      { date: '5:00', value: 110 },
      { date: '10:00', value: 145 },
      { date: '15:00', value: 160 },
      { date: '20:00', value: 175 }, 
      { date: '25:00', value: 140 },
      { date: '30:00', value: 120 },
    ];
  };

  // Event-specific details
  const renderEventDetails = () => {
    if (event.type === 'Sleep') {
      const duration = calculateDuration(event.start, event.end);
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <Card>
              <CardContent className="p-4 flex flex-col items-center">
                <Clock className="h-5 w-5 text-blue-500 mb-1" />
                <div className="text-2xl font-bold">{duration}</div>
                <div className="text-xs text-gray-500">Duration</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex flex-col items-center">
                <Moon className="h-5 w-5 text-indigo-500 mb-1" />
                <div className="text-2xl font-bold">21%</div>
                <div className="text-xs text-gray-500">Deep Sleep</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex flex-col items-center">
                <Activity className="h-5 w-5 text-amber-500 mb-1" />
                <div className="text-2xl font-bold">83%</div>
                <div className="text-xs text-gray-500">Efficiency</div>
              </CardContent>
            </Card>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">Sleep Stages</h3>
            <LineChart 
              data={getSleepData()} 
              height={200} 
              color="#6366F1"
            />
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <div>Awake</div>
              <div>REM</div>
              <div>Light</div>
              <div>Deep</div>
            </div>
          </div>
        </div>
      );
    } else if (event.type === 'HIIT') {
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <Card>
              <CardContent className="p-4 flex flex-col items-center">
                <Clock className="h-5 w-5 text-blue-500 mb-1" />
                <div className="text-2xl font-bold">30:00</div>
                <div className="text-xs text-gray-500">Duration</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex flex-col items-center">
                <Activity className="h-5 w-5 text-red-500 mb-1" />
                <div className="text-2xl font-bold">175</div>
                <div className="text-xs text-gray-500">Max HR</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex flex-col items-center">
                <Activity className="h-5 w-5 text-orange-500 mb-1" />
                <div className="text-2xl font-bold">142</div>
                <div className="text-xs text-gray-500">Avg HR</div>
              </CardContent>
            </Card>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">Heart Rate Zones</h3>
            <LineChart 
              data={getWorkoutData()} 
              height={200} 
              color="#EF4444"
            />
            <div className="mt-4">
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 rounded-full bg-gray-300 mr-2"></div>
                <div className="text-xs">Zone 1 (65-110 bpm): <span className="font-medium">5 minutes</span></div>
              </div>
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 rounded-full bg-blue-300 mr-2"></div>
                <div className="text-xs">Zone 2 (111-145 bpm): <span className="font-medium">10 minutes</span></div>
              </div>
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 rounded-full bg-orange-300 mr-2"></div>
                <div className="text-xs">Zone 3 (146-165 bpm): <span className="font-medium">7 minutes</span></div>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-300 mr-2"></div>
                <div className="text-xs">Zone 4 (166-180 bpm): <span className="font-medium">8 minutes</span></div>
              </div>
            </div>
          </div>
        </div>
      );
    } 
    
    return (
      <div className="py-4 text-gray-500">
        No detailed information available for this event.
      </div>
    );
  };

  function calculateDuration(start: string, end: string): string {
    const startTime = new Date(`2023-01-01 ${start}`);
    const endTime = new Date(`2023-01-01 ${end}`);
    
    // If end time is earlier than start, it means it's the next day
    if (endTime < startTime) {
      endTime.setDate(endTime.getDate() + 1);
    }
    
    const diffMs = endTime.getTime() - startTime.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${diffHrs}h ${diffMins}m`;
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{event.title}</SheetTitle>
          <SheetDescription>
            {event.start} - {event.end}
          </SheetDescription>
        </SheetHeader>
        <div className="py-6">
          {renderEventDetails()}
        </div>
        <SheetFooter>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default EventDetailDrawer;
