
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ScheduleView from "@/components/schedule/ScheduleView";
import { CalendarPlus, Users } from "lucide-react";
import { Event } from "@/types/calendar";

const SAMPLE_EVENTS: Event[] = [
  {
    id: "1",
    title: "Synced work session",
    start: "11:30 AM",
    end: "12:30 PM",
    date: new Date(),
    type: "work",
    description: "Weekly on weekdays",
    location: "Google Meet",
    meetingLink: "meet.google.com/bdu-kspc-tpn",
    attendees: [
      { id: "1", name: "Konstantin Rolf", email: "konstantin.rolf@gmail.com", status: "organizer" },
      { id: "2", name: "George Georgallides", email: "", status: "confirmed" },
      { id: "3", name: "Konstantin Rolf", email: "", status: "confirmed" },
    ],
    recurring: true,
    recurrencePattern: "Weekly on weekdays"
  },
  {
    id: "2",
    title: "Joseph Kearns and George Georgallides",
    start: "5:30 PM",
    end: "6:30 PM",
    date: new Date(),
    type: "appointment",
    description: "Google Meet (instructions in description)",
    location: "Google Meet",
    attendees: [
      { id: "1", name: "Joseph Kearns", email: "", status: "confirmed" },
      { id: "2", name: "George Georgallides", email: "", status: "confirmed" }
    ]
  },
  {
    id: "3",
    title: "Mondays vs Stats Weekly",
    start: "7:00 PM",
    end: "8:00 PM",
    date: new Date(),
    type: "meeting",
    description: "7pm-8ish",
    location: "Online"
  }
];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'day' | 'week' | 'month'>('day');
  const [viewType, setViewType] = useState<'individual' | 'team'>('individual');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showEventDetails, setShowEventDetails] = useState(false);
  
  // Handlers for schedule navigation
  const handlePrevious = () => {
    // Logic for navigating to previous day/week/month
    // Simplified for now
    const newDate = new Date(currentDate);
    if (view === 'day') {
      newDate.setDate(newDate.getDate() - 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else if (view === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    // Logic for navigating to next day/week/month
    // Simplified for now
    const newDate = new Date(currentDate);
    if (view === 'day') {
      newDate.setDate(newDate.getDate() + 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else if (view === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const handleAddEvent = () => {
    // This would open event creation UI
    console.log("Add event clicked");
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  return (
    <DashboardLayout title="Calendar">
      <Tabs defaultValue="schedule" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
        </TabsList>
        
        <TabsContent value="schedule" className="space-y-4">
          <div className="flex justify-between items-center mb-6">
            <Tabs value={viewType} onValueChange={(v) => setViewType(v as 'individual' | 'team')} className="w-auto">
              <TabsList>
                <TabsTrigger value="individual" className="flex items-center gap-1">
                  <CalendarPlus className="h-4 w-4" />
                  <span>Individual</span>
                </TabsTrigger>
                <TabsTrigger value="team" className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>Team</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <ScheduleView
            events={SAMPLE_EVENTS}
            currentDate={currentDate}
            view={view}
            viewType={viewType}
            onViewChange={setView}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onAddEvent={handleAddEvent}
            onEventClick={handleEventClick}
            selectedEvent={selectedEvent}
            showEventDetails={showEventDetails}
            onCloseEventDetails={() => setShowEventDetails(false)}
          />
        </TabsContent>
        
        <TabsContent value="availability">
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Availability Settings</h2>
            <p className="text-gray-600">Configure your available hours and appointment slots here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Calendar;
