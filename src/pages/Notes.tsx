
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Notes = () => {
  return (
    <DashboardLayout title="Notes">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Patient Notes</h2>
        <p className="text-gray-600 mb-6">
          Patient notes are now available directly in each patient's profile under the "Notes" tab.
        </p>
        <Link to="/">
          <Button>Go to Dashboard</Button>
        </Link>
      </div>
    </DashboardLayout>
  );
};

export default Notes;
