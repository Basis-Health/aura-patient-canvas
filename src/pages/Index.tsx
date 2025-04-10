
import React, { useState } from 'react';
import PatientHeader from '@/components/patient/PatientHeader';
import DashboardLayout from '@/components/layout/DashboardLayout';
import MetricsOverview from '@/components/metrics/MetricsOverview';
import BiomarkersVisualizer from '@/components/biomarkers/BiomarkersVisualizer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import InsightCards from '@/components/insights/InsightCards';
import ActivityFeed from '@/components/activity/ActivityFeed';
import SchedulePlanner from '@/components/planner/SchedulePlanner';
import { format } from 'date-fns';
import DayViewGraph from '@/components/planner/DayViewGraph';
import { addDays } from 'date-fns';
import ChatButton from '@/components/chat/ChatButton';
import CopilotChat from '@/components/chat/CopilotChat';
import ClientChat from '@/components/chat/ClientChat';

// Mocked data
const mockPatient = {
  name: "George Georgallides",
  email: "george@example.com",
  location: "San Francisco, CA",
  birthdate: "1993-05-12", // Added birthdate
  avatarUrl: "/lovable-uploads/1ca07b90-534f-4849-83c5-906dee56f04c.png",
};

// Mocked day view data for the new day view graph
const mockDayViewData = {
  heartRate: [
    { time: "03:00 AM", value: 62 },
    { time: "06:00 AM", value: 68 },
    { time: "09:00 AM", value: 82 },
    { time: "12:00 PM", value: 78 },
    { time: "03:00 PM", value: 75 },
    { time: "06:00 PM", value: 90 },
    { time: "09:00 PM", value: 72 },
    { time: "12:00 AM", value: 65 },
  ],
  glucose: [
    { time: "03:00 AM", value: 90 },
    { time: "06:00 AM", value: 85 },
    { time: "09:00 AM", value: 120 },
    { time: "12:00 PM", value: 110 },
    { time: "03:00 PM", value: 95 },
    { time: "06:00 PM", value: 140 },
    { time: "09:00 PM", value: 100 },
    { time: "12:00 AM", value: 92 },
  ],
  circadianRhythm: [
    { time: "03:00 AM", value: 60 },
    { time: "06:00 AM", value: 75 },
    { time: "09:00 AM", value: 90 },
    { time: "12:00 PM", value: 100 },
    { time: "03:00 PM", value: 95 },
    { time: "06:00 PM", value: 90 },
    { time: "09:00 PM", value: 75 },
    { time: "12:00 AM", value: 60 },
  ],
  events: [
    { time: "07:00 AM", type: "sleep", label: "Woke up", details: "7.5h total, 85% quality" },
    { time: "08:30 AM", type: "meal", label: "Breakfast", details: "Protein + veggies" },
    { time: "12:30 PM", type: "meal", label: "Lunch", details: "Salad + protein" },
    { time: "04:00 PM", type: "workout", label: "HIIT workout", duration: "30 min" },
    { time: "07:00 PM", type: "meal", label: "Dinner", details: "Low carb" },
    { time: "09:00 PM", type: "supplement", label: "Magnesium", details: "200mg" },
    { time: "10:30 PM", type: "sleep", label: "Bedtime", details: "Sleep routine started" },
  ]
};

// Mock scheduler events
const mockScheduleEvents = [
  {
    id: "1",
    title: "Morning Supplement",
    start: "8:00 AM",
    end: "8:05 AM",
    type: "supplement"
  },
  {
    id: "2",
    title: "Zone 2 Cardio",
    start: "9:00 AM",
    end: "9:45 AM",
    type: "workout"
  },
  {
    id: "3",
    title: "Protein-rich Lunch",
    start: "12:30 PM",
    end: "1:00 PM",
    type: "meal"
  },
  {
    id: "4",
    title: "Afternoon Meditation",
    start: "3:00 PM",
    end: "3:15 PM",
    type: "appointment"
  },
  {
    id: "5",
    title: "Sleep Wind-down",
    start: "10:00 PM",
    end: "11:00 PM",
    type: "sleep"
  }
];

// Type definition for Protocol and ProtocolItem to match the expected types
interface ProtocolItem {
  id: string;
  type: "supplement" | "exercise" | "lifestyle" | "diet";
  name: string;
  schedule: string;
  adherence: number;
  targetBiomarkers: string[];
  impact: "positive" | "negative" | "neutral";
}

interface Protocol {
  id: string;
  name: string;
  startDate: string;
  adherence: number;
  status: "active" | "completed" | "paused";
  items: ProtocolItem[];
}

// Mock protocol with correct typing
const mockProtocol: Protocol = {
  id: "1",
  name: "Metabolic Health Protocol",
  startDate: "Feb 12, 2025",
  adherence: 76,
  status: 'active',
  items: [
    {
      id: "1",
      type: 'supplement',
      name: "Berberine 500mg",
      schedule: "3x daily with meals",
      adherence: 85,
      targetBiomarkers: ["HbA1c", "Fasting Glucose", "Insulin"],
      impact: 'positive'
    },
    {
      id: "2",
      type: 'exercise',
      name: "Zone 2 Cardio",
      schedule: "30 min, 3x weekly",
      adherence: 45,
      targetBiomarkers: ["VO2 Max", "Resting Heart Rate"],
      impact: 'positive'
    },
    {
      id: "3",
      type: 'lifestyle',
      name: "Sleep optimization",
      schedule: "8hrs nightly, 10pm-6am",
      adherence: 62,
      targetBiomarkers: ["Cortisol", "HRV"],
      impact: 'neutral'
    },
    {
      id: "4",
      type: 'diet',
      name: "Low carb high protein",
      schedule: "Daily",
      adherence: 91,
      targetBiomarkers: ["LDL", "HDL", "Triglycerides"],
      impact: 'positive'
    }
  ]
};

