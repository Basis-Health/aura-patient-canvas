
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Settings, CreditCard, UserPlus, Users, Mail, Trash2, ShieldCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

// Mock staff data
const staffMembers = [
  { id: 1, name: "Dr. Sarah Johnson", email: "sarah@basis.health", role: "Admin", avatar: "SJ" },
  { id: 2, name: "Mark Williams", email: "mark@basis.health", role: "Doctor", avatar: "MW" },
  { id: 3, name: "Emma Thompson", email: "emma@basis.health", role: "Nurse", avatar: "ET" },
  { id: 4, name: "David Chen", email: "david@basis.health", role: "Staff", avatar: "DC" }
];

const Preferences = () => {
  const [activeTab, setActiveTab] = useState("staff");
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [newStaffRole, setNewStaffRole] = useState("staff");
  const { toast } = useToast();

  const handleInviteStaff = (e: React.FormEvent) => {
    e.preventDefault();
    setInviteDialogOpen(false);
    toast({
      title: "Invitation Sent",
      description: "We've sent an invitation to join your team.",
    });
  };

  return (
    <DashboardLayout title="Preferences">
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="staff">Staff Directory</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="units">Units & Preferences</TabsTrigger>
          <TabsTrigger value="billing">Billing Integration</TabsTrigger>
        </TabsList>

        {/* Staff Directory Tab */}
        <TabsContent value="staff" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Staff Directory</h2>
              <p className="text-gray-500">Manage your team members and their access rights</p>
            </div>
            <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Invite Staff
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Invite New Staff Member</DialogTitle>
                  <DialogDescription>
                    Send an invitation email to add a new staff member to your clinic.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleInviteStaff}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input id="name" placeholder="Full name" className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">
                        Email
                      </Label>
                      <Input id="email" type="email" placeholder="email@example.com" className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="role" className="text-right">
                        Role
                      </Label>
                      <RadioGroup 
                        value={newStaffRole} 
                        onValueChange={setNewStaffRole}
                        className="col-span-3"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="admin" id="admin" />
                          <Label htmlFor="admin">Admin (Full access)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="doctor" id="doctor" />
                          <Label htmlFor="doctor">Doctor</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="staff" id="staff" />
                          <Label htmlFor="staff">Staff</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Send Invitation</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader className="px-6 py-5">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-md">Staff Members</CardTitle>
                  <CardDescription>Manage staff roles and permissions</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-6">
              <div className="space-y-4">
                {staffMembers.map((staff) => (
                  <div key={staff.id} className="flex justify-between items-center p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 bg-primary/10 text-primary rounded-full flex items-center justify-center font-medium">
                        {staff.avatar}
                      </div>
                      <div>
                        <h4 className="font-medium">{staff.name}</h4>
                        <div className="flex items-center text-sm text-gray-500">
                          <Mail className="h-3 w-3 mr-1" />
                          {staff.email}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant={staff.role === "Admin" ? "default" : staff.role === "Doctor" ? "secondary" : "outline"}>
                        {staff.role}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <ShieldCheck className="h-4 w-4" />
                      </Button>
                      {staff.role !== "Admin" && (
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Account Settings</h2>
            <p className="text-gray-500">Manage your account information and clinic details</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Clinic Information</CardTitle>
              <CardDescription>Update your clinic details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="clinicName">Clinic Name</Label>
                  <Input id="clinicName" defaultValue="Basis Health" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clinicPhone">Phone Number</Label>
                  <Input id="clinicPhone" defaultValue="(555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clinicEmail">Email Address</Label>
                  <Input id="clinicEmail" defaultValue="contact@basis.health" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clinicWebsite">Website</Label>
                  <Input id="clinicWebsite" defaultValue="https://basis.health" />
                </div>
              </div>
              <div className="pt-4">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Locations</CardTitle>
              <CardDescription>Manage your clinic locations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Main Office</h3>
                    <p className="text-sm text-gray-500">123 Medical Plaza, Suite 100, San Francisco, CA 94107</p>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Downtown Branch</h3>
                    <p className="text-sm text-gray-500">456 Health Avenue, San Francisco, CA 94103</p>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add New Location
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Security</h2>
            <p className="text-gray-500">Manage your account security options</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Update your account password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              <div className="pt-2">
                <Button>Update Password</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>Enhance your account security with 2FA</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Enable Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                </div>
                <Switch id="2fa" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Units & Preferences Tab */}
        <TabsContent value="units" className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Units & Preferences</h2>
            <p className="text-gray-500">Configure measurement units and display preferences</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Measurement Units</CardTitle>
              <CardDescription>Set your preferred units of measurement</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="weightUnit">Weight Unit</Label>
                  <Select defaultValue="kg">
                    <SelectTrigger>
                      <SelectValue placeholder="Select weight unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">Kilograms (kg)</SelectItem>
                      <SelectItem value="lb">Pounds (lb)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heightUnit">Height Unit</Label>
                  <Select defaultValue="cm">
                    <SelectTrigger>
                      <SelectValue placeholder="Select height unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cm">Centimeters (cm)</SelectItem>
                      <SelectItem value="ft">Feet/Inches (ft/in)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tempUnit">Temperature Unit</Label>
                  <Select defaultValue="c">
                    <SelectTrigger>
                      <SelectValue placeholder="Select temperature unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="c">Celsius (°C)</SelectItem>
                      <SelectItem value="f">Fahrenheit (°F)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="glucoseUnit">Blood Glucose Unit</Label>
                  <Select defaultValue="mmol">
                    <SelectTrigger>
                      <SelectValue placeholder="Select glucose unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mmol">mmol/L</SelectItem>
                      <SelectItem value="mg">mg/dL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="pt-4">
                <Button>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Display Settings</CardTitle>
              <CardDescription>Configure how information is displayed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">24-Hour Time Format</h3>
                  <p className="text-sm text-gray-500">Display time in 24-hour format</p>
                </div>
                <Switch id="24hour" defaultChecked />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Show Metrics in Patient Summary</h3>
                  <p className="text-sm text-gray-500">Display key metrics in the patient summary view</p>
                </div>
                <Switch id="showMetrics" defaultChecked />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Use ISO Date Format (YYYY-MM-DD)</h3>
                  <p className="text-sm text-gray-500">Display dates in ISO format</p>
                </div>
                <Switch id="isoDate" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Integration Tab */}
        <TabsContent value="billing" className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Billing Integration</h2>
            <p className="text-gray-500">Connect your payment processing accounts</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Stripe Integration</CardTitle>
              <CardDescription>Connect your Stripe account for payment processing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <CreditCard className="h-8 w-8 text-primary" />
                  <div>
                    <h4 className="font-medium">Stripe</h4>
                    <p className="text-sm text-gray-500">Process credit card payments securely</p>
                  </div>
                </div>
                <Button>
                  Connect Stripe
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
              <CardDescription>Configure your billing preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currency">Default Currency</Label>
                <Select defaultValue="usd">
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">US Dollar (USD)</SelectItem>
                    <SelectItem value="eur">Euro (EUR)</SelectItem>
                    <SelectItem value="gbp">British Pound (GBP)</SelectItem>
                    <SelectItem value="cad">Canadian Dollar (CAD)</SelectItem>
                    <SelectItem value="aud">Australian Dollar (AUD)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Automatic Receipt Emails</h3>
                  <p className="text-sm text-gray-500">Send automatic receipt emails to clients after payment</p>
                </div>
                <Switch id="autoReceipts" defaultChecked />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Allow Partial Payments</h3>
                  <p className="text-sm text-gray-500">Enable clients to make partial payments on invoices</p>
                </div>
                <Switch id="partialPayments" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Preferences;
