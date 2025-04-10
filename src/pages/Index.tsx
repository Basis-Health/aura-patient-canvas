
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
import BiomarkerQuickFilters from '@/components/biomarkers/BiomarkerQuickFilters';
import SchedulePlanner from '@/components/planner/SchedulePlanner';
import PatientProtocol from '@/components/protocol/PatientProtocol';
import ActivityFeed from '@/components/activity/ActivityFeed';
import InsightCards from '@/components/insights/InsightCards';
import { Insight } from '@/components/insights/InsightCards';
import { ActivityItem } from '@/components/activity/ActivityFeed';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ProtocolDrawer from '@/components/planner/ProtocolDrawer';
import EventDetailDrawer from '@/components/planner/EventDetailDrawer';
import MetricDetailDrawer from '@/components/metrics/MetricDetailDrawer';
import DayViewGraph from '@/components/planner/DayViewGraph';
import ActivityDetailDrawer from '@/components/activity/ActivityDetailDrawer';

// Mock data for the demo
const mockPatient = {
  name: "George Georgallides",
  age: 30,
  email: "georgeallidis@gmail.com",
  location: "Asia/Nicosia",
  birthdate: "April 15, 1995", // Added the missing birthdate property
  avatarUrl: "/lovable-uploads/1ca07b90-534f-4849-83c5-906dee56f04c.png"
};

const mockMetrics = {
  steps: 1503,
  weight: 189,
  heartRate: 59
};

interface Document {
  id: string;
  name: string;
  type: "PDF" | "IMAGE" | "SPREADSHEET" | "DOC";
  category: "labs" | "imaging" | "body" | "other";
  size: string;
  date: string;
}

const mockDocuments: Document[] = [
  { id: "1", name: "Blood Test Results.pdf", type: "PDF", category: "labs", size: "1.18 MB", date: "Dec 22, 2023" },
  { id: "2", name: "MRI Scan.png", type: "IMAGE", category: "imaging", size: "4.35 MB", date: "Nov 15, 2023" },
  { id: "3", name: "Body Composition Analysis.xlsx", type: "SPREADSHEET", category: "body", size: "869.14 KB", date: "Oct 8, 2023" },
  { id: "4", name: "Diet Recommendations.docx", type: "DOC", category: "other", size: "546.88 KB", date: "Dec 5, 2023" },
  { id: "5", name: "X-Ray Results.jpg", type: "IMAGE", category: "imaging", size: "3.24 MB", date: "Sep 12, 2023" },
  { id: "6", name: "Cholesterol Test.pdf", type: "PDF", category: "labs", size: "761.72 KB", date: "Dec 28, 2023" },
  { id: "7", name: "Exercise Program.pdf", type: "PDF", category: "body", size: "1.29 MB", date: "Nov 19, 2023" },
  { id: "8", name: "CT Scan Results.png", type: "IMAGE", category: "imaging", size: "4.96 MB", date: "Aug 23, 2023" },
];

