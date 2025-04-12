
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const Settings = () => {
  return (
    <DashboardLayout title="Settings">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Application Settings</h2>
          <p className="text-gray-600">
            Manage your application preferences and account settings.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
