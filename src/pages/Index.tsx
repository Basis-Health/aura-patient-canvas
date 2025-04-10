
import React, { useState } from 'react';
import PatientHeader from '@/components/patient/PatientHeader';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { addDays } from 'date-fns';
import ChatButton from '@/components/chat/ChatButton';
import CopilotChat from '@/components/chat/CopilotChat';
import ClientChat from '@/components/chat/ClientChat';
import SummaryTab from '@/components/dashboard/SummaryTab';
import PlanTab from '@/components/dashboard/PlanTab';
import ProtocolTab from '@/components/dashboard/ProtocolTab';
import LabsTab from '@/components/dashboard/LabsTab';
import NotesTab from '@/components/dashboard/NotesTab';

// Import mock data
import {
  mockPatient,
  mockDayViewData,
  mockScheduleEvents,
  mockProtocol,
  mockActivityItems,
  mockMetrics,
  mockInsights,
  mockBiomarkerStats
} from '@/data/mockData';

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
          <TabsContent value="summary">
            <SummaryTab 
              metrics={mockMetrics}
              biomarkerStats={mockBiomarkerStats}
              activityItems={mockActivityItems}
              insights={mockInsights}
            />
          </TabsContent>
          
          {/* Protocol Tab */}
          <TabsContent value="protocol">
            <ProtocolTab />
          </TabsContent>
          
          {/* Plan Tab */}
          <TabsContent value="plan">
            <PlanTab
              dayViewData={mockDayViewData}
              scheduleEvents={mockScheduleEvents}
              currentDate={currentDate}
              plannerView={plannerView}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onAddEvent={handleAddEvent}
              onViewChange={handleViewChange}
            />
          </TabsContent>
          
          {/* Labs Tab */}
          <TabsContent value="labs">
            <LabsTab />
          </TabsContent>
          
          {/* Notes Tab */}
          <TabsContent value="notes">
            <NotesTab />
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
