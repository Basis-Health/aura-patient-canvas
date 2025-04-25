
import React, { useState } from "react";
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CalendarClock, Upload, Save, User } from "lucide-react";

export const CoachProfileForm = () => {
  const [name, setName] = useState("Dr. Sarah Johnson");
  const [bio, setBio] = useState("Functional medicine specialist with 10+ years of experience in hormone health and autoimmune conditions.");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [availability, setAvailability] = useState({
    "West Hollywood": { start: "09:00", end: "17:00" },
    "Beverly Hills": { start: "10:00", end: "16:00" }
  });
  const [isAvailable, setIsAvailable] = useState(true);
  const [unavailableUntil, setUnavailableUntil] = useState<Date | undefined>(undefined);
  const [unavailableDialog, setUnavailableDialog] = useState(false);

  const locations = ["West Hollywood", "Beverly Hills", "Santa Monica"];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateAvailability = (location: string, type: 'start' | 'end', value: string) => {
    setAvailability(prev => ({
      ...prev,
      [location]: {
        ...prev[location as keyof typeof prev],
        [type]: value
      }
    }));
  };

  const handleSave = () => {
    // In a real app, this would save to an API
    console.log("Saving profile:", { name, bio, availability, isAvailable, unavailableUntil });
    // Show success toast
    alert("Profile updated successfully!");
  };

  const handleSetUnavailable = () => {
    setIsAvailable(false);
    setUnavailableDialog(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Coach Profile</CardTitle>
          <CardDescription>
            Update your personal information visible to clients and team members
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Image */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <Avatar className="h-24 w-24">
              {profileImage ? (
                <AvatarImage src={profileImage} alt="Profile" />
              ) : (
                <AvatarFallback className="text-2xl">
                  <User className="h-12 w-12" />
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <p className="text-sm text-gray-500 mb-2">Upload a professional photo</p>
              <label className="cursor-pointer">
                <Input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button variant="outline" type="button">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Image
                </Button>
              </label>
            </div>
          </div>

          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Your name"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <textarea 
                id="bio" 
                value={bio} 
                onChange={(e) => setBio(e.target.value)} 
                placeholder="Write a short bio"
                className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-24"
              />
            </div>

            {/* Availability Status */}
            <div className="flex items-center justify-between border p-4 rounded-md">
              <div>
                <p className="font-medium">Availability Status</p>
                <p className="text-sm text-gray-500">{isAvailable ? 'Available for appointments' : `Unavailable until ${unavailableUntil ? format(unavailableUntil, 'PPP') : 'further notice'}`}</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant={isAvailable ? "default" : "outline"}
                  onClick={() => setIsAvailable(true)}
                >
                  Available
                </Button>
                <Dialog open={unavailableDialog} onOpenChange={setUnavailableDialog}>
                  <DialogTrigger asChild>
                    <Button 
                      variant={!isAvailable ? "default" : "outline"}
                    >
                      Set Unavailable
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Set Unavailable Period</DialogTitle>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                      <p>Select when you'll be available again:</p>
                      <div className="flex justify-center">
                        <Calendar
                          mode="single"
                          selected={unavailableUntil}
                          onSelect={setUnavailableUntil}
                          initialFocus
                          disabled={(date) => date < new Date()}
                          className="rounded-md border"
                        />
                      </div>
                      <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" onClick={() => setUnavailableDialog(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleSetUnavailable}>
                          Confirm
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          {/* Location Availability */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Schedule Availability by Location</h3>
            {locations.map(location => (
              <div key={location} className="border rounded-md p-4 space-y-3">
                <h4 className="font-medium">{location}</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`start-${location}`}>Start Time</Label>
                    <Input
                      id={`start-${location}`}
                      type="time"
                      value={availability[location as keyof typeof availability]?.start || "09:00"}
                      onChange={(e) => updateAvailability(location, 'start', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`end-${location}`}>End Time</Label>
                    <Input
                      id={`end-${location}`}
                      type="time"
                      value={availability[location as keyof typeof availability]?.end || "17:00"}
                      onChange={(e) => updateAvailability(location, 'end', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Profile
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
