
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreditCard, Download, FileText, PlusCircle, CheckCircle, Clock, AlertCircle, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

// Mock invoice data
const invoices = [
  { 
    id: "INV-001", 
    clientName: "John Smith", 
    date: "2025-03-15", 
    amount: "$250.00", 
    status: "paid",
    service: "Initial Consultation"
  },
  { 
    id: "INV-002", 
    clientName: "Emily Johnson", 
    date: "2025-03-20", 
    amount: "$175.00", 
    status: "pending",
    service: "Follow-up Session"
  },
  { 
    id: "INV-003", 
    clientName: "Michael Brown", 
    date: "2025-03-22", 
    amount: "$450.00", 
    status: "paid",
    service: "Comprehensive Assessment"
  },
  { 
    id: "INV-004", 
    clientName: "Sarah Davis", 
    date: "2025-03-25", 
    amount: "$320.00", 
    status: "overdue",
    service: "Wellness Program"
  },
  { 
    id: "INV-005", 
    clientName: "Alex Wilson", 
    date: "2025-03-28", 
    amount: "$200.00", 
    status: "pending",
    service: "Nutrition Consultation"
  }
];

// Mock subscription plans
const subscriptionPlans = [
  {
    name: "Basic",
    price: "$49",
    period: "monthly",
    features: [
      "Up to 100 clients",
      "Basic reporting",
      "Email support",
      "2 staff accounts"
    ],
    recommended: false
  },
  {
    name: "Professional",
    price: "$99",
    period: "monthly",
    features: [
      "Up to 500 clients",
      "Advanced analytics",
      "Priority email support",
      "10 staff accounts",
      "Custom branding"
    ],
    recommended: true
  },
  {
    name: "Enterprise",
    price: "$249",
    period: "monthly",
    features: [
      "Unlimited clients",
      "Custom reporting",
      "24/7 phone support",
      "Unlimited staff accounts",
      "White labeling",
      "API access"
    ],
    recommended: false
  }
];

const Billing = () => {
  const [activeTab, setActiveTab] = useState("invoices");
  const [createInvoiceOpen, setCreateInvoiceOpen] = useState(false);
  
  return (
    <DashboardLayout title="Billing & Subscription">
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="tax">Tax Settings</TabsTrigger>
        </TabsList>

        {/* Invoices Tab */}
        <TabsContent value="invoices" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Client Invoices</h2>
              <p className="text-gray-500">Manage and track client invoices</p>
            </div>
            <Dialog open={createInvoiceOpen} onOpenChange={setCreateInvoiceOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Invoice
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Create New Invoice</DialogTitle>
                  <DialogDescription>
                    Create a new invoice for your client.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="clientName" className="text-right">
                      Client
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select client" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="john">John Smith</SelectItem>
                        <SelectItem value="emily">Emily Johnson</SelectItem>
                        <SelectItem value="michael">Michael Brown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="service" className="text-right">
                      Service
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="consultation">Initial Consultation</SelectItem>
                        <SelectItem value="followup">Follow-up Session</SelectItem>
                        <SelectItem value="assessment">Comprehensive Assessment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="amount" className="text-right">
                      Amount
                    </Label>
                    <div className="relative col-span-3">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                      <Input id="amount" className="pl-7" placeholder="0.00" />
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">
                      Date
                    </Label>
                    <Input id="date" type="date" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="notes" className="text-right">
                      Notes
                    </Label>
                    <Input id="notes" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={() => setCreateInvoiceOpen(false)}>Create Invoice</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader className="px-6 py-5">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-md">Recent Invoices</CardTitle>
                  <CardDescription>View and manage client invoices</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.clientName}</TableCell>
                      <TableCell>{invoice.service}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{invoice.amount}</TableCell>
                      <TableCell>
                        {invoice.status === "paid" && (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 flex w-24 justify-center items-center gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Paid
                          </Badge>
                        )}
                        {invoice.status === "pending" && (
                          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 flex w-24 justify-center items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Pending
                          </Badge>
                        )}
                        {invoice.status === "overdue" && (
                          <Badge className="bg-red-100 text-red-800 hover:bg-red-100 flex w-24 justify-center items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            Overdue
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="border-t px-6 py-5 flex justify-between">
              <Button variant="outline">Previous</Button>
              <div className="text-sm text-gray-500">
                Showing 1-5 of 24 invoices
              </div>
              <Button variant="outline">Next</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Subscription Tab */}
        <TabsContent value="subscription" className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Your Subscription</h2>
            <p className="text-gray-500">Manage your subscription plan</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>Your current subscription details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-lg">Professional Plan</h3>
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/10">Active</Badge>
                  </div>
                  <p className="text-sm text-gray-500">Next billing date: April 15, 2025</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">$99/month</p>
                  <Button variant="outline" className="mt-2">Change Plan</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subscriptionPlans.map((plan) => (
              <Card key={plan.name} className={plan.recommended ? "border-primary shadow-md" : ""}>
                <CardHeader>
                  {plan.recommended && (
                    <Badge className="w-fit mb-2">Recommended</Badge>
                  )}
                  <CardTitle>{plan.name}</CardTitle>
                  <div>
                    <span className="text-2xl font-bold">{plan.price}</span>
                    <span className="text-gray-500">/{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant={plan.recommended ? "default" : "outline"} className="w-full">
                    {plan.recommended ? "Current Plan" : "Select Plan"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Payment Methods Tab */}
        <TabsContent value="payment-methods" className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Payment Methods</h2>
            <p className="text-gray-500">Manage your payment methods</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Your Payment Methods</CardTitle>
              <CardDescription>Manage the payment methods associated with your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-gray-100 rounded flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Visa ending in 4242</h3>
                    <p className="text-sm text-gray-500">Expires 12/2028</p>
                  </div>
                </div>
                <div>
                  <Badge>Default</Badge>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Payment Method
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Billing Address</CardTitle>
              <CardDescription>Your billing address information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <p className="font-medium">Basis Health Clinic</p>
                <p className="text-sm text-gray-500">123 Medical Plaza, Suite 100</p>
                <p className="text-sm text-gray-500">San Francisco, CA 94107</p>
                <p className="text-sm text-gray-500">United States</p>
              </div>
              <Button variant="outline">Update Billing Address</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tax Settings Tab */}
        <TabsContent value="tax" className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Tax Settings</h2>
            <p className="text-gray-500">Configure taxation rules and settings</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Tax Information</CardTitle>
              <CardDescription>Manage your tax settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Legal Name</Label>
                <Input id="businessName" defaultValue="Basis Health LLC" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxId">Tax ID / EIN</Label>
                <Input id="taxId" defaultValue="12-3456789" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxRate">Default Tax Rate (%)</Label>
                <Input id="taxRate" defaultValue="7.25" />
              </div>
              <div className="pt-4">
                <Button>Save Tax Information</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tax Documents</CardTitle>
              <CardDescription>Access your tax documents and reports</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <FileText className="h-6 w-6 text-gray-500" />
                  <div>
                    <h3 className="font-medium">2024 Annual Tax Report</h3>
                    <p className="text-sm text-gray-500">Generated on January 15, 2025</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-4 border rounded-lg flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <FileText className="h-6 w-6 text-gray-500" />
                  <div>
                    <h3 className="font-medium">2023 Annual Tax Report</h3>
                    <p className="text-sm text-gray-500">Generated on January 10, 2024</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Billing;
