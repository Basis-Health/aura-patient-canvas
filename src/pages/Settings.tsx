
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  GeneralSettings,
  SecuritySettings,
  AISettings,
  CookieSettings,
} from "@/components/settings/SettingsSections";

const Settings = () => {
  return (
    <DashboardLayout title="Settings">
      <div className="max-w-4xl mx-auto space-y-6 p-6">
        <GeneralSettings />
        <SecuritySettings />
        <AISettings />
        <CookieSettings />
      </div>
    </DashboardLayout>
  );
};

export default Settings;
