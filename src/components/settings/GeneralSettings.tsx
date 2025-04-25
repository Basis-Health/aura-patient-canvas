
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
import { Globe, Calendar } from "lucide-react";

export const GeneralSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
        <CardDescription>
          Configure your basic preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
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
            <h4 className="font-medium">Language</h4>
            <p className="text-sm text-gray-500">Select your preferred language</p>
          </div>
          <Select defaultValue="en">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Date Format</h4>
            <p className="text-sm text-gray-500">Choose how dates are displayed</p>
          </div>
          <Select defaultValue="MM/DD/YYYY">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
              <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
              <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
