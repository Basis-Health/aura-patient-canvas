
import React from 'react';
import { format, isToday, isSameDay } from 'date-fns';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Event } from '@/types/calendar';

interface TeamViewProps {
  currentDate: Date;
  view: 'day' | 'week' | 'month';
  weekDays: Date[];
  events: Event[];
  onEventClick: (event: Event) => void;
}

const TeamView: React.FC<TeamViewProps> = ({ currentDate, view, weekDays, events, onEventClick }) => {
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i % 12 || 12;
    const amPm = i < 12 ? 'AM' : 'PM';
    return `${hour} ${amPm}`;
  });
  
  // Mocked team members for demonstration
  const teamMembers = [
    { id: '1', name: 'George', email: 'george@basishealth.io', avatarUrl: '' },
    { id: '2', name: 'Sarah', email: 'sarah@basishealth.io', avatarUrl: '' }
  ];
  
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
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'; // Default to busy
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
  
  // For day view in team mode
  if (view === 'day') {
    return (
      <div className="border border-gray-200 rounded-md overflow-auto max-h-[600px]">
        <div className="grid" style={{ gridTemplateColumns: `60px repeat(${teamMembers.length}, 1fr)` }}>
          {/* Header with team members */}
          <div className="sticky top-0 z-10 flex border-b border-gray-200 bg-white">
            <div className="w-[60px] p-2 border-r border-gray-200"></div>
            
            {teamMembers.map((member) => (
              <div key={member.id} className="flex-1 p-2 text-center border-r border-gray-200 last:border-r-0">
                <Avatar className="mx-auto mb-1 h-8 w-8">
                  <AvatarImage src={member.avatarUrl} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-xs truncate">{member.name}</div>
                <div className="text-xs text-gray-500 truncate">{member.email}</div>
              </div>
            ))}
          </div>
          
          {/* Time grid */}
          <div className="flex">
            {/* Time slots column */}
            <div className="sticky left-0 w-[60px] bg-white border-r border-gray-200 z-10">
              {timeSlots.map((time, index) => (
                <div
                  key={index}
                  className="h-[60px] border-b border-gray-200 px-2 flex items-start pt-1 text-xs text-gray-500"
                >
                  {time}
                </div>
              ))}
            </div>
            
            {/* Team member columns */}
            {teamMembers.map((member, memberIndex) => (
              <div 
                key={member.id}
                className="flex-1 relative border-r border-gray-200 last:border-r-0"
              >
                {/* Time slot grid lines */}
                {timeSlots.map((_, timeIndex) => (
                  <div 
                    key={timeIndex}
                    className="h-[60px] border-b border-gray-200"
                  />
                ))}
                
                {/* Events for this team member */}
                {events.map((event, eventIndex) => (
                  <div
                    key={`${memberIndex}-${eventIndex}`}
                    className={cn(
                      "absolute left-1 right-1 px-2 py-1 rounded-md border text-xs font-medium cursor-pointer hover:opacity-90 transition-opacity",
                      getEventColor('busy') // Show all team events as busy
                    )}
                    style={getEventPosition(event)}
                    onClick={() => onEventClick(event)}
                  >
                    <div className="font-medium truncate">Busy</div>
                    <div className="text-xs opacity-80 truncate">{event.start} - {event.end}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  // For week view in team mode
  return (
    <div className="border border-gray-200 rounded-md overflow-auto max-h-[600px]">
      <div className="grid" style={{ gridTemplateColumns: `60px repeat(${teamMembers.length}, 1fr)` }}>
        {/* Header with team members */}
        <div className="sticky top-0 z-10 flex border-b border-gray-200 bg-white">
          <div className="w-[60px] p-2 border-r border-gray-200">
            <div className="text-center text-xs font-medium">
              {format(currentDate, 'MMMM')}
            </div>
            <div className="text-center text-sm font-bold">
              {format(currentDate, 'd')}
            </div>
          </div>
          
          {teamMembers.map((member) => (
            <div key={member.id} className="flex-1 p-2 text-center border-r border-gray-200 last:border-r-0">
              <Avatar className="mx-auto mb-1 h-8 w-8">
                <AvatarImage src={member.avatarUrl} alt={member.name} />
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-xs truncate">{member.name}</div>
              <div className="text-xs text-gray-500 truncate">{member.email}</div>
            </div>
          ))}
        </div>
        
        {/* Time grid */}
        <div className="flex">
          {/* Time slots column */}
          <div className="sticky left-0 w-[60px] bg-white border-r border-gray-200 z-10">
            {timeSlots.map((time, index) => (
              <div
                key={index}
                className="h-[60px] border-b border-gray-200 px-2 flex items-start pt-1 text-xs text-gray-500"
              >
                {time}
              </div>
            ))}
          </div>
          
          {/* Team member columns */}
          {teamMembers.map((member, memberIndex) => (
            <div 
              key={member.id}
              className="flex-1 relative border-r border-gray-200 last:border-r-0"
            >
              {/* Time slot grid lines */}
              {timeSlots.map((_, timeIndex) => (
                <div 
                  key={timeIndex}
                  className="h-[60px] border-b border-gray-200"
                />
              ))}
              
              {/* Sample events for display */}
              {memberIndex === 0 && (
                <>
                  <div
                    className="absolute left-1 right-1 px-2 py-1 rounded-md border text-xs font-medium cursor-pointer hover:opacity-90 transition-opacity bg-yellow-100 text-yellow-800 border-yellow-200"
                    style={{ top: '690px', height: '60px' }}
                    onClick={() => onEventClick(events[0] || { id: 'sample', title: 'Busy', start: '11:30 AM', end: '12:30 PM', type: 'busy', date: new Date() })}
                  >
                    <div className="font-medium truncate">Busy</div>
                    <div className="text-xs opacity-80 truncate">11:30 AM - 12:30 PM</div>
                  </div>
                  <div
                    className="absolute left-1 right-1 px-2 py-1 rounded-md border text-xs font-medium cursor-pointer hover:opacity-90 transition-opacity bg-yellow-100 text-yellow-800 border-yellow-200"
                    style={{ top: '1020px', height: '60px' }}
                    onClick={() => onEventClick(events[1] || { id: 'sample2', title: 'Busy', start: '5:00 PM', end: '6:00 PM', type: 'busy', date: new Date() })}
                  >
                    <div className="font-medium truncate">Busy</div>
                    <div className="text-xs opacity-80 truncate">5:00 PM - 6:00 PM</div>
                  </div>
                </>
              )}

              {memberIndex === 1 && (
                <div
                  className="absolute left-1 right-1 px-2 py-1 rounded-md border text-xs font-medium cursor-pointer hover:opacity-90 transition-opacity bg-yellow-100 text-yellow-800 border-yellow-200"
                  style={{ top: '1140px', height: '60px' }}
                  onClick={() => onEventClick(events[2] || { id: 'sample3', title: 'Busy', start: '7:00 PM', end: '8:00 PM', type: 'busy', date: new Date() })}
                >
                  <div className="font-medium truncate">Busy</div>
                  <div className="text-xs opacity-80 truncate">7:00 PM - 8:00 PM</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamView;
