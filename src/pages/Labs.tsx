
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Mock biomarker data
const mockBiomarkers = [
  { 
    id: "glucose", 
    name: "Glucose", 
    value: "95 mg/dL", 
    status: "Optimal",
    history: [
      { date: "2023-01", value: 98 },
      { date: "2023-02", value: 95 },
      { date: "2023-03", value: 97 },
      { date: "2023-04", value: 94 },
      { date: "2023-05", value: 95 },
    ]
  },
  { 
    id: "cholesterol", 
    name: "Total Cholesterol", 
    value: "185 mg/dL", 
    status: "In Range",
    history: [
      { date: "2023-01", value: 190 },
      { date: "2023-02", value: 188 },
      { date: "2023-03", value: 185 },
      { date: "2023-04", value: 183 },
      { date: "2023-05", value: 185 },
    ]
  },
  { 
    id: "hdl", 
    name: "HDL Cholesterol", 
    value: "62 mg/dL", 
    status: "Optimal",
    history: [
      { date: "2023-01", value: 58 },
      { date: "2023-02", value: 60 },
      { date: "2023-03", value: 61 },
      { date: "2023-04", value: 63 },
      { date: "2023-05", value: 62 },
    ]
  },
  { 
    id: "ldl", 
    name: "LDL Cholesterol", 
    value: "110 mg/dL", 
    status: "In Range",
    history: [
      { date: "2023-01", value: 118 },
      { date: "2023-02", value: 115 },
      { date: "2023-03", value: 112 },
      { date: "2023-04", value: 111 },
      { date: "2023-05", value: 110 },
    ]
  },
  { 
    id: "triglycerides", 
    name: "Triglycerides", 
    value: "130 mg/dL", 
    status: "In Range",
    history: [
      { date: "2023-01", value: 145 },
      { date: "2023-02", value: 138 },
      { date: "2023-03", value: 135 },
      { date: "2023-04", value: 132 },
      { date: "2023-05", value: 130 },
    ]
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Optimal":
      return "bg-green-100 text-green-800";
    case "In Range":
      return "bg-blue-100 text-blue-800";
    case "Out of Range":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const Labs = () => {
  const [selectedBiomarker, setSelectedBiomarker] = useState<(typeof mockBiomarkers)[0] | null>(null);

  const openBiomarkerDrawer = (biomarker: (typeof mockBiomarkers)[0]) => {
    setSelectedBiomarker(biomarker);
  };

  return (
    <DashboardLayout title="Lab Results">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockBiomarkers.map((biomarker) => (
          <Card key={biomarker.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => openBiomarkerDrawer(biomarker)}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{biomarker.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold">{biomarker.value}</div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(biomarker.status)}`}>
                  {biomarker.status}
                </div>
              </div>
              <div className="text-xs text-muted-foreground mt-2">Click to view history</div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Biomarker History Drawer */}
      <Sheet open={!!selectedBiomarker} onOpenChange={(open) => !open && setSelectedBiomarker(null)}>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>{selectedBiomarker?.name} History</SheetTitle>
            <SheetDescription>
              Trend over time for {selectedBiomarker?.name.toLowerCase()}
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <div className="mb-4">
              <div className="text-sm font-medium text-muted-foreground">Current Value</div>
              <div className="text-2xl font-bold flex items-center gap-2">
                {selectedBiomarker?.value}
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${selectedBiomarker ? getStatusColor(selectedBiomarker.status) : ""}`}>
                  {selectedBiomarker?.status}
                </span>
              </div>
            </div>
            
            <div className="h-[300px] mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={selectedBiomarker?.history}
                  margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#8884d8" 
                    strokeWidth={2} 
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </DashboardLayout>
  );
};

export default Labs;
