
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LogOut, Settings as SettingsIcon, Shield } from "lucide-react";

export const GeneralSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
        <CardDescription>
          Configure your basic preferences and account settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Units</h4>
              <p className="text-sm text-gray-500">Choose your preferred unit system</p>
            </div>
            <Select defaultValue="metric">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select units" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="metric">Metric</SelectItem>
                <SelectItem value="imperial">Imperial</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Clinic</h4>
              <p className="text-sm text-gray-500">Change your assigned clinic</p>
            </div>
            <Select defaultValue="main">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select clinic" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="main">Main Clinic</SelectItem>
                <SelectItem value="branch1">Branch 1</SelectItem>
                <SelectItem value="branch2">Branch 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const SecuritySettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security</CardTitle>
        <CardDescription>
          Manage your account security settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Two-Factor Authentication</h4>
            <p className="text-sm text-gray-500">Add an extra layer of security</p>
          </div>
          <Switch />
        </div>
        <Button variant="destructive" className="w-full sm:w-auto">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </CardContent>
    </Card>
  );
};

export const AISettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI & Automation</CardTitle>
        <CardDescription>
          Configure AI-powered features and automation preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">AI-Generated Lab Insights</h4>
            <p className="text-sm text-gray-500">Enable automated insights from lab results</p>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Auto-assign Protocols</h4>
            <p className="text-sm text-gray-500">Automatically suggest protocols based on biomarkers</p>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Behavioral Suggestions</h4>
            <p className="text-sm text-gray-500">Get next steps based on patient behavior</p>
          </div>
          <Switch />
        </div>
      </CardContent>
    </Card>
  );
};

export const CookieSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cookie Preferences</CardTitle>
        <CardDescription>
          Manage your cookie preferences and tracking settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Essential Cookies</h4>
            <p className="text-sm text-gray-500">Required for basic functionality</p>
          </div>
          <Switch checked disabled />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Analytics Cookies</h4>
            <p className="text-sm text-gray-500">Help us improve our service</p>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Marketing Cookies</h4>
            <p className="text-sm text-gray-500">Personalized content and ads</p>
          </div>
          <Switch />
        </div>
      </CardContent>
    </Card>
  );
};
