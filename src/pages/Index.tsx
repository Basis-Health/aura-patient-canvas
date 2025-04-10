import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PatientHeader from '@/components/patient/PatientHeader';
import PatientTabs from '@/components/navigation/PatientTabs';
import MetricsOverview from '@/components/metrics/MetricsOverview';
import DocumentManager from '@/components/documents/DocumentManager';
import BiomarkerSummary from '@/components/biomarkers/BiomarkerSummary';
import LabResultItem from '@/components/labs/LabResultItem';
import LineChart from '@/components/charts/LineChart';
import BiologicalAgeCard from '@/components/biomarkers/BiologicalAgeCard';
import BiomarkersVisualizer from '@/components/biomarkers/BiomarkersVisualizer';
import PatientGoals from '@/components/goals/PatientGoals';
import SchedulePlanner from '@/components/planner/SchedulePlanner';

// Mock data for the demo
const mockPatient = {
  name: "George",
  email: "georgeallidis@gmail.com",
  location: "Asia/Nicosia",
  birthdate: "Jun 14 1985",
  avatarUrl: "/lovable-uploads/1ca07b90-534f-4849-83c5-906dee56f04c.png"
};

const mockMetrics = {
  steps: 1503,
  weight: 189,
  heartRate: 59
};

const mockDocuments = [
  { id: "1", name: "Blood Test Results.pdf", type: "PDF", category: "labs", size: "1.18 MB", date: "Dec 22, 2023" },
  { id: "2", name: "MRI Scan.png", type: "IMAGE", category: "imaging", size: "4.35 MB", date: "Nov 15, 2023" },
  { id: "3", name: "Body Composition Analysis.xlsx", type: "SPREADSHEET", category: "body", size: "869.14 KB", date: "Oct 8, 2023" },
  { id: "4", name: "Diet Recommendations.docx", type: "DOC", category: "other", size: "546.88 KB", date: "Dec 5, 2023" },
  { id: "5", name: "X-Ray Results.jpg", type: "IMAGE", category: "imaging", size: "3.24 MB", date: "Sep 12, 2023" },
  { id: "6", name: "Cholesterol Test.pdf", type: "PDF", category: "labs", size: "761.72 KB", date: "Dec 28, 2023" },
  { id: "7", name: "Exercise Program.pdf", type: "PDF", category: "body", size: "1.29 MB", date: "Nov 19, 2023" },
  { id: "8", name: "CT Scan Results.png", type: "IMAGE", category: "imaging", size: "4.96 MB", date: "Aug 23, 2023" },
] as const;

const mockLabResults = [
  { id: "1", name: "Thyroid Stimulating Hormone (TSH)", value: "3.42 mIU/L", status: "In Range" },
  { id: "2", name: "Free T4 (Thyroxine)", value: "16.7 pg/mL", status: "Out of Range" },
  { id: "3", name: "Total Cholesterol", value: "224.0 mg/dL", status: "Out of Range" },
  { id: "4", name: "HDL Cholesterol", value: "57.6 mg/dL", status: "In Range" },
  { id: "5", name: "Triglycerides", value: "81.0 mg/dL", status: "Optimal" },
  { id: "6", name: "LDL Cholesterol", value: "150.2 mg/dL", status: "Out of Range" },
  { id: "7", name: "Homocysteine", value: "7.20 μmol/L", status: "In Range" },
];

const mockChartData = [
  { date: "Jan 14 2021", value: 2 },
  { date: "Sep 8 2022", value: 4 },
  { date: "Mar 15 2025", value: 3.4 },
];

