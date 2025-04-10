
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const Calendar = () => {
  return (
    <DashboardLayout title="Calendar">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Appointment Calendar</h2>
          <p className="text-gray-600">
            View and manage all scheduled appointments and events here.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Calendar;
