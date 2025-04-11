import React, { useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import PatientHeader from "@/components/patient/PatientHeader";
import PatientTabs from "@/components/navigation/PatientTabs";
import { Note } from "@/types/notes";
import { NotesList } from "@/components/notes/NotesList";
import MetricsOverview from "@/components/metrics/MetricsOverview";
import LabResultItem from "@/components/labs/LabResultItem";
import DocumentManager from "@/components/documents/DocumentManager";
import PatientGoals from "@/components/goals/PatientGoals";
import InsightCards, { Insight } from "@/components/insights/InsightCards";
import ActivityFeed, { ActivityItem } from "@/components/activity/ActivityFeed";
import BiomarkerQuickFilters from "@/components/biomarkers/BiomarkerQuickFilters";
import BiomarkerSummary from "@/components/biomarkers/BiomarkerSummary";
import { Document } from "@/types/documents";
import SchedulePlanner from "@/components/planner/SchedulePlanner";
import MetricDetailDrawer from "@/components/metrics/MetricDetailDrawer";
import { format, addDays } from 'date-fns';
import { ThermometerSnowflake, Moon, Activity, Heart } from "lucide-react";

// Mock patient data
const mockPatients = {
  "1": {
    id: "1",
    name: "Anni Roseboro",
    email: "jordanroseboro@yahoo.com",
    birthdate: "1985-04-15",
  },
  "2": {
    id: "2",
    name: "Jordan Roseboro",
    email: "jordantroseboro@gmail.com",
    birthdate: "1990-08-22",
  },
  "3": {
    id: "3",
    name: "Konstantin Rolf",
    email: "konstantin.rolf@gmail.com",
    birthdate: "1978-11-30",
  },
  "4": {
    id: "4",
    name: "Emma Thompson",
    email: "emma.thompson@gmail.com",
    birthdate: "1982-03-10",
  },
  "5": {
    id: "5",
    name: "Michael Chen",
    email: "michael.chen@outlook.com",
    birthdate: "1995-06-18",
  },
  "6": {
    id: "6",
    name: "Sarah Johnson",
    email: "sarah.johnson@doctor.com",
    birthdate: "1988-09-05",
  }
};

// Mock notes data
const mockNotes: Note[] = [
  {
    id: "1",
    title: "Initial Consultation",
    content: "Patient reports feeling fatigued for the past 3 months. Sleep patterns irregular. Recommended sleep study and basic blood panel.",
    createdAt: "2025-03-15T10:30:00Z",
    createdBy: "Dr. Smith",
    updatedAt: "2025-03-15T10:30:00Z",
    patientId: "1",
    tags: ["Sleep", "Fatigue"],
    status: "active",
    followUp: "2025-04-15T10:30:00Z"
  },
  {
    id: "2",
    title: "Lab Results Review",
    content: "Vitamin D levels low at 18 ng/mL. Iron within normal range. Recommended Vitamin D supplementation 5000 IU daily.",
    createdAt: "2025-03-20T14:15:00Z",
    createdBy: "Dr. Smith",
    updatedAt: "2025-03-20T14:15:00Z",
    patientId: "1",
    tags: ["Lab Results", "Vitamin D"],
    status: "active",
    followUp: "2025-05-20T14:15:00Z"
  }
];

// Mock lab results
const mockLabResults = [
  { id: "1", name: "Vitamin D", value: "28 ng/mL", status: "In Range" },
  { id: "2", name: "Iron", value: "95 μg/dL", status: "Optimal" },
  { id: "3", name: "Hemoglobin A1C", value: "5.4%", status: "Optimal" },
  { id: "4", name: "TSH", value: "2.8 mIU/L", status: "In Range" },
  { id: "5", name: "Total Cholesterol", value: "210 mg/dL", status: "Out of Range" },
];

// Mock documents data
const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Blood Test Results - March 2025",
    type: "PDF",
    category: "labs",
    size: "1.2 MB",
    date: "2025-03-15"
  },
  {
    id: "2",
    name: "Sleep Study Report",
    type: "PDF",
    category: "imaging",
    size: "3.5 MB",
    date: "2025-02-28"
  },
  {
    id: "3",
    name: "Body Composition Analysis",
    type: "IMAGE",
    category: "body",
    size: "850 KB",
    date: "2025-01-15"
  },
  {
    id: "4",
    name: "Nutrition Plan",
    type: "DOC",
    category: "other",
    size: "540 KB",
    date: "2025-03-22"
  }
];