// Mock activity feed items
const mockActivityItems = [
  {
    id: "1",
    type: "lab_result",
    title: "New Lab Results",
    description: "HbA1c improved from 5.7% to 5.4%",
    date: "2 hours ago",
    icon: "chart"
  },
  {
    id: "2",
    type: "protocol_change",
    title: "Protocol Updated",
    description: "Added NAC 600mg supplement to protocol",
    date: "Yesterday",
    icon: "clipboard"
  },
  {
    id: "3",
    type: "message",
    title: "Message from Client",
    description: "Question about berberine timing",
    date: "2 days ago",
    icon: "message"
  },
  {
    id: "4",
    type: "appointment",
    title: "Appointment Scheduled",
    description: "Follow-up: May 15, 10:00 AM",
    date: "3 days ago",
    icon: "calendar"
  }
];

// Mock metrics data
const mockMetrics = {
  steps: 8432,
  weight: 176.5,
  heartRate: 68
};

// Mock insights data for InsightCards component
const mockInsights = [
  {
    id: "1",
    title: "Improved Sleep Quality",
    description: "Sleep efficiency up 15% this month",
    trend: "up" as const,
    percentage: 15,
    timeframe: "Past 30 days",
    chartData: [
      { date: "Apr 1", value: 72 },
      { date: "Apr 8", value: 78 },
      { date: "Apr 15", value: 83 },
      { date: "Apr 22", value: 87 },
      { date: "Apr 29", value: 85 },
    ],
    type: "metric" as const
  },
  {
    id: "2",
    title: "Reduced Inflammation",
    description: "CRP levels down 22%",
    trend: "down" as const,
    percentage: 22,
    timeframe: "Past 90 days",
    chartData: [
      { date: "Jan", value: 3.2 },
      { date: "Feb", value: 2.8 },
      { date: "Mar", value: 2.5 },
      { date: "Apr", value: 2.1 },
    ],
    type: "biomarker" as const
  },
];

// Mock biomarker data for the BiomarkersVisualizer
const mockBiomarkerStats = {
  total: 345,
  outOfRange: 24,
  inRange: 321
};

// Define the Index component
const Index = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [plannerView, setPlannerView] = useState<'day' | 'week' | 'month'>('week');
  const [isCopilotChatOpen, setIsCopilotChatOpen] = useState(false);
  const [isClientChatOpen, setIsClientChatOpen] = useState(false);

  const handlePrevious = () => {
    setCurrentDate(prev => addDays(prev, -7));
  };

  const handleNext = () => {
    setCurrentDate(prev => addDays(prev, 7));
  };

  const handleAddEvent = () => {
    console.log("Add event clicked");
  };

  const handleViewChange = (view: 'day' | 'week' | 'month') => {
    setPlannerView(view);
  };

  return (
    <DashboardLayout>
      <PatientHeader 
        patient={mockPatient}
      />
      
      <div className="container py-6">
        <Tabs defaultValue="summary">
          <TabsList className="mb-8">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="protocol">Protocol</TabsTrigger>
            <TabsTrigger value="plan">Plan</TabsTrigger>
            <TabsTrigger value="labs">Labs</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>
          
          {/* Summary Tab */}
          <TabsContent value="summary" className="space-y-6">
            <MetricsOverview metrics={mockMetrics} />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Activity Feed up in left column */}
              <div className="space-y-6">
                <ActivityFeed 
                  activities={mockActivityItems}
                  showSeeMore={true}
                />
                
                {/* Insights moved below Activity Feed */}
                <InsightCards insights={mockInsights} />
              </div>
              
              <div className="md:col-span-2">
                <BiomarkersVisualizer 
                  total={mockBiomarkerStats.total}
                  outOfRange={mockBiomarkerStats.outOfRange}
                  inRange={mockBiomarkerStats.inRange}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="protocol">
            {/* Protocol content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-3">
                {/* This is where the protocol tab content will go */}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="plan">
            {/* Plan content */}
            <div className="space-y-6">
              {plannerView === 'day' && (
                <DayViewGraph data={mockDayViewData} />
              )}
              <SchedulePlanner
                currentDate={currentDate}
                events={mockScheduleEvents}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onAddEvent={handleAddEvent}
                view={plannerView}
                onViewChange={handleViewChange}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="labs">
            {/* Labs content */}
            <div>Labs content will go here</div>
          </TabsContent>
          
          <TabsContent value="notes">
            {/* Notes content */}
            <div>Notes content will go here</div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add the chat button */}
      <ChatButton
        onOpenCopilotChat={() => setIsCopilotChatOpen(true)}
        onOpenClientChat={() => setIsClientChatOpen(true)}
      />
      
      {/* Chat components */}
      <CopilotChat 
        isOpen={isCopilotChatOpen}
        onClose={() => setIsCopilotChatOpen(false)}
      />
      
      <ClientChat
        isOpen={isClientChatOpen}
        onClose={() => setIsClientChatOpen(false)}
        clientName={mockPatient.name}
        clientAvatar={mockPatient.avatarUrl}
      />
    </DashboardLayout>
  );
};

// Add default export
export default Index;