const mockEvents = [
  { id: "1", title: "Sleep", start: "04:16 AM", end: "10:02 AM", type: "Sleep" },
  { id: "2", title: "HIIT", start: "09:30 AM", end: "10:00 AM", type: "HIIT" },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState("Summary");
  const [activeDocumentCategory, setActiveDocumentCategory] = useState("All Files");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarView, setCalendarView] = useState<'day' | 'week' | 'month'>('week');
  
  const handleDocumentUpload = () => {
    console.log("Document upload initiated");
  };
  
  const handlePreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };
  
  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };
  
  const handleAddEvent = () => {
    console.log("Add event clicked");
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <PatientHeader 
            patient={mockPatient}
          />
          
          <PatientTabs 
            tabs={["Summary", "Plan", "Metrics", "Labs"]}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
          
          <MetricsOverview metrics={mockMetrics} />
          
          {activeTab === "Summary" && (
            <div className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <BiomarkersVisualizer
                    total={345}
                    outOfRange={12}
                    inRange={71}
                  />
                  
                  <PatientGoals
                    doctor={{
                      name: "Anant Vingamore, MD",
                      title: "Supervising Longevity Physician"
                    }}
                    date="July 1, 2024"
                    goals="Hello Jacob, I've prioritized these specific health goals to optimize your muscle tone and physical performance. Feel free to book an intro call if you have any questions."
                  />
                </div>
                
                <div className="space-y-6">
                  <BiologicalAgeCard
                    biologicalAge={26}
                    chronologicalAge={28.5}
                    difference={2.5}
                  />
                  
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="mb-4">
                      <div className="text-sm font-medium text-gray-400">Dr. Anant Vingamoor, MD</div>
                      <div className="text-xs text-gray-500">Supervising Longevity Physician</div>
                    </div>
                    
                    <div className="bg-gray-700 rounded-lg p-3 mb-3">
                      <div className="text-white text-sm">Hi Dr. Vingamoor. What can I do to reduce my cortisol?</div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <div className="text-white text-xs">Cortisol</div>
                      <div className="bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full">Out of range</div>
                    </div>
                    
                    <div className="text-white/70 text-xs mt-3">
                      For sure! I'm here to answer any questions.
                    </div>
                    
                    <div className="text-white/70 text-xs mt-2">
                      Cortisol is a hormone that helps you respond to stress. High cortisol can be a sign of too much stress. To reduce your stress levels, try following this protocol:
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "Metrics" && (
            <div className="mt-6">
              <div className="mb-6">
                <div className="text-xl font-semibold mb-4">39 METRICS</div>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-6 h-6 flex items-center">
                      <div className="w-2 h-full bg-blue-500 rounded-sm"></div>
                    </div>
                    <span className="ml-2 text-gray-700">9 In Range</span>
                    <div className="ml-4 flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full" style={{ width: "60%" }}></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-6 h-6 flex items-center">
                      <div className="w-2 h-full bg-orange-500 rounded-sm"></div>
                    </div>
                    <span className="ml-2 text-gray-700">6 Out of Range</span>
                    <div className="ml-4 flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                      <div className="bg-orange-500 h-full" style={{ width: "40%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div className="metric-card">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-500">Today</span>
                    <div className="bg-black rounded p-0.5">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M3 7h18M3 11h18M3 15h10" stroke="white" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium text-gray-500">Vo2 Max</h4>
                    <div className="text-2xl font-bold">45</div>
                  </div>
                </div>
                
                <div className="metric-card">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-500">Today</span>
                    <div className="bg-blue-500 rounded p-0.5">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M12 20V4M4 12h16" stroke="white" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium text-gray-500">Water</h4>
                    <div className="text-2xl font-bold">0.4 L</div>
                  </div>
                </div>
                
                <div className="metric-card">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-500">Today</span>
                    <div className="bg-black rounded p-0.5">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M12 20V4M4 12h16" stroke="white" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium text-gray-500">Sleep Duration</h4>
                    <div className="text-2xl font-bold text-orange-500">5h 46m</div>
                  </div>
                </div>
                
                {/* More metrics would go here */}
              </div>
            </div>
          )}
          
          {activeTab === "Labs" && (
            <div className="mt-6">
              <BiomarkerSummary
                optimal={4}
                inRange={22}
                outOfRange={10}
              />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  {mockLabResults.map(result => (
                    <LabResultItem 
                      key={result.id}
                      name={result.name}
                      value={result.value}
                      status={result.status as any}
                    />
                  ))}
                </div>
                
                <div>
                  <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
                    <h4 className="text-lg font-medium mb-4">Thyroid Stimulating Hormone (TSH)</h4>
                    <LineChart data={mockChartData} height={200} />
                    
                    <div className="flex justify-between mt-4">
                      <div className="text-xs text-gray-500">Below Range</div>
                      <div className="text-xs text-gray-500">In Range</div>
                      <div className="text-xs text-gray-500">Optimal</div>
                      <div className="text-xs text-gray-500">In Range</div>
                      <div className="text-xs text-gray-500">Above Range</div>
                    </div>
                    <div className="h-2 flex mt-1 rounded-full overflow-hidden">
                      <div className="bg-orange-500 w-1/5"></div>
                      <div className="bg-blue-500 w-1/5"></div>
                      <div className="bg-emerald-500 w-1/5"></div>
                      <div className="bg-blue-500 w-1/5 relative">
                        <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-white bg-blue-500"></div>
                      </div>
                      <div className="bg-orange-500 w-1/5"></div>
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-gray-500">
                      <div>1 mIU/L</div>
                      <div>2 mIU/L</div>
                      <div>3 mIU/L</div>
                      <div>5 mIU/L</div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h4 className="text-lg font-medium mb-2">ABOUT THYROID STIMULATING HORMONE (TSH)</h4>
                    <p className="text-gray-700 text-sm">
                      Thyroid-Stimulating Hormone (TSH) regulates thyroid function, which plays a key role in metabolism. Abnormal TSH levels can indicate thyroid dysfunction, affecting metabolic health and longevity. Monitoring TSH helps ensure optimal thyroid function.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "Plan" && (
            <div className="mt-6">
              <SchedulePlanner
                currentDate={currentDate}
                events={mockEvents}
                onPrevious={handlePreviousWeek}
                onNext={handleNextWeek}
                onAddEvent={handleAddEvent}
                view={calendarView}
                onViewChange={setCalendarView}
              />
            </div>
          )}
        </div>
        
        {/* Document Management Example */}
        <div className="mt-8">
          <DocumentManager
            documents={mockDocuments}
            activeCategory={activeDocumentCategory}
            onCategoryChange={setActiveDocumentCategory}
            onUpload={handleDocumentUpload}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
