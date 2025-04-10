
import React from 'react';
import DayViewGraph from '@/components/planner/DayViewGraph';
import SchedulePlanner from '@/components/planner/SchedulePlanner';
import { addDays } from 'date-fns';

interface PlanTabProps {
  dayViewData: any;
  scheduleEvents: any[];
  currentDate: Date;
  plannerView: 'day' | 'week' | 'month';
  onPrevious: () => void;
  onNext: () => void;
  onAddEvent: () => void;
  onViewChange: (view: 'day' | 'week' | 'month') => void;
}

const PlanTab: React.FC<PlanTabProps> = ({
  dayViewData,
  scheduleEvents,
  currentDate,
  plannerView,
  onPrevious,
  onNext,
  onAddEvent,
  onViewChange
}) => {
  return (
    <div className="space-y-6">
      {plannerView === 'day' && (
        <DayViewGraph data={dayViewData} />
      )}
      <SchedulePlanner
        currentDate={currentDate}
        events={scheduleEvents}
        onPrevious={onPrevious}
        onNext={onNext}
        onAddEvent={onAddEvent}
        view={plannerView}
        onViewChange={onViewChange}
      />
    </div>
  );
};

export default PlanTab;
