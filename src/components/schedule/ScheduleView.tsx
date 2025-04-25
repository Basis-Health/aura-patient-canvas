
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { format, addDays, startOfWeek, isToday, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';
import EventDetailDrawer from './EventDetailDrawer';
import DayView from './DayView';
import WeekView from './WeekView';
import MonthView from './MonthView';
import TeamView from './TeamView';
import { Event } from '@/types/calendar';

interface ScheduleViewProps {
  currentDate: Date;
  events: Event[];
  view: 'day' | 'week' | 'month';
  viewType: 'individual' | 'team';
  onPrevious: () => void;
  onNext: () => void;
  onAddEvent: () => void;
  onViewChange: (view: 'day' | 'week' | 'month') => void;
  onEventClick: (event: Event) => void;
  selectedEvent: Event | null;
  showEventDetails: boolean;
  onCloseEventDetails: () => void;
}

const ScheduleView: React.FC<ScheduleViewProps> = ({
  currentDate,
  events,
  view,
  viewType,
  onPrevious,
  onNext,
  onAddEvent,
  onViewChange,
  onEventClick,
  selectedEvent,
  showEventDetails,
  onCloseEventDetails
}) => {
  const weekDays = React.useMemo(() => {
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 }); // Start week on Monday
    return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  }, [currentDate]);

  const getDateLabel = () => {
    if (view === 'day') {
      return format(currentDate, 'EEEE, MMMM d, yyyy');
    } else if (view === 'week') {
      const startDate = weekDays[0];
      const endDate = weekDays[6];
      const sameMonth = startDate.getMonth() === endDate.getMonth();
      const sameYear = startDate.getFullYear() === endDate.getFullYear();
      
      if (sameMonth && sameYear) {
        return `${format(startDate, 'MMM d')} - ${format(endDate, 'd, yyyy')}`;
      } else if (sameYear) {
        return `${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d, yyyy')}`;
      } else {
        return `${format(startDate, 'MMM d, yyyy')} - ${format(endDate, 'MMM d, yyyy')}`;
      }
    } else {
      return format(currentDate, 'MMMM yyyy');
    }
  };
  
  return (
    <Card className="border shadow-sm">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onPrevious}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="font-medium text-lg">{getDateLabel()}</span>
            <Button variant="ghost" size="icon" onClick={onNext}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex border rounded-md overflow-hidden">
              <Button 
                variant="ghost" 
                size="sm" 
                className={cn(
                  "rounded-none border-0 h-8 px-3",
                  view === 'day' && "bg-gray-100"
                )}
                onClick={() => onViewChange('day')}
              >
                Day
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className={cn(
                  "rounded-none border-l border-r border-0 h-8 px-3",
                  view === 'week' && "bg-gray-100"
                )}
                onClick={() => onViewChange('week')}
              >
                Week
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className={cn(
                  "rounded-none border-0 h-8 px-3",
                  view === 'month' && "bg-gray-100"
                )}
                onClick={() => onViewChange('month')}
              >
                Month
              </Button>
            </div>
            
            <Button variant="outline" size="sm" onClick={onAddEvent} className="ml-2">
              <Plus className="h-4 w-4 mr-1" /> Add
            </Button>
          </div>
        </div>
        
        {viewType === 'individual' ? (
          <>
            {view === 'day' && (
              <DayView 
                currentDate={currentDate}
                events={events}
                onEventClick={onEventClick}
              />
            )}
            
            {view === 'week' && (
              <WeekView 
                currentDate={currentDate}
                weekDays={weekDays}
                events={events}
                onEventClick={onEventClick}
              />
            )}
            
            {view === 'month' && (
              <MonthView 
                currentDate={currentDate}
                events={events}
                onEventClick={onEventClick}
              />
            )}
          </>
        ) : (
          <TeamView 
            currentDate={currentDate}
            view={view}
            weekDays={weekDays}
            events={events}
            onEventClick={onEventClick}
          />
        )}
      </CardContent>
      
      {/* Event Detail Drawer */}
      <EventDetailDrawer 
        event={selectedEvent}
        open={showEventDetails}
        onClose={onCloseEventDetails}
      />
    </Card>
  );
};

export default ScheduleView;