// Mock insights
const mockInsights: Insight[] = [
  {
    id: "1",
    title: "Sleep quality improving",
    description: "Average sleep score increased by 12% in the last month",
    trend: "up",
    percentage: 12,
    timeframe: "Last 30 days",
    chartData: [
      { date: "Week 1", value: 65 },
      { date: "Week 2", value: 68 },
      { date: "Week 3", value: 72 },
      { date: "Week 4", value: 76 }
    ],
    type: "metric"
  },
  {
    id: "2",
    title: "Vitamin D levels normalized",
    description: "Levels have reached optimal range after supplementation",
    trend: "up",
    percentage: 32,
    timeframe: "Last 60 days",
    chartData: [
      { date: "Jan", value: 18 },
      { date: "Feb", value: 22 },
      { date: "Mar", value: 28 },
      { date: "Apr", value: 35 }
    ],
    type: "biomarker"
  }
];

// Mock activity feed
const mockActivities: ActivityItem[] = [
  {
    id: "1",
    type: "biomarker",
    title: "Vitamin D Levels Improved",
    description: "Vitamin D levels are now in optimal range after 3 months of supplementation.",
    date: "Apr 8, 2025",
    status: "improved",
    details: {
      biomarkers: [
        { id: "1", name: "Vitamin D", value: "38 ng/mL", status: "Optimal" },
        { id: "2", name: "Vitamin D (Previous)", value: "22 ng/mL", status: "In Range" }
      ]
    }
  },
  {
    id: "2",
    type: "document",
    title: "New Lab Results",
    description: "Comprehensive blood panel results uploaded.",
    date: "Apr 5, 2025",
    link: "/documents/lab-123"
  },
  {
    id: "3",
    type: "appointment",
    title: "Consultation Scheduled",
    description: "30-minute follow-up consultation.",
    date: "Apr 2, 2025",
    status: "upcoming"
  },
  {
    id: "4",
    type: "note",
    title: "Protocol Update",
    description: "Sleep protocol updated with new supplement recommendations.",
    date: "Mar 28, 2025"
  }
];

// Mock schedule events
const mockEvents = [
  {
    id: "1",
    title: "Sleep Window",
    start: "10:30 PM",
    end: "6:30 AM",
    type: "sleep"
  },
  {
    id: "2",
    title: "Morning Supplements",
    start: "7:00 AM",
    end: "7:15 AM",
    type: "supplement"
  },
  {
    id: "3",
    title: "HIIT Workout",
    start: "5:00 PM",
    end: "5:45 PM",
    type: "workout"
  },
  {
    id: "4",
    title: "Doctor Follow-up",
    start: "2:00 PM",
    end: "2:45 PM",
    type: "appointment"
  }
];

