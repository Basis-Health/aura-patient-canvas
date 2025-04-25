
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Bell, Mail, MessageSquare } from "lucide-react";

export const NotificationSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          Manage your notification preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <div>
              <h4 className="font-medium">Email Notifications</h4>
              <p className="text-sm text-gray-500">Receive updates via email</p>
            </div>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <div>
              <h4 className="font-medium">SMS Notifications</h4>
              <p className="text-sm text-gray-500">Get text message alerts</p>
            </div>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <div>
              <h4 className="font-medium">Push Notifications</h4>
              <p className="text-sm text-gray-500">Browser notifications</p>
            </div>
          </div>
          <Switch />
        </div>
      </CardContent>
    </Card>
  );
};
