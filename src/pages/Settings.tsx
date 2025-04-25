
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { GeneralSettings } from "@/components/settings/GeneralSettings";
import { IntegrationSettings } from "@/components/settings/IntegrationSettings";
import { NotificationSettings } from "@/components/settings/NotificationSettings";
import { SecuritySettings } from "@/components/settings/SecuritySettings";
import { BillingSettings } from "@/components/settings/BillingSettings";
import { ClinicProfileSettings } from "@/components/settings/ClinicProfileSettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building,
  Settings as SettingsIcon,
  CreditCard,
  Bell,
  Shield,
  Link,
} from "lucide-react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <DashboardLayout title="Settings">
      <div className="max-w-6xl mx-auto space-y-6 p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-6">
            <TabsTrigger value="general" className="flex gap-2 items-center">
              <SettingsIcon className="h-4 w-4" />
              <span className="hidden sm:inline">General</span>
            </TabsTrigger>
            <TabsTrigger value="clinic" className="flex gap-2 items-center">
              <Building className="h-4 w-4" />
              <span className="hidden sm:inline">Clinic Profile</span>
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex gap-2 items-center">
              <Link className="h-4 w-4" />
              <span className="hidden sm:inline">Integrations</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex gap-2 items-center">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex gap-2 items-center">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex gap-2 items-center">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Billing</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <GeneralSettings />
          </TabsContent>
          
          <TabsContent value="clinic">
            <ClinicProfileSettings />
          </TabsContent>
          
          <TabsContent value="integrations">
            <IntegrationSettings />
          </TabsContent>
          
          <TabsContent value="notifications">
            <NotificationSettings />
          </TabsContent>
          
          <TabsContent value="security">
            <SecuritySettings />
          </TabsContent>
          
          <TabsContent value="billing">
            <BillingSettings />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
