
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const GeneralSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
        <CardDescription>
          Configure your basic preferences for the application
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="units">Units</Label>
          <select
            id="units"
            className="w-full p-2 border rounded-md"
            defaultValue="metric"
          >
            <option value="metric">Metric (kg, cm)</option>
            <option value="imperial">Imperial (lb, in)</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="dateFormat">Date Format</Label>
          <select
            id="dateFormat"
            className="w-full p-2 border rounded-md"
            defaultValue="mm-dd-yyyy"
          >
            <option value="mm-dd-yyyy">MM-DD-YYYY</option>
            <option value="dd-mm-yyyy">DD-MM-YYYY</option>
            <option value="yyyy-mm-dd">YYYY-MM-DD</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="language">Language</Label>
          <select
            id="language"
            className="w-full p-2 border rounded-md"
            defaultValue="en"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-medium mb-4">Coach Profile</h3>
          <p className="text-sm text-gray-500 mb-4">
            Configure your personal coach profile, availability, and professional details
          </p>
          <Button asChild>
            <Link to="/coach-profile">
              Manage Coach Profile <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