const mockLabResults = [
  { id: "1", name: "Thyroid Stimulating Hormone (TSH)", value: "3.42 mIU/L", status: "In Range" as const },
  { id: "2", name: "Free T4 (Thyroxine)", value: "16.7 pg/mL", status: "Out of Range" as const },
  { id: "3", name: "Total Cholesterol", value: "224.0 mg/dL", status: "Out of Range" as const },
  { id: "4", name: "HDL Cholesterol", value: "57.6 mg/dL", status: "In Range" as const },
  { id: "5", name: "Triglycerides", value: "81.0 mg/dL", status: "Optimal" as const },
  { id: "6", name: "LDL Cholesterol", value: "150.2 mg/dL", status: "Out of Range" as const },
  { id: "7", name: "Homocysteine", value: "7.20 μmol/L", status: "In Range" as const },
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

const mockProtocol = {
  id: "1",
  name: "Metabolic Health Protocol",
  startDate: "Feb 12, 2025",
  adherence: 76,
  status: 'active' as const,
  items: [
    {
      id: "1",
      type: 'supplement' as const,
      name: "Berberine 500mg",
      schedule: "3x daily with meals",
      adherence: 85,
      targetBiomarkers: ["HbA1c", "Fasting Glucose", "Insulin"],
      impact: 'positive' as const
    },
    {
      id: "2",
      type: 'exercise' as const,
      name: "Zone 2 Cardio",
      schedule: "30 min, 3x weekly",
      adherence: 45,
      targetBiomarkers: ["VO2 Max", "Resting Heart Rate"],
      impact: 'positive' as const
    },
    {
      id: "3",
      type: 'lifestyle' as const,
      name: "Sleep optimization",
      schedule: "8hrs nightly, 10pm-6am",
      adherence: 62,
      targetBiomarkers: ["Cortisol", "HRV"],
      impact: 'neutral' as const
    },
    {
      id: "4",
      type: 'diet' as const,
      name: "Low carb high protein",
      schedule: "Daily",
      adherence: 91,
      targetBiomarkers: ["LDL", "HDL", "Triglycerides"],
      impact: 'positive' as const
    }
  ]
};

const mockActivities: ActivityItem[] = [
  {
    id: "1",
    type: 'document',
    title: "New Blood Test Results",
    description: "Comprehensive metabolic panel uploaded",
    date: "Apr 9, 2025",
    link: "/documents/1"
  },
  {
    id: "2",
    type: 'biomarker',
    title: "Out of Range Biomarkers",
    description: "2 biomarkers are out of range",
    date: "Apr 8, 2025",
    status: "warning",
    details: {
      biomarkers: [
        { 
          id: "1", 
          name: "LDL Cholesterol", 
          value: "150.2 mg/dL", 
          status: "Out of Range" 
        },
        { 
          id: "2", 
          name: "Free T4 (Thyroxine)", 
          value: "16.7 pg/mL", 
          status: "Out of Range" 
        }
      ]
    }
  },
  {
    id: "3",
    type: 'note',
    title: "Note from Dr. Anant",
    description: "Recommendations for adjusting protocol",
    date: "Apr 6, 2025"
  },
  {
    id: "4",
    type: 'appointment',
    title: "Appointment Scheduled",
    description: "Follow-up video call on April 23, 2:00 PM",
    date: "Apr 5, 2025"
  },
  {
    id: "5",
    type: 'protocol',
    title: "Protocol Updated",
    description: "Added Magnesium Glycinate 400mg before bed",
    date: "Apr 2, 2025"
  }
];

const mockInsights: Insight[] = [
  {
    id: "1",
    title: "Sleep Duration Trend",
    description: "George's sleep duration is trending upward over the last 30 days",
    trend: "up",
    percentage: 12,
    timeframe: "Last 30 days",
    type: "metric",
    chartData: [
      { date: "Mar 10", value: 6.2 },
      { date: "Mar 15", value: 6.4 },
      { date: "Mar 20", value: 6.8 },
      { date: "Mar 25", value: 7.1 },
      { date: "Mar 30", value: 7.3 },
      { date: "Apr 5", value: 7.6 },
      { date: "Apr 10", value: 7.8 },
    ]
  },
  {
    id: "2",
    title: "Steps Decreasing",
    description: "Steps are trending downward by 17% over the last 90 days",
    trend: "down",
    percentage: 17,
    timeframe: "Last 90 days",
    type: "metric",
    chartData: [
      { date: "Jan 10", value: 9500 },
      { date: "Jan 25", value: 9100 },
      { date: "Feb 10", value: 8800 },
      { date: "Feb 25", value: 8200 },
      { date: "Mar 10", value: 7900 },
      { date: "Mar 25", value: 7600 },
      { date: "Apr 10", value: 7100 },
    ]
  },
  {
    id: "3",
    title: "Protocol Adherence",
    description: "Berberine supplementation adherence is improving",
    trend: "up",
    timeframe: "Last 45 days",
    type: "adherence",
    chartData: [
      { date: "Feb 25", value: 65 },
      { date: "Mar 5", value: 70 },
      { date: "Mar 15", value: 72 },
      { date: "Mar 25", value: 78 },
      { date: "Apr 5", value: 82 },
      { date: "Apr 10", value: 85 },
    ]
  },
  {
    id: "4",
    title: "HbA1c Improvement",
    description: "HbA1c reduced from 5.9 to 5.6 in 3 months",
    trend: "down",
    timeframe: "Last 3 months",
    type: "biomarker",
    chartData: [
      { date: "Jan 10", value: 5.9 },
      { date: "Feb 10", value: 5.8 },
      { date: "Mar 10", value: 5.7 },
      { date: "Apr 10", value: 5.6 },
    ]
  }
];

const mockScores = {
  activity: 83,
  sleep: 76,
  readiness: 89,
  biologicalAge: 27
};

// Sample day view data
const mockDayViewData = {
  heartRate: [
    { time: "03:00 AM", value: 62 },
    { time: "06:00 AM", value: 58 },
    { time: "09:00 AM", value: 72 },
    { time: "12:00 PM", value: 85 },
    { time: "03:00 PM", value: 78 },
    { time: "06:00 PM", value: 76 },
    { time: "09:00 PM", value: 68 },
    { time: "12:00 AM", value: 60 },
  ],
  glucose: [
    { time: "03:00 AM", value: 82 },
    { time: "06:00 AM", value: 78 },
    { time: "09:00 AM", value: 95 },
    { time: "12:00 PM", value: 138 },
    { time: "03:00 PM", value: 110 },
    { time: "06:00 PM", value: 132 },
    { time: "09:00 PM", value: 105 },
    { time: "12:00 AM", value: 86 },
  ],
  circadianRhythm: [
    { time: "03:00 AM", value: 0.2 },
    { time: "06:00 AM", value: 0.4 },
    { time: "09:00 AM", value: 0.8 },
    { time: "12:00 PM", value: 1.0 },
    { time: "03:00 PM", value: 0.9 },
    { time: "06:00 PM", value: 0.7 },
    { time: "09:00 PM", value: 0.5 },
    { time: "12:00 AM", value: 0.3 },
  ],
  events: [
    { time: "04:16 AM", type: "sleep", label: "Sleep", duration: "5h 46m" },
    { time: "07:30 AM", type: "meal", label: "Breakfast", details: "Eggs, avocado toast" },
    { time: "09:30 AM", type: "workout", label: "HIIT", details: "30 min, 320 cal" },
    { time: "12:30 PM", type: "meal", label: "Lunch", details: "Chicken salad" },
    { time: "01:30 PM", type: "supplement", label: "Berberine", details: "500mg" },
    { time: "03:30 PM", type: "supplement", label: "Fish Oil", details: "1000mg" },
    { time: "06:30 PM", type: "meal", label: "Dinner", details: "Salmon, vegetables" },
    { time: "10:00 PM", type: "sleep", label: "Sleep prep", details: "Magnesium, reading" }
  ]
};

const Index = () => {
  const [activeTab, setActiveTab] = useState("Summary");
  const [activeDocumentCategory, setActiveDocumentCategory] = useState("All Files");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarView, setCalendarView] = useState<'day' | 'week' | 'month'>('week');
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isEventDrawerOpen, setIsEventDrawerOpen] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<any>(null);
  const [isMetricDrawerOpen, setIsMetricDrawerOpen] = useState(false);
  const [activeMetricFilter, setActiveMetricFilter] = useState<string | null>(null);
  const [isActivityDrawerOpen, setIsActivityDrawerOpen] = useState(false);
  
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

  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
    setIsEventDrawerOpen(true);
  };

  const handleMetricClick = (metric: any) => {
    setSelectedMetric(metric);
    setIsMetricDrawerOpen(true);
  };

  const handleSeeMoreActivities = () => {
    setIsActivityDrawerOpen(true);
  };

  // Filter metrics based on selected category
  const getFilteredMetrics = () => {
    if (!activeMetricFilter) return [
      { name: "VO2 Max", value: 45, category: "cardiovascular" },
      { name: "Water", value: "0.4", unit: "L", category: "metabolic" },
      { name: "Sleep Duration", value: "5h 46m", category: "sleep" },
      { name: "Resting Heart Rate", value: 59, category: "cardiovascular" },
      { name: "Blood Pressure", value: "120/80", category: "cardiovascular" },
      { name: "Steps", value: 7580, category: "activity" },
      { name: "Active Minutes", value: 32, category: "activity" },
      { name: "Glucose", value: 86, unit: "mg/dL", category: "metabolic" },
    ];

    return [
      { name: "VO2 Max", value: 45, category: "cardiovascular" },
      { name: "Water", value: "0.4", unit: "L", category: "metabolic" },
      { name: "Sleep Duration", value: "5h 46m", category: "sleep" },
      { name: "Resting Heart Rate", value: 59, category: "cardiovascular" },
      { name: "Blood Pressure", value: "120/80", category: "cardiovascular" },
      { name: "Steps", value: 7580, category: "activity" },
      { name: "Active Minutes", value: 32, category: "activity" },
      { name: "Glucose", value: 86, unit: "mg/dL", category: "metabolic" },
    ].filter(metric => metric.category === activeMetricFilter);
  };

  // Modified layout for the summary page
  const renderSummaryPage = () => {
    return (
      <>
        <div className="mt-6">
          <BiomarkerQuickFilters 
            outOfRange={3}
            inRange={22}
            optimal={5}
            labResults={mockLabResults}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <PatientProtocol protocol={mockProtocol} />
              
              <div className="space-y-6">
                <ActivityFeed 
                  activities={mockActivities.slice(0, 4)} 
                  showSeeMore 
                  onSeeMore={handleSeeMoreActivities}
                />
                <InsightCards insights={mockInsights} />
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-xs text-gray-500 mb-1">Activity Score</div>
                  <div className="text-2xl font-bold">{mockScores.activity}</div>
                  <div className="text-xs text-gray-500">Last 30 days</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-xs text-gray-500 mb-1">Sleep Score</div>
                  <div className="text-2xl font-bold">{mockScores.sleep}</div>
                  <div className="text-xs text-gray-500">Last 30 days</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-xs text-gray-500 mb-1">Readiness Score</div>
                  <div className="text-2xl font-bold">{mockScores.readiness}</div>
                  <div className="text-xs text-gray-500">Last 30 days</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-xs text-gray-500 mb-1">Biological Age</div>
                  <div className="text-2xl font-bold">{mockScores.biologicalAge}</div>
                  <div className="text-xs text-gray-500">3 yrs younger</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <ActivityDetailDrawer
          isOpen={isActivityDrawerOpen}
          onClose={() => setIsActivityDrawerOpen(false)}
          activities={mockActivities}
        />
      </>
    );
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <PatientHeader 
            patient={mockPatient}
          />
          
          <PatientTabs 
            tabs={["Summary", "Plan", "Metrics", "Labs", "Documents"]}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
          
          {activeTab === "Summary" && renderSummaryPage()}
          
          {activeTab === "Metrics" && (
            <div className="mt-6">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-xl font-semibold">Metrics</div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant={activeMetricFilter === 'cardiovascular' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => setActiveMetricFilter(activeMetricFilter === 'cardiovascular' ? null : 'cardiovascular')}
                    >
                      Cardiovascular
                    </Button>
                    <Button 
                      variant={activeMetricFilter === 'metabolic' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => setActiveMetricFilter(activeMetricFilter === 'metabolic' ? null : 'metabolic')}
                    >
                      Metabolic
                    </Button>
                    <Button 
                      variant={activeMetricFilter === 'activity' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => setActiveMetricFilter(activeMetricFilter === 'activity' ? null : 'activity')}
                    >
                      Activity
                    </Button>
                    <Button 
                      variant={activeMetricFilter === 'sleep' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => setActiveMetricFilter(activeMetricFilter === 'sleep' ? null : 'sleep')}
                    >
                      Sleep
                    </Button>
                  </div>
                </div>
                
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
                {getFilteredMetrics().map((metric, index) => (
                  <div 
                    key={index} 
                    className="metric-card bg-white p-4 rounded-lg border border-gray-200 cursor-pointer hover:border-blue-300 hover:shadow-sm transition-all"
                    onClick={() => handleMetricClick(metric)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-500">Today</span>
                      <div className="bg-black rounded p-0.5">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M3 7h18M3 11h18M3 15h10" stroke="white" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium text-gray-500">{metric.name}</h4>
                      <div className="text-2xl font-bold">
                        {metric.value}
                        {metric.unit && <span className="text-sm text-gray-500 ml-1">{metric.unit}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <MetricDetailDrawer
                isOpen={isMetricDrawerOpen}
                onClose={() => setIsMetricDrawerOpen(false)}
                metric={selectedMetric}
              />
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
                      status={result.status}
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
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Protocol & Schedule</h2>
                <ProtocolDrawer />
              </div>
              
              {calendarView === 'day' && (
                <div className="mb-4">
                  <DayViewGraph data={mockDayViewData} />
                </div>
              )}
              
              <SchedulePlanner
                currentDate={currentDate}
                events={mockEvents}
                onPrevious={handlePreviousWeek}
                onNext={handleNextWeek}
                onAddEvent={handleAddEvent}
                view={calendarView}
                onViewChange={setCalendarView}
                onEventClick={handleEventClick}
              />
              
              <EventDetailDrawer
                isOpen={isEventDrawerOpen}
                onClose={() => setIsEventDrawerOpen(false)}
                event={selectedEvent}
              />
            </div>
          )}

          {activeTab === "Documents" && (
            <div className="mt-6">
              <DocumentManager
                documents={mockDocuments}
                activeCategory={activeDocumentCategory}
                onCategoryChange={setActiveDocumentCategory}
                onUpload={handleDocumentUpload}
              />
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
