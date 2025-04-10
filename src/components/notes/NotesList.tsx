
import React from 'react';
import { Note } from '@/types/notes';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { FileText, AlertCircle } from 'lucide-react';

interface NotesListProps {
  notes: Note[];
  onSelectNote: (note: Note) => void;
  selectedNoteId?: string;
}

export const NotesList: React.FC<NotesListProps> = ({ notes, onSelectNote, selectedNoteId }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'completed':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'archived':
        return 'bg-gray-50 text-gray-700 border-gray-200';
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  return (
    <div className="space-y-2 overflow-y-auto max-h-[calc(100vh-270px)]">
      {notes.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No notes found
        </div>
      ) : (
        notes.map(note => (
          <div 
            key={note.id}
            onClick={() => onSelectNote(note)}
            className={cn(
              "border rounded-md p-3 cursor-pointer transition-colors",
              selectedNoteId === note.id
                ? "border-primary bg-primary/5"
                : "border-gray-200 hover:border-gray-300 bg-white"
            )}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-2">
                <FileText className="h-4 w-4 mt-1 text-blue-600" />
                <div>
                  <h4 className="font-medium text-sm">{note.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })} by {note.createdBy}
                  </p>
                </div>
              </div>

              {note.followUp && new Date(note.followUp) < new Date() && (
                <AlertCircle className="h-4 w-4 text-amber-500" />
              )}
            </div>
            
            <div className="mt-2">
              <p className="text-xs text-gray-600 line-clamp-2">{note.content}</p>
            </div>
            
            <div className="mt-3 flex flex-wrap gap-1">
              {note.tags.map(tag => (
                <Badge key={tag} variant="outline" className="text-xs py-0 h-5 bg-gray-50">
                  {tag}
                </Badge>
              ))}
              
              <Badge 
                variant="outline" 
                className={cn("ml-auto text-xs py-0 h-5", getStatusColor(note.status))}
              >
                {note.status}
              </Badge>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
