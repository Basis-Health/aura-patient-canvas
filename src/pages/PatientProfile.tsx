
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import PatientHeader from "@/components/patient/PatientHeader";
import PatientTabs from "@/components/navigation/PatientTabs";
import { Note } from "@/types/notes";
import { NotesList } from "@/components/notes/NotesList";

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

const PatientProfile = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const [activeTab, setActiveTab] = useState("Summary");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  
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

  const renderTabContent = () => {
    switch (activeTab) {
      case "Summary":
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Patient Summary</h2>
            <p className="text-gray-600">Patient summary information will be displayed here.</p>
          </div>
        );
      case "Plan":
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Treatment Plan</h2>
            <p className="text-gray-600">Treatment plan details will be displayed here.</p>
          </div>
        );
      case "Metrics":
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Patient Metrics</h2>
            <p className="text-gray-600">Patient metrics and measurements will be displayed here.</p>
          </div>
        );
      case "Labs":
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Lab Results</h2>
            <p className="text-gray-600">Laboratory results and tests will be displayed here.</p>
          </div>
        );
      case "Documents":
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Patient Documents</h2>
            <p className="text-gray-600">Patient documents will be displayed here.</p>
          </div>
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
