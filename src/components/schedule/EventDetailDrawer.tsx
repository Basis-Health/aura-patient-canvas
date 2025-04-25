
import React from 'react';
import { 
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';
import { Event } from '@/types/calendar';
import { Button } from '@/components/ui/button';
import { CalendarDays, Copy, Edit, ExternalLink, MoreVertical, Trash, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface EventDetailDrawerProps {
  event: Event | null;
  open: boolean;
  onClose: () => void;
}

const EventDetailDrawer: React.FC<EventDetailDrawerProps> = ({ event, open, onClose }) => {
  if (!event) return null;

  const handleEdit = () => {
    console.log("Edit event:", event);
    // Would implement edit functionality
  };

  const handleDelete = () => {
    console.log("Delete event:", event);
    // Would implement delete functionality
  };

  const handleCopy = () => {
    console.log("Copy event link:", event);
    // Would implement copy link functionality
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="max-h-screen overflow-y-auto w-[400px] sm:w-[450px]">
        <SheetHeader className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center">
            <div 
              className={cn(
                "w-4 h-4 rounded-full mr-3",
                event.type === 'work' && "bg-red-500",
                event.type === 'meeting' && "bg-blue-500",
                event.type === 'appointment' && "bg-amber-500",
                event.type === 'busy' && "bg-yellow-500"
              )} 
            />
            <SheetTitle className="text-lg font-bold">{event.title}</SheetTitle>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" onClick={handleEdit}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleDelete}>
              <Trash className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleCopy}>
              <Copy className="h-4 w-4" />
            </Button>
            <SheetClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>

        <div className="p-4 space-y-6">
          {/* Date and time */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Date & Time</h3>
            <div className="flex items-center">
              <CalendarDays className="h-5 w-5 mr-3 text-gray-400" />
              <div>
                <p className="font-medium">
                  {event.date 
                    ? format(new Date(event.date), 'EEEE, MMMM d, yyyy')
                    : format(new Date(), 'EEEE, MMMM d, yyyy')}
                </p>
                <p className="text-sm text-gray-600">{event.start} - {event.end}</p>
                {event.recurring && (
                  <p className="text-xs text-gray-500 mt-1">{event.recurrencePattern}</p>
                )}
              </div>
            </div>
          </div>

          <Separator />
          
          {/* Location / Meeting link */}
          {event.location && (
            <>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Location</h3>
                {event.location.toLowerCase().includes('google meet') && (
                  <div className="flex flex-col space-y-2">
                    <Button 
                      className="bg-blue-500 hover:bg-blue-600 text-white w-full justify-center" 
                      asChild
                    >
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        Join with Google Meet
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                    {event.meetingLink && (
                      <p className="text-xs text-gray-600 text-center">{event.meetingLink}</p>
                    )}
                  </div>
                )}
              </div>
              <Separator />
            </>
          )}

          {/* Attendees */}
          {event.attendees && event.attendees.length > 0 && (
            <>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  {event.attendees.length} {event.attendees.length === 1 ? 'Guest' : 'Guests'}
                </h3>
                <div className="space-y-3">
                  {event.attendees.map((attendee) => (
                    <div key={attendee.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-3">
                          <AvatarImage src="" alt={attendee.name} />
                          <AvatarFallback>{attendee.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{attendee.name}</p>
                          {attendee.email && (
                            <p className="text-xs text-gray-500">{attendee.email}</p>
                          )}
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={cn(
                          attendee.status === 'organizer' && "bg-blue-50 text-blue-700 border-blue-200",
                          attendee.status === 'confirmed' && "bg-green-50 text-green-700 border-green-200",
                          attendee.status === 'pending' && "bg-yellow-50 text-yellow-700 border-yellow-200"
                        )}
                      >
                        {attendee.status === 'organizer' ? 'Organizer' : 
                          attendee.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
              <Separator />
            </>
          )}
          
          {/* Description */}
          {event.description && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
              <p className="text-sm text-gray-700 whitespace-pre-line">{event.description}</p>
            </div>
          )}

          {/* Going status */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Going?</h3>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">Yes</Button>
              <Button variant="outline" className="flex-1">No</Button>
              <Button variant="outline" className="flex-1">Maybe</Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default EventDetailDrawer;
