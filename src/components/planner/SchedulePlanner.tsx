
import React from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
  color?: string;
  type: string;
}

interface SchedulePlannerProps {
  currentDate: Date;
  events: Event[];
  onPrevious: () => void;
  onNext: () => void;
  onAddEvent?: () => void;
  view: 'day' | 'week' | 'month';
  onViewChange: (view: 'day' | 'week' | 'month') => void;
}

const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const hours = Array.from({ length: 24 }, (_, i) => {
  const hour = i % 12 || 12;
  const period = i < 12 ? 'AM' : 'PM';
  return `${hour} ${period}`;
});

const SchedulePlanner = ({
  currentDate,
  events,
  onPrevious,
  onNext,
  onAddEvent,
  view,
  onViewChange,
}: SchedulePlannerProps) => {
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={onPrevious}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h3 className="text-lg font-medium">
            {currentMonth} {currentYear}
          </h3>
          <button
            onClick={onNext}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="bg-gray-100 rounded-lg p-1 flex">
            <button
              className={cn(
                "px-3 py-1 text-sm rounded-md",
                view === 'day' ? "bg-white shadow-sm" : "text-gray-500"
              )}
              onClick={() => onViewChange('day')}
            >
              Day
            </button>
            <button
              className={cn(
                "px-3 py-1 text-sm rounded-md",
                view === 'week' ? "bg-white shadow-sm" : "text-gray-500"
              )}
              onClick={() => onViewChange('week')}
            >
              Week
            </button>
            <button
              className={cn(
                "px-3 py-1 text-sm rounded-md",
                view === 'month' ? "bg-white shadow-sm" : "text-gray-500"
              )}
              onClick={() => onViewChange('month')}
            >
              Month
            </button>
          </div>
          
          <Button 
            size="sm" 
            onClick={onAddEvent} 
            className="flex items-center"
          >
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>
      </div>

      {view === 'week' && (
        <div className="mt-4 border rounded-lg overflow-hidden">
          <div className="grid grid-cols-8 border-b">
            <div className="border-r p-2 bg-gray-50"></div>
            {daysOfWeek.map((day, i) => (
              <div
                key={day + i}
                className={cn(
                  "p-2 text-center border-r",
                  i === 3 ? "bg-emerald-50 font-medium" : ""
                )}
              >
                {day}
                <div className={cn(
                  "w-6 h-6 mx-auto rounded-full flex items-center justify-center text-sm mt-1",
                  i === 3 ? "bg-emerald-500 text-white" : ""
                )}>
                  {i + 7}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-8 h-[600px] overflow-y-auto">
            <div className="border-r">
              {hours.map((hour) => (
                <div key={hour} className="h-24 border-b p-2 text-xs text-gray-500">
                  {hour}
                </div>
              ))}
            </div>
            
            {daysOfWeek.map((_, dayIndex) => (
              <div key={dayIndex} className="border-r relative">
                {hours.map((_, hourIndex) => (
                  <div key={hourIndex} className="h-24 border-b"></div>
                ))}
                
                {events
                  .filter(event => event.type === 'Sleep' && dayIndex === 3)
                  .map(event => (
                    <div
                      key={event.id}
                      className="absolute left-0 right-0 ml-1 mr-1 rounded bg-blue-100 border border-blue-200 p-1 text-xs"
                      style={{
                        top: '120px',
                        height: '132px',
                      }}
                    >
                      <div className="font-medium text-blue-800">🛌 Sleep</div>
                      <div className="text-blue-600 mt-1">4:16 am - 10:02 am</div>
                    </div>
                  ))}
                
                {events
                  .filter(event => event.type === 'HIIT' && dayIndex === 3)
                  .map(event => (
                    <div
                      key={event.id}
                      className="absolute left-0 right-0 ml-1 mr-1 rounded bg-orange-100 border border-orange-200 p-1 text-xs"
                      style={{
                        top: '312px',
                        height: '36px',
                      }}
                    >
                      <div className="font-medium text-orange-800">🏋️‍♂️ HIIT</div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SchedulePlanner;
