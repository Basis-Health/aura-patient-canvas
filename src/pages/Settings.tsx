
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { GeneralSettings } from "@/components/settings/GeneralSettings";
import { IntegrationSettings } from "@/components/settings/IntegrationSettings";
import { NotificationSettings } from "@/components/settings/NotificationSettings";
import { SecuritySettings } from "@/components/settings/SecuritySettings";
import { BillingSettings } from "@/components/settings/BillingSettings";

const Settings = () => {
  return (
    <DashboardLayout title="Settings">
      <div className="max-w-4xl mx-auto space-y-6 p-6">
        <GeneralSettings />
        <IntegrationSettings />
        <NotificationSettings />
        <SecuritySettings />
        <BillingSettings />
      </div>
    </DashboardLayout>
  );
};

export default Settings;
