
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import {
  Building,
  Image,
  Pen,
  MapPin,
  Clock,
  Plus,
  Users,
  FilePen,
  TestTube,
  Lightbulb,
} from "lucide-react";

export const ClinicProfileSettings = () => {
  const [showAddLocationDialog, setShowAddLocationDialog] = useState(false);

  return (
    <div className="space-y-6">
      {/* 1. Branding */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building className="h-5 w-5 text-primary" />
            <CardTitle>Branding</CardTitle>
          </div>
          <CardDescription>
            Customize your clinic's visual identity
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <Image className="h-4 w-4 text-gray-500" />
                <div>
                  <h4 className="font-medium">Logo</h4>
                  <p className="text-sm text-gray-500">Upload your clinic logo</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-md border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                  <Image className="h-6 w-6 text-gray-400" />
                </div>
                <Button variant="outline" size="sm">
                  Upload
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <Pen className="h-4 w-4 text-gray-500" />
                <div>
                  <h4 className="font-medium">Clinic Name</h4>
                  <p className="text-sm text-gray-500">Set your clinic name</p>
                </div>
              </div>
              <div className="w-full max-w-xs">
                <Input defaultValue="Basis Functional Medicine" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Locations */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <CardTitle>Locations</CardTitle>
          </div>
          <CardDescription>
            Manage your clinic locations and hours
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg border p-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Main Location</h4>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">123 Health Street, San Francisco, CA 94103</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Mon-Fri: 9am-5pm, Sat: 10am-2pm, Sun: Closed</span>
                </div>
              </div>
            </div>
          </div>

          <Button 
            onClick={() => setShowAddLocationDialog(true)} 
            variant="outline" 
            className="w-full"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Location
          </Button>

          <Dialog open={showAddLocationDialog} onOpenChange={setShowAddLocationDialog}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Location</DialogTitle>
                <DialogDescription>
                  Enter the details for your new clinic location.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <FormLabel htmlFor="location-name">Location Name</FormLabel>
                  <Input id="location-name" placeholder="e.g., Downtown Office" />
                </div>
                <div className="space-y-2">
                  <FormLabel htmlFor="address">Address</FormLabel>
                  <Textarea 
                    id="address" 
                    placeholder="Full address including city, state and zip code"
                    className="min-h-[80px]"
                  />
                </div>
                <div className="space-y-2">
                  <FormLabel htmlFor="hours">Business Hours</FormLabel>
                  <Textarea 
                    id="hours" 
                    placeholder="e.g., Mon-Fri: 9am-5pm, Sat: Closed, Sun: Closed"
                    className="min-h-[80px]"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddLocationDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowAddLocationDialog(false)}>
                  Save Location
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* 3. Staff Roles */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <CardTitle>Staff Roles</CardTitle>
          </div>
          <CardDescription>
            Create roles and set access levels for your staff
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <h4 className="font-medium mb-2">Administrator</h4>
              <p className="text-sm text-gray-500 mb-4">Full access to all features and patient data</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Checkbox id="admin-patients" checked disabled />
                  <label htmlFor="admin-patients" className="text-sm">Patient Data</label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="admin-protocols" checked disabled />
                  <label htmlFor="admin-protocols" className="text-sm">Protocols</label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="admin-billing" checked disabled />
                  <label htmlFor="admin-billing" className="text-sm">Billing</label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="admin-settings" checked disabled />
                  <label htmlFor="admin-settings" className="text-sm">Settings</label>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <h4 className="font-medium mb-2">Practitioner</h4>
              <p className="text-sm text-gray-500 mb-4">Access to patient data and protocols</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Checkbox id="practitioner-patients" checked />
                  <label htmlFor="practitioner-patients" className="text-sm">Patient Data</label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="practitioner-protocols" checked />
                  <label htmlFor="practitioner-protocols" className="text-sm">Protocols</label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="practitioner-billing" />
                  <label htmlFor="practitioner-billing" className="text-sm">Billing</label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="practitioner-settings" />
                  <label htmlFor="practitioner-settings" className="text-sm">Settings</label>
                </div>
              </div>
            </div>
          </div>

          <Button variant="outline" className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Create New Role
          </Button>
        </CardContent>
      </Card>

      {/* 4. Clinic Forms */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FilePen className="h-5 w-5 text-primary" />
            <CardTitle>Clinic Forms</CardTitle>
          </div>
          <CardDescription>
            Configure forms and intake flows
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="font-medium">Intake Flow Configuration</h4>
              <div className="flex items-center justify-between">
                <Select defaultValue="standard">
                  <SelectTrigger className="w-full max-w-xs">
                    <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard Template</SelectItem>
                    <SelectItem value="comprehensive">Comprehensive Template</SelectItem>
                    <SelectItem value="minimal">Minimal Template</SelectItem>
                    <SelectItem value="custom">Custom Template</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">Customize</Button>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Symptoms Collection</h4>
              <div className="flex items-center justify-between">
                <Select defaultValue="detailed">
                  <SelectTrigger className="w-full max-w-xs">
                    <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="detailed">Detailed Symptoms</SelectItem>
                    <SelectItem value="system-based">System-Based Approach</SelectItem>
                    <SelectItem value="minimal">Minimal Symptoms</SelectItem>
                    <SelectItem value="custom">Custom Template</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">Customize</Button>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Benchmark Forms</h4>
              <div className="flex items-center justify-between">
                <Select defaultValue="standard">
                  <SelectTrigger className="w-full max-w-xs">
                    <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard Benchmarks</SelectItem>
                    <SelectItem value="advanced">Advanced Benchmarks</SelectItem>
                    <SelectItem value="minimal">Minimal Benchmarks</SelectItem>
                    <SelectItem value="custom">Custom Template</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">Customize</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 5. Protocols */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FilePen className="h-5 w-5 text-primary" />
            <CardTitle>Protocols</CardTitle>
          </div>
          <CardDescription>
            Manage protocol templates and configurations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Standard Nutrition Protocol</h4>
                <p className="text-sm text-gray-500">Basic nutrition recommendations</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Sleep Hygiene Protocol</h4>
                <p className="text-sm text-gray-500">Sleep improvement practices</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Stress Management Protocol</h4>
                <p className="text-sm text-gray-500">Stress reduction techniques</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Exercise Protocol</h4>
                <p className="text-sm text-gray-500">Physical activity guidelines</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>

          <div className="pt-4 border-t">
            <h4 className="font-medium mb-2">Default Adherence Goals</h4>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">Target adherence:</span>
              <Select defaultValue="80">
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="Select %" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="70">70%</SelectItem>
                  <SelectItem value="80">80%</SelectItem>
                  <SelectItem value="90">90%</SelectItem>
                  <SelectItem value="100">100%</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button variant="outline" className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Create Custom Protocol
          </Button>
        </CardContent>
      </Card>

      {/* 6. Lab & Biomarker Preferences */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <TestTube className="h-5 w-5 text-primary" />
            <CardTitle>Lab & Biomarker Preferences</CardTitle>
          </div>
          <CardDescription>
            Configure biomarker display and benchmarks
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium">Prioritized Biomarkers</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              <div className="flex items-center gap-2">
                <Checkbox id="marker-vit-d" defaultChecked />
                <label htmlFor="marker-vit-d" className="text-sm">Vitamin D</label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="marker-glucose" defaultChecked />
                <label htmlFor="marker-glucose" className="text-sm">Glucose</label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="marker-crp" defaultChecked />
                <label htmlFor="marker-crp" className="text-sm">CRP</label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="marker-tsh" defaultChecked />
                <label htmlFor="marker-tsh" className="text-sm">TSH</label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="marker-hdl" defaultChecked />
                <label htmlFor="marker-hdl" className="text-sm">HDL</label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="marker-ldl" defaultChecked />
                <label htmlFor="marker-ldl" className="text-sm">LDL</label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="marker-iron" />
                <label htmlFor="marker-iron" className="text-sm">Iron</label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="marker-a1c" />
                <label htmlFor="marker-a1c" className="text-sm">HbA1c</label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="marker-ferritin" />
                <label htmlFor="marker-ferritin" className="text-sm">Ferritin</label>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Configure Biomarker Benchmarks</h4>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">Configure</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Biomarker Benchmarks</DialogTitle>
                    <DialogDescription>
                      Customize benchmark ranges for each biomarker by age and gender
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="flex items-center justify-between border-b pb-2">
                      <h4 className="font-medium">Vitamin D</h4>
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <Button variant="ghost" size="sm">Details</Button>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80">
                          <div className="space-y-2">
                            <h4 className="font-medium">Vitamin D Ranges</h4>
                            <p className="text-sm">Default: 30-80 ng/mL</p>
                            <p className="text-sm">Optimal: 50-70 ng/mL</p>
                            <p className="text-sm text-gray-500">Customize ranges by age and gender or use default for all patients.</p>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                    <div className="flex items-center justify-between border-b pb-2">
                      <h4 className="font-medium">TSH</h4>
                      <Button variant="ghost" size="sm">Details</Button>
                    </div>
                    <div className="flex items-center justify-between border-b pb-2">
                      <h4 className="font-medium">CRP</h4>
                      <Button variant="ghost" size="sm">Details</Button>
                    </div>
                    <div className="flex items-center justify-between border-b pb-2">
                      <h4 className="font-medium">Glucose</h4>
                      <Button variant="ghost" size="sm">Details</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Switch id="use-defaults" defaultChecked />
                        <label htmlFor="use-defaults" className="text-sm">Use default ranges when custom not available</label>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Dashboard Default Metrics</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <Checkbox id="dash-vo2" defaultChecked />
                <label htmlFor="dash-vo2" className="text-sm">VO2 Max</label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="dash-hrv" defaultChecked />
                <label htmlFor="dash-hrv" className="text-sm">HRV</label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="dash-skin" />
                <label htmlFor="dash-skin" className="text-sm">Skin Elasticity</label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="dash-hormone" defaultChecked />
                <label htmlFor="dash-hormone" className="text-sm">Hormone Markers</label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="dash-sleep" defaultChecked />
                <label htmlFor="dash-sleep" className="text-sm">Sleep Quality</label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="dash-steps" />
                <label htmlFor="dash-steps" className="text-sm">Daily Steps</label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 7. AI Preferences */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            <CardTitle>AI Preferences</CardTitle>
          </div>
          <CardDescription>
            Configure AI-powered features and recommendations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">AI-Generated Lab Insights</h4>
                <p className="text-sm text-gray-500">Enable automated insights from lab results</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Auto-assign Protocols</h4>
                <p className="text-sm text-gray-500">Suggest protocols based on biomarkers</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Behavioral Suggestions</h4>
                <p className="text-sm text-gray-500">Get next steps based on patient behavior</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Enable AI for Clients</h4>
                <p className="text-sm text-gray-500">Allow clients to access AI recommendations</p>
              </div>
              <Switch />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">LLM Model Selection</h4>
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <label htmlFor="model-labs" className="text-sm">Labs Analysis:</label>
                <Select defaultValue="gpt-4o">
                  <SelectTrigger id="model-labs" className="w-full max-w-xs">
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                    <SelectItem value="gpt-4o-mini">GPT-4o Mini</SelectItem>
                    <SelectItem value="gpt-4.5-preview">GPT-4.5 Preview</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <label htmlFor="model-scribe" className="text-sm">Medical Scribe:</label>
                <Select defaultValue="gpt-4o">
                  <SelectTrigger id="model-scribe" className="w-full max-w-xs">
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                    <SelectItem value="gpt-4o-mini">GPT-4o Mini</SelectItem>
                    <SelectItem value="gpt-4.5-preview">GPT-4.5 Preview</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <label htmlFor="model-protocol" className="text-sm">Protocol Development:</label>
                <Select defaultValue="gpt-4.5-preview">
                  <SelectTrigger id="model-protocol" className="w-full max-w-xs">
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                    <SelectItem value="gpt-4o-mini">GPT-4o Mini</SelectItem>
                    <SelectItem value="gpt-4.5-preview">GPT-4.5 Preview</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
