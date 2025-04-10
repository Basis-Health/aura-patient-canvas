
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon } from 'lucide-react';
import { format, addDays, startOfWeek, endOfWeek, isToday } from 'date-fns';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface Event {
  id: string;
  title: string;
  start: string;  // Format: "HH:MM AM/PM"
  end: string;    // Format: "HH:MM AM/PM"
  type: string;
}

interface SchedulePlannerProps {
  currentDate: Date;
  events: Event[];
  onPrevious: () => void;
  onNext: () => void;
  onAddEvent: () => void;
  view: 'day' | 'week' | 'month';
  onViewChange: (view: 'day' | 'week' | 'month') => void;
  onEventClick?: (event: Event) => void;
}

const SchedulePlanner: React.FC<SchedulePlannerProps> = ({ 
  currentDate,
  events,
  onPrevious, 
  onNext,
  onAddEvent,
  view,
  onViewChange,
  onEventClick
}) => {
  const getEventTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'sleep':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'hiit':
      case 'workout':
      case 'exercise':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'meal':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'supplement':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'appointment':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const generateWeekDays = () => {
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 }); // Start week on Monday
    const days = [];
    
    for (let i = 0; i < 7; i++) {
      const day = addDays(weekStart, i);
      days.push(day);
    }
    
    return days;
  };
  
  const weekDays = generateWeekDays();
  const weekRange = `${format(weekDays[0], 'MMM d')} - ${format(weekDays[6], 'MMM d, yyyy')}`;
  
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i % 12 || 12;
    const amPm = i < 12 ? 'AM' : 'PM';
    return `${hour}:00 ${amPm}`;
  });
  
  // Simplified for demo purposes - would need actual time parsing in production
  const getEventPosition = (event: Event, dayIndex: number) => {
    const startHour = parseInt(event.start.split(':')[0]);
    const startAmPm = event.start.includes('AM') ? 'AM' : 'PM';
    const actualStartHour = startAmPm === 'PM' && startHour !== 12 ? startHour + 12 : startHour;
    
    return {
      top: `${actualStartHour * 60}px`,
      height: '60px' // Simplified fixed height
    };
  };

  const handleEventClick = (event: Event) => {
    if (onEventClick) {
      onEventClick(event);
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Schedule</CardTitle>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className={cn(view === 'day' && "bg-gray-100")}
              onClick={() => onViewChange('day')}
            >
              Day
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className={cn(view === 'week' && "bg-gray-100")}
              onClick={() => onViewChange('week')}
            >
              Week
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className={cn(view === 'month' && "bg-gray-100")}
              onClick={() => onViewChange('month')}
            >
              Month
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onPrevious}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="font-medium">{weekRange}</span>
            <Button variant="ghost" size="icon" onClick={onNext}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline" size="sm" onClick={onAddEvent}>
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>
        
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((day, index) => (
            <div 
              key={index} 
              className={cn(
                "text-center text-sm py-1", 
                isToday(day) ? "bg-blue-50 rounded font-medium" : ""
              )}
            >
              <div className="text-xs text-gray-500">{format(day, 'EEE')}</div>
              <div className={cn(isToday(day) ? "text-blue-600" : "")}>{format(day, 'd')}</div>
            </div>
          ))}
        </div>
        
        {view === 'week' && (
          <div className="overflow-auto max-h-[400px] border border-gray-200 rounded-md">
            <div className="flex" style={{ minHeight: '600px' }}>
              {/* Time slots column */}
              <div className="sticky left-0 bg-white border-r border-gray-200 z-10 pr-2 py-1">
                {timeSlots.map((time, index) => (
                  <div key={index} className="text-xs text-gray-500 h-[60px] flex items-start" style={{ paddingLeft: '4px' }}>
                    {time}
                  </div>
                ))}
              </div>
              
              {/* Days columns */}
              {weekDays.map((day, dayIndex) => (
                <div 
                  key={dayIndex} 
                  className="flex-1 min-w-[80px] border-r border-gray-200 last:border-r-0 relative"
                >
                  {/* Time slot grid lines */}
                  {timeSlots.map((_, index) => (
                    <div 
                      key={index} 
                      className="h-[60px] border-b border-gray-100 last:border-b-0"
                    ></div>
                  ))}
                  
                  {/* Events */}
                  {events.map((event, eventIndex) => (
                    <div
                      key={eventIndex}
                      className={cn(
                        "absolute left-1 right-1 px-2 py-1 rounded-md border text-xs font-medium cursor-pointer hover:opacity-90 transition-opacity",
                        getEventTypeColor(event.type)
                      )}
                      style={getEventPosition(event, dayIndex)}
                      onClick={() => handleEventClick(event)}
                    >
                      <div className="font-medium">{event.title}</div>
                      <div className="text-xs opacity-80">{event.start}-{event.end}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {view === 'month' && (
          <div className="grid grid-cols-7 gap-1" style={{ minHeight: '400px' }}>
            {Array.from({ length: 35 }).map((_, index) => (
              <div 
                key={index} 
                className="border border-gray-200 min-h-[100px] p-1 text-xs"
              >
                <div className="text-right text-gray-500 mb-1">{(index % 31) + 1}</div>
              </div>
            ))}
          </div>
        )}
        
        {view === 'day' && (
          <div className="overflow-auto max-h-[600px] border border-gray-200 rounded-md">
            <div className="flex" style={{ minHeight: '600px' }}>
              {/* Time slots column */}
              <div className="sticky left-0 bg-white border-r border-gray-200 z-10 pr-2 py-1">
                {timeSlots.map((time, index) => (
                  <div key={index} className="text-xs text-gray-500 h-[60px] flex items-start" style={{ paddingLeft: '4px' }}>
                    {time}
                  </div>
                ))}
              </div>
              
              {/* Day column */}
              <div className="flex-1 min-w-[200px] relative">
                {timeSlots.map((_, index) => (
                  <div 
                    key={index} 
                    className="h-[60px] border-b border-gray-100 last:border-b-0"
                  ></div>
                ))}
                
                {/* Events */}
                {events.map((event, eventIndex) => (
                  <div
                    key={eventIndex}
                    className={cn(
                      "absolute left-1 right-1 px-2 py-1 rounded-md border text-xs font-medium cursor-pointer hover:opacity-90 transition-opacity",
                      getEventTypeColor(event.type)
                    )}
                    style={getEventPosition(event, 0)}
                    onClick={() => handleEventClick(event)}
                  >
                    <div className="font-medium">{event.title}</div>
                    <div className="text-xs opacity-80">{event.start}-{event.end}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200">Sleep</Badge>
          <Badge className="bg-red-100 text-red-800 border-red-200">Exercise</Badge>
          <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">Meal</Badge>
          <Badge className="bg-amber-100 text-amber-800 border-amber-200">Supplement</Badge>
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">Appointment</Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default SchedulePlanner;