const PatientProfile = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const [activeTab, setActiveTab] = useState("Summary");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [activeDocCategory, setActiveDocCategory] = useState("All Files");
  
  // States for additional components
  const [calendarView, setCalendarView] = useState<'day' | 'week' | 'month'>('day');
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [isMetricDrawerOpen, setIsMetricDrawerOpen] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<{name: string, value: string | number, unit?: string, type?: string} | null>(null);
  const [biomarkerFilter, setBiomarkerFilter] = useState<string>("");
  
  // Get patient data
  const patient = patientId && mockPatients[patientId] 
    ? mockPatients[patientId] 
    : { name: "Unknown Patient", email: "unknown@example.com" };
  
  // Filter notes for this patient
  const patientNotes = mockNotes.filter(note => note.patientId === patientId);

  const tabs = ["Summary", "Plan", "Metrics", "Labs", "Documents", "Notes"];

  const handleSelectNote = (note: Note) => {
    setSelectedNote(note);
  };

  const handleDocCategoryChange = (category: string) => {
    setActiveDocCategory(category);
  };

  const handleFileUpload = () => {
    console.log("File upload triggered");
    // Implementation would go here
  };

  const handleCalendarPrevious = () => {
    setCalendarDate(prev => addDays(prev, -7));
  };

  const handleCalendarNext = () => {
    setCalendarDate(prev => addDays(prev, 7));
  };

  const handleAddEvent = () => {
    console.log("Add event triggered");
    // Implementation would go here
  };

  const handleMetricClick = (metric: {name: string, value: string | number, unit?: string, type?: string}) => {
    setSelectedMetric(metric);
    setIsMetricDrawerOpen(true);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Summary":
        return (
          <div className="space-y-6">
            <BiomarkerQuickFilters 
              outOfRange={5} 
              inRange={12} 
              optimal={8}
              labResults={mockLabResults}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <ActivityFeed 
                  activities={mockActivities}
                  showSeeMore={true}
                  onSeeMore={() => console.log("See more activities clicked")}
                />
              </div>
              
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-xl font-semibold mb-4">Patient Insights</h2>
                  <InsightCards insights={mockInsights} />
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow">
                  <PatientGoals 
                    doctor={{
                      name: "Lisa Cooper",
                      title: "Health Coach",
                    }}
                    date="Updated Mar 22, 2025"
                    goals="Focus on improving sleep quality with consistent sleep/wake times. Continue vitamin D supplementation and increase daily movement to 8,000 steps minimum."
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case "Plan":
        return (
          <div className="space-y-6">
            <SchedulePlanner 
              currentDate={calendarDate}
              events={mockEvents}
              onPrevious={handleCalendarPrevious}
              onNext={handleCalendarNext}
              onAddEvent={handleAddEvent}
              view={calendarView}
              onViewChange={setCalendarView}
              onEventClick={(event) => console.log("Event clicked:", event)}
            />
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Treatment Plan</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Current Protocols</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">Sleep Optimization Protocol</div>
                        <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Active</div>
                      </div>
                    </div>
                    <div className="p-4 space-y-3">
                      <div>
                        <div className="text-sm font-medium">Daily Steps</div>
                        <div className="text-sm text-gray-600">8,000+ steps daily</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Supplement 1</div>
                        <div className="text-sm text-gray-600">Magnesium Glycinate - 400mg before bed</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Supplement 2</div>
                        <div className="text-sm text-gray-600">Vitamin D3 - 5,000 IU with breakfast</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Sleep Schedule</div>
                        <div className="text-sm text-gray-600">10:30pm - 6:30am, 7 days/week</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Progress Notes</h3>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium">Week 4 Check-in</div>
                        <div className="text-xs text-gray-500">Apr 5, 2025</div>
                      </div>
                      <p className="text-sm text-gray-700">Patient reports improved energy levels and fewer morning headaches. Sleep tracking shows 32% increase in deep sleep. Continue current protocol with no changes.</p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium">Week 2 Check-in</div>
                        <div className="text-xs text-gray-500">Mar 22, 2025</div>
                      </div>
                      <p className="text-sm text-gray-700">Sleep latency decreased from 45 min to 22 min on average. Still experiencing early morning waking. Added magnesium supplementation to protocol.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "Metrics":
        return (
          <div className="space-y-6">
            <MetricsOverview metrics={{
              steps: 8450,
              weight: 165,
              heartRate: 68
            }} />
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Sleep Metrics</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div 
                  className="bg-gray-50 p-4 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleMetricClick({name: "Sleep Duration", value: "7h 12m", type: "sleep"})}
                >
                  <div className="text-sm text-gray-500">Average Sleep Duration</div>
                  <div className="text-2xl font-bold">7h 12m</div>
                  <div className="text-xs text-green-600 flex items-center">
                    <span>↑ 18min</span>
                    <span className="ml-1">vs. last month</span>
                  </div>
                </div>
                <div 
                  className="bg-gray-50 p-4 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleMetricClick({name: "Deep Sleep", value: "1h 48m", type: "sleep"})}
                >
                  <div className="text-sm text-gray-500">Deep Sleep</div>
                  <div className="text-2xl font-bold">1h 48m</div>
                  <div className="text-xs text-green-600 flex items-center">
                    <span>↑ 22min</span>
                    <span className="ml-1">vs. last month</span>
                  </div>
                </div>
                <div 
                  className="bg-gray-50 p-4 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleMetricClick({name: "Sleep Latency", value: "14 min", type: "sleep"})}
                >
                  <div className="text-sm text-gray-500">Sleep Latency</div>
                  <div className="text-2xl font-bold">14 min</div>
                  <div className="text-xs text-green-600 flex items-center">
                    <span>↓ 8min</span>
                    <span className="ml-1">vs. last month</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Activity Metrics</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div 
                  className="bg-gray-50 p-4 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleMetricClick({name: "VO2 Max", value: "45 ml/kg/min", type: "activity"})}
                >
                  <div className="text-sm text-gray-500">VO2 Max</div>
                  <div className="text-2xl font-bold">45 ml/kg/min</div>
                  <div className="text-xs text-green-600 flex items-center">
                    <span>↑ 12%</span>
                    <span className="ml-1">vs. last month</span>
                  </div>
                </div>
                <div 
                  className="bg-gray-50 p-4 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleMetricClick({name: "Average Steps", value: "8,450", type: "activity"})}
                >
                  <div className="text-sm text-gray-500">Average Steps</div>
                  <div className="text-2xl font-bold">8,450</div>
                  <div className="text-xs text-green-600 flex items-center">
                    <span>↑ 1,250</span>
                    <span className="ml-1">vs. last month</span>
                  </div>
                </div>
                <div 
                  className="bg-gray-50 p-4 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleMetricClick({name: "Resting Heart Rate", value: "68 bpm", type: "heart"})}
                >
                  <div className="text-sm text-gray-500">Resting Heart Rate</div>
                  <div className="text-2xl font-bold">68 bpm</div>
                  <div className="text-xs text-green-600 flex items-center">
                    <span>↓ 3 bpm</span>
                    <span className="ml-1">vs. last month</span>
                  </div>
                </div>
              </div>
            </div>
            
            <MetricDetailDrawer
              isOpen={isMetricDrawerOpen}
              onClose={() => setIsMetricDrawerOpen(false)}
              metric={selectedMetric}
            />
          </div>
        );
      case "Labs":
        return (
          <div className="space-y-6">
            <BiomarkerSummary
              optimal={8}
              inRange={12}
              outOfRange={5}
              onFilterChange={setBiomarkerFilter}
              activeFilter={biomarkerFilter}
            />
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Lab Results</h2>
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row justify-between mb-4">
                  <div className="mb-2 md:mb-0">
                    <div className="text-sm text-gray-500">Latest Results</div>
                    <div className="font-medium">Comprehensive Metabolic Panel</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Collection Date</div>
                    <div>March 15, 2025</div>
                  </div>
                </div>
                
                <div className="border-t border-b">
                  {mockLabResults.map((lab) => (
                    <div 
                      key={lab.id}
                      onClick={() => handleMetricClick({
                        name: lab.name,
                        value: lab.value,
                        type: "biomarker"
                      })}
                      className="cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <LabResultItem 
                        name={lab.name}
                        value={lab.value}
                        status={lab.status as "Optimal" | "In Range" | "Out of Range"}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case "Documents":
        return (
          <DocumentManager
            documents={mockDocuments}
            activeCategory={activeDocCategory}
            onCategoryChange={handleDocCategoryChange}
            onUpload={handleFileUpload}
          />
        );
      case "Notes":
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Patient Notes</h2>
            {patientNotes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <NotesList 
                    notes={patientNotes} 
                    onSelectNote={handleSelectNote} 
                    selectedNoteId={selectedNote?.id}
                  />
                </div>
                <div>
                  {selectedNote ? (
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold">{selectedNote.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">Created by {selectedNote.createdBy} on {new Date(selectedNote.createdAt).toLocaleDateString()}</p>
                      <div className="mt-3">
                        <p>{selectedNote.content}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="border rounded-lg p-4 text-center text-gray-500">
                      Select a note to view details
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-gray-600">No notes found for this patient.</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <PatientHeader 
          patient={patient}
          activeTab={activeTab}
        />
        <PatientTabs 
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
        {renderTabContent()}
      </div>
    </DashboardLayout>
  );
};

export default PatientProfile;
