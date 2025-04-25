
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Shield, Cookie, LogOut } from "lucide-react";

export const SecuritySettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security</CardTitle>
        <CardDescription>
          Manage your security preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <div>
              <h4 className="font-medium">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-500">Add an extra layer of security</p>
            </div>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cookie className="h-4 w-4" />
            <div>
              <h4 className="font-medium">Cookie Preferences</h4>
              <p className="text-sm text-gray-500">Manage tracking cookies</p>
            </div>
          </div>
          <Switch />
        </div>

        <Button variant="destructive" className="w-full">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </CardContent>
    </Card>
  );
};
