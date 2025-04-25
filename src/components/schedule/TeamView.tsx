
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
  // Create time slots starting at 5 AM instead of 12 AM
  const timeSlots = Array.from({ length: 19 }, (_, i) => {
    const hour = (i + 5) % 12 || 12;
    const amPm = i + 5 < 12 ? 'AM' : 'PM';
    return `${hour} ${amPm}`;
  });
  
  // Team members with distinct calendar colors
  const teamMembers = [
    { 
      id: '1', 
      name: 'George', 
      email: 'george@basishealth.io', 
      avatarUrl: '', 
      color: 'bg-amber-100 text-amber-800 border-amber-200' 
    },
    { 
      id: '2', 
      name: 'Sarah', 
      email: 'sarah@basishealth.io', 
      avatarUrl: '', 
      color: 'bg-blue-100 text-blue-800 border-blue-200' 
    },
    { 
      id: '3', 
      name: 'Michael', 
      email: 'michael@basishealth.io', 
      avatarUrl: '', 
      color: 'bg-purple-100 text-purple-800 border-purple-200' 
    }
  ];
  
  // Function to get the position of an event in the calendar grid
  const getEventPosition = (event: Event) => {
    // Extract hour from event time (e.g., "11:30 AM" -> 11)
    const startTimeParts = event.start.split(':');
    const startHour = parseInt(startTimeParts[0]);
    const isPM = event.start.toLowerCase().includes('pm');
    const actualHour = isPM && startHour !== 12 ? startHour + 12 : startHour;
    
    // Calculate offset based on 5am start
    const hourOffset = actualHour - 5;
    if (hourOffset < 0) return { top: '0px', height: '0px' }; // Hide events before 5am
    
    // Add minutes
    const startMinute = parseInt(startTimeParts[1].split(' ')[0]) || 0;
    const totalMinutes = hourOffset * 60 + startMinute;
    
    // Calculate end time
    const endTimeParts = event.end.split(':');
    const endHour = parseInt(endTimeParts[0]);
    const endIsPM = event.end.toLowerCase().includes('pm');
    const actualEndHour = endIsPM && endHour !== 12 ? endHour + 12 : endHour;
    const endMinute = parseInt(endTimeParts[1].split(' ')[0]) || 0;
    const totalEndMinutes = (actualEndHour - 5) * 60 + endMinute;
    
    // Calculate height based on duration
    const durationMinutes = totalEndMinutes - totalMinutes;
    const height = (durationMinutes / 60) * 60;
    
    return {
      top: `${totalMinutes}px`,
      height: `${height}px`,
    };
  };
  
  // Sample events distributed across team members
  const getMemberEvents = (memberId: string) => {
    // In a real app, we would filter events by member ID
    // For demo, we'll return different sets based on member ID
    switch (memberId) {
      case '1':
        return [
          { 
            id: 'event1', 
            title: 'Busy', 
            start: '11:30 AM', 
            end: '12:30 PM', 
            type: 'busy', 
            date: new Date() 
          },
          { 
            id: 'event2', 
            title: 'Busy', 
            start: '5:00 PM', 
            end: '6:00 PM', 
            type: 'busy', 
            date: new Date() 
          }
        ];
      case '2':
        return [
          { 
            id: 'event3', 
            title: 'Busy', 
            start: '2:00 PM', 
            end: '3:30 PM', 
            type: 'busy', 
            date: new Date() 
          }
        ];
      case '3':
        return [
          { 
            id: 'event4', 
            title: 'Busy', 
            start: '7:00 PM', 
            end: '8:00 PM', 
            type: 'busy', 
            date: new Date() 
          }
        ];
      default:
        return [];
    }
  };
  
  // For day view in team mode
  if (view === 'day') {
    return (
      <div className="border border-gray-200 rounded-md overflow-auto max-h-[600px] w-full">
        {/* Main container with fixed width columns */}
        <div className="w-full grid" style={{ gridTemplateColumns: '80px repeat(3, minmax(200px, 1fr))' }}>
          {/* Header row with time label and team members */}
          <div className="sticky top-0 z-10 grid" style={{ gridTemplateColumns: '80px repeat(3, minmax(200px, 1fr))' }}>
            {/* Fixed time label cell */}
            <div className="w-[80px] p-2 border-r border-gray-200 bg-white">
              <div className="text-xs text-gray-500 text-center">Time</div>
            </div>
            
            {/* Team member headers */}
            {teamMembers.map((member) => (
              <div key={member.id} className="p-2 text-center border-r border-gray-200 last:border-r-0">
                <div className="flex flex-col items-center">
                  <Avatar className="mx-auto mb-1 h-8 w-8">
                    <AvatarImage src={member.avatarUrl} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="text-xs font-medium">{member.name}</div>
                  <div className="text-xs text-gray-500 truncate">{member.email}</div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Calendar body grid with time slots and events */}
          <div className="grid" style={{ gridTemplateColumns: '80px repeat(3, minmax(200px, 1fr))' }}>
            {/* Time slots column */}
            <div className="sticky left-0 w-[80px] bg-white border-r border-gray-200 z-10">
              {timeSlots.map((time, index) => (
                <div
                  key={index}
                  className="h-[60px] border-b border-gray-200 px-2 flex items-start pt-1 text-xs text-gray-500"
                >
                  {time}
                </div>
              ))}
            </div>
            
            {/* Team member columns with events */}
            {teamMembers.map((member) => (
              <div 
                key={member.id}
                className="relative border-r border-gray-200 last:border-r-0"
              >
                {/* Time slot grid lines */}
                {timeSlots.map((_, timeIndex) => (
                  <div 
                    key={timeIndex}
                    className="h-[60px] border-b border-gray-200"
                  />
                ))}
                
                {/* Events for this team member */}
                {getMemberEvents(member.id).map((event, eventIndex) => (
                  <div
                    key={eventIndex}
                    className={cn(
                      "absolute left-1 right-1 px-2 py-1 rounded-md border text-xs font-medium cursor-pointer hover:opacity-90 transition-opacity",
                      member.color
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
      </div>
    );
  }
  
  // For week view in team mode
  return (
    <div className="border border-gray-200 rounded-md overflow-auto max-h-[600px] w-full">
      {/* Main container with fixed width columns */}
      <div className="w-full grid" style={{ gridTemplateColumns: '80px repeat(3, minmax(200px, 1fr))' }}>
        {/* Header row with date and team members */}
        <div className="sticky top-0 z-10 grid" style={{ gridTemplateColumns: '80px repeat(3, minmax(200px, 1fr))' }}>
          {/* Fixed time label cell */}
          <div className="w-[80px] p-2 border-r border-gray-200 bg-white">
            <div className="text-center text-xs text-gray-500">
              Time
            </div>
          </div>
          
          {/* Team member headers */}
          {teamMembers.map((member) => (
            <div key={member.id} className="p-2 text-center border-r border-gray-200 last:border-r-0">
              <div className="flex flex-col items-center">
                <Avatar className="mx-auto mb-1 h-8 w-8">
                  <AvatarImage src={member.avatarUrl} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-xs font-medium">{member.name}</div>
                <div className="text-xs text-gray-500 truncate">{member.email}</div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Calendar body grid with time slots and events */}
        <div className="grid" style={{ gridTemplateColumns: '80px repeat(3, minmax(200px, 1fr))' }}>
          {/* Time slots column */}
          <div className="sticky left-0 w-[80px] bg-white border-r border-gray-200 z-10">
            {timeSlots.map((time, index) => (
              <div
                key={index}
                className="h-[60px] border-b border-gray-200 px-2 flex items-start pt-1 text-xs text-gray-500"
              >
                {time}
              </div>
            ))}
          </div>
          
          {/* Team member columns with events */}
          {teamMembers.map((member) => (
            <div 
              key={member.id}
              className="relative border-r border-gray-200 last:border-r-0"
            >
              {/* Time slot grid lines */}
              {timeSlots.map((_, timeIndex) => (
                <div 
                  key={timeIndex}
                  className="h-[60px] border-b border-gray-200"
                />
              ))}
              
              {/* Events for this team member */}
              {getMemberEvents(member.id).map((event, eventIndex) => (
                <div
                  key={eventIndex}
                  className={cn(
                    "absolute left-1 right-1 px-2 py-1 rounded-md border text-xs font-medium cursor-pointer hover:opacity-90 transition-opacity",
                    member.color
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
    </div>
  );
};

export default TeamView;
