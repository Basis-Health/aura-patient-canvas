
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PatientHeader from '@/components/patient/PatientHeader';
import PatientTabs from '@/components/navigation/PatientTabs';
import { NotesList } from '@/components/notes/NotesList';
import { NoteEditor } from '@/components/notes/NoteEditor';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Note } from '@/types/notes';

// Mock patient data (same as in Index.tsx)
const mockPatient = {
  name: "George Georgallides",
  age: 30,
  email: "georgeallidis@gmail.com",
  location: "Asia/Nicosia",
  birthdate: "April 15, 1995",
  avatarUrl: "/lovable-uploads/1ca07b90-534f-4849-83c5-906dee56f04c.png"
};

// Mock notes data
const mockNotes: Note[] = [
  {
    id: "1",
    title: "Initial Assessment",
    content: "Patient presents with concerns about sleep quality and energy levels. Reported waking up 3-4 times per night over the past month. Recommended sleep tracking and follow-up in two weeks.",
    createdAt: "2025-04-02T10:30:00Z",
    createdBy: "Dr. Sarah Johnson",
    tags: ["Sleep", "Fatigue"],
    followUp: "2025-04-16",
    status: "active"
  },
  {
    id: "2",
    title: "Blood Test Results Review",
    content: "Reviewed recent blood work. TSH levels slightly elevated at 3.42 mIU/L (normal range: 0.4-4.0). Free T4 within range but on the lower end. Recommended monitoring and repeat test in 3 months.",
    createdAt: "2025-03-15T14:45:00Z",
    createdBy: "Dr. Michael Chen",
    tags: ["Bloodwork", "Thyroid"],
    followUp: "2025-06-15",
    status: "active"
  },
  {
    id: "3",
    title: "Diet Consultation",
    content: "Discussed dietary patterns and nutritional goals. Patient reports consistent intermittent fasting schedule (16:8) for past 6 weeks. Recommended increasing protein intake and monitoring energy levels. Provided resource links for low-inflammatory meal planning.",
    createdAt: "2025-02-28T11:15:00Z",
    createdBy: "Emma Wilson, RD",
    tags: ["Nutrition", "Diet"],
    followUp: null,
    status: "completed"
  }
];

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>(mockNotes);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [activeTab, setActiveTab] = useState("Notes");

  const handleNoteSelect = (note: Note) => {
    setSelectedNote(note);
    setIsCreatingNew(false);
  };

  const handleNewNote = () => {
    setSelectedNote(null);
    setIsCreatingNew(true);
  };

  const handleSaveNote = (note: Note) => {
    if (note.id) {
      // Update existing note
      setNotes(notes.map(n => n.id === note.id ? note : n));
    } else {
      // Add new note with generated ID
      const newNote = {
        ...note,
        id: `${Date.now()}`,
        createdAt: new Date().toISOString(),
        createdBy: "Dr. Current User", // This would come from authentication in a real app
        status: "active"
      };
      setNotes([newNote, ...notes]);
    }
    setSelectedNote(null);
    setIsCreatingNew(false);
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <PatientHeader 
            patient={mockPatient}
          />
          
          <PatientTabs 
            tabs={["Summary", "Plan", "Metrics", "Labs", "Documents", "Notes"]}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
          
          <div className="mt-6 flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3 lg:w-1/4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Patient Notes</h2>
                <Button onClick={handleNewNote} size="sm" className="flex items-center gap-1">
                  <PlusCircle className="h-4 w-4" />
                  New Note
                </Button>
              </div>
              <NotesList 
                notes={notes} 
                onSelectNote={handleNoteSelect} 
                selectedNoteId={selectedNote?.id}
              />
            </div>
            
            <div className="md:w-2/3 lg:w-3/4">
              {isCreatingNew || selectedNote ? (
                <NoteEditor 
                  note={selectedNote} 
                  onSave={handleSaveNote} 
                  isNew={isCreatingNew}
                />
              ) : (
                <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 h-full flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Select a note or create a new one</h3>
                    <p className="text-gray-500 mb-4">Click on a note from the list to view or edit it</p>
                    <Button onClick={handleNewNote} className="flex items-center gap-1 mx-auto">
                      <PlusCircle className="h-4 w-4" />
                      Create New Note
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Notes;
