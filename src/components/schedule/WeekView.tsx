
import React from 'react';
import { format, isSameDay, isToday } from 'date-fns';
import { cn } from '@/lib/utils';
import { Event } from '@/types/calendar';

interface WeekViewProps {
  currentDate: Date;
  weekDays: Date[];
  events: Event[];
  onEventClick: (event: Event) => void;
}

const WeekView: React.FC<WeekViewProps> = ({ currentDate, weekDays, events, onEventClick }) => {
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i % 12 || 12;
    const amPm = i < 12 ? 'AM' : 'PM';
    return `${hour} ${amPm}`;
  });
  
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

  const getEventPosition = (event: Event) => {
    // Extract hour from event time (e.g., "11:30 AM" -> 11)
    const startTimeParts = event.start.split(':');
    const startHour = parseInt(startTimeParts[0]);
    const isPM = event.start.toLowerCase().includes('pm');
    const actualHour = isPM && startHour !== 12 ? startHour + 12 : startHour;
    
    // Add minutes
    const startMinute = parseInt(startTimeParts[1].split(' ')[0]) || 0;
    const totalMinutes = actualHour * 60 + startMinute;
    
    // Calculate end time
    const endTimeParts = event.end.split(':');
    const endHour = parseInt(endTimeParts[0]);
    const endIsPM = event.end.toLowerCase().includes('pm');
    const actualEndHour = endIsPM && endHour !== 12 ? endHour + 12 : endHour;
    const endMinute = parseInt(endTimeParts[1].split(' ')[0]) || 0;
    const totalEndMinutes = actualEndHour * 60 + endMinute;
    
    // Calculate height based on duration
    const durationMinutes = totalEndMinutes - totalMinutes;
    const height = (durationMinutes / 60) * 60;
    
    return {
      top: `${totalMinutes}px`,
      height: `${height}px`,
    };
  };

  return (
    <div className="border border-gray-200 rounded-md overflow-auto max-h-[600px]">
      {/* Header with day names */}
      <div className="grid grid-cols-[60px_repeat(7,_1fr)] border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="p-2 border-r border-gray-200"></div>
        {weekDays.map((day, index) => (
          <div 
            key={index} 
            className={cn(
              "p-2 text-center text-sm border-r border-gray-200 last:border-r-0",
              isToday(day) ? "bg-blue-50 font-medium" : "bg-white"
            )}
          >
            <div className="text-xs text-gray-500">{format(day, 'EEE')}</div>
            <div className={cn(isToday(day) ? "text-blue-600" : "")}>{format(day, 'd')}</div>
          </div>
        ))}
      </div>

      {/* Time grid with events */}
      <div className="grid grid-cols-[60px_repeat(7,_1fr)] relative">
        {/* Time slots column */}
        <div className="sticky left-0 bg-white border-r border-gray-200 z-10">
          {timeSlots.map((time, index) => (
            <div
              key={index}
              className="h-[60px] border-b border-gray-200 px-2 flex items-start pt-1 text-xs text-gray-500"
            >
              {time}
            </div>
          ))}
        </div>

        {/* Day columns */}
        {weekDays.map((day, dayIndex) => (
          <div 
            key={dayIndex} 
            className="relative border-r border-gray-200 last:border-r-0"
          >
            {/* Time slot grid lines */}
            {timeSlots.map((_, timeIndex) => (
              <div 
                key={timeIndex}
                className="h-[60px] border-b border-gray-200"
              />
            ))}
            
            {/* Events for this day */}
            {events
              .filter(event => event.date ? isSameDay(new Date(event.date), day) : true)
              .map((event, eventIndex) => (
                <div
                  key={`${dayIndex}-${eventIndex}`}
                  className={cn(
                    "absolute left-1 right-1 px-2 py-1 rounded-md border text-xs font-medium cursor-pointer hover:opacity-90 transition-opacity",
                    getEventColor(event.type)
                  )}
                  style={getEventPosition(event)}
                  onClick={() => onEventClick(event)}
                >
                  <div className="font-medium truncate">{event.title}</div>
                  <div className="text-xs opacity-80 truncate">{event.start} - {event.end}</div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekView;
