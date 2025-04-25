
import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';
import { cn } from '@/lib/utils';
import { Event } from '@/types/calendar';

interface MonthViewProps {
  currentDate: Date;
  events: Event[];
  onEventClick: (event: Event) => void;
}

const MonthView: React.FC<MonthViewProps> = ({ currentDate, events, onEventClick }) => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  const getEventColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'work':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'meeting':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'appointment':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'busy':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'free':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  return (
    <div className="grid grid-cols-7 gap-1">
      {/* Day headers */}
      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
        <div key={day} className="text-center text-sm font-medium p-2">
          {day}
        </div>
      ))}
      
      {/* Empty cells for days before month start */}
      {Array.from({ length: monthStart.getDay() === 0 ? 6 : monthStart.getDay() - 1 }).map((_, i) => (
        <div key={`empty-start-${i}`} className="h-24 border border-gray-200 bg-gray-50 opacity-50" />
      ))}
      
      {/* Days of the month */}
      {daysInMonth.map((day, i) => (
        <div 
          key={i}
          className={cn(
            "h-24 border border-gray-200 overflow-hidden",
            isToday(day) ? "bg-blue-50" : "bg-white"
          )}
        >
          <div className="flex justify-between items-center p-1 border-b">
            <span className={cn(
              "inline-block w-6 h-6 text-center leading-6 text-sm rounded-full",
              isToday(day) ? "bg-blue-500 text-white" : "text-gray-700"
            )}>
              {format(day, 'd')}
            </span>
          </div>
          
          <div className="p-1 overflow-y-auto max-h-16">
            {events.map((event, eventIndex) => (
              <div
                key={eventIndex}
                className={cn(
                  "mb-1 px-1 py-0.5 text-xs rounded truncate cursor-pointer",
                  getEventColor(event.type)
                )}
                onClick={() => onEventClick(event)}
              >
                {event.title}
              </div>
            ))}
          </div>
        </div>
      ))}
      
      {/* Empty cells for days after month end */}
      {Array.from({ length: (7 - monthEnd.getDay()) % 7 }).map((_, i) => (
        <div key={`empty-end-${i}`} className="h-24 border border-gray-200 bg-gray-50 opacity-50" />
      ))}
    </div>
  );
};

export default MonthView;
