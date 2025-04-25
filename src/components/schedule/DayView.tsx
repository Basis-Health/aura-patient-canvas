
import React from 'react';
import { format, isSameDay } from 'date-fns';
import { cn } from '@/lib/utils';
import { Event } from '@/types/calendar';

interface DayViewProps {
  currentDate: Date;
  events: Event[];
  onEventClick: (event: Event) => void;
}

const DayView: React.FC<DayViewProps> = ({ currentDate, events, onEventClick }) => {
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
  
  const todayEvents = events.filter(event => 
    event.date ? isSameDay(new Date(event.date), currentDate) : true
  );
  
  return (
    <div className="border border-gray-200 rounded-md overflow-hidden">
      <div className="grid grid-cols-[60px_1fr]">
        <div className="border-r border-gray-200">
          {timeSlots.map((time, index) => (
            <div 
              key={index} 
              className="h-[60px] border-b border-gray-200 px-2 flex items-start pt-1 text-xs text-gray-500"
            >
              {time}
            </div>
          ))}
        </div>
        
        <div className="relative">
          {/* Time grid */}
          {timeSlots.map((_, index) => (
            <div 
              key={index} 
              className="h-[60px] border-b border-gray-200"
            />
          ))}
          
          {/* Events */}
          {todayEvents.map((event, index) => (
            <div
              key={index}
              className={cn(
                "absolute left-1 right-1 px-2 py-1 rounded-md border text-xs font-medium cursor-pointer hover:opacity-90 transition-opacity",
                getEventColor(event.type)
              )}
              style={getEventPosition(event)}
              onClick={() => onEventClick(event)}
            >
              <div className="font-medium">{event.title}</div>
              <div className="text-xs opacity-80">{event.start} - {event.end}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DayView;
