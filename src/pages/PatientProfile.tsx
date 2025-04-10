
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
  { name: "Vitamin D", value: "28 ng/mL", status: "In Range" },
  { name: "Iron", value: "95 μg/dL", status: "Optimal" },
  { name: "Hemoglobin A1C", value: "5.4%", status: "Optimal" },
  { name: "TSH", value: "2.8 mIU/L", status: "In Range" },
  { name: "Total Cholesterol", value: "210 mg/dL", status: "Out of Range" },
];

// Mock documents data
const mockDocuments = [
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

const PatientProfile = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const [activeTab, setActiveTab] = useState("Summary");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [activeDocCategory, setActiveDocCategory] = useState("All Files");
  
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

  const renderTabContent = () => {
    switch (activeTab) {
      case "Summary":
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Patient Insights</h2>
              <InsightCards insights={mockInsights} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Patient Summary</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Age</h3>
                    <p className="text-gray-800">{patient.birthdate ? new Date().getFullYear() - new Date(patient.birthdate).getFullYear() : "Unknown"} years</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Contact</h3>
                    <p className="text-gray-800">{patient.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Last Visit</h3>
                    <p className="text-gray-800">March 15, 2025</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Next Appointment</h3>
                    <p className="text-gray-800">April 22, 2025</p>
                  </div>
                </div>
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
        );
      case "Plan":
        return (
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
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="text-sm text-gray-500">Average Sleep Duration</div>
                  <div className="text-2xl font-bold">7h 12m</div>
                  <div className="text-xs text-green-600 flex items-center">
                    <span>↑ 18min</span>
                    <span className="ml-1">vs. last month</span>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="text-sm text-gray-500">Deep Sleep</div>
                  <div className="text-2xl font-bold">1h 48m</div>
                  <div className="text-xs text-green-600 flex items-center">
                    <span>↑ 22min</span>
                    <span className="ml-1">vs. last month</span>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="text-sm text-gray-500">Sleep Latency</div>
                  <div className="text-2xl font-bold">14 min</div>
                  <div className="text-xs text-green-600 flex items-center">
                    <span>↓ 8min</span>
                    <span className="ml-1">vs. last month</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "Labs":
        return (
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
                {mockLabResults.map((lab, index) => (
                  <LabResultItem 
                    key={index}
                    name={lab.name}
                    value={lab.value}
                    status={lab.status as "Optimal" | "In Range" | "Out of Range"}
                  />
                ))}
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
