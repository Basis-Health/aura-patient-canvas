
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Calendar as CalendarIcon, Clock, MoreVertical, User, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for the dashboard
const mockAlerts = [
  { id: "1", patient: "Maria Johnson", issue: "Blood test results show elevated LDL cholesterol levels", priority: "high", date: "2025-04-09T08:30:00Z" },
  { id: "2", patient: "James Wilson", issue: "Missed appointment for follow-up consultation", priority: "medium", date: "2025-04-08T14:15:00Z" },
  { id: "3", patient: "George Georgallides", issue: "HbA1c levels trending upward in latest lab results", priority: "medium", date: "2025-04-08T11:20:00Z" },
  { id: "4", patient: "Sarah Miller", issue: "Protocol adherence below 40% for the past week", priority: "high", date: "2025-04-09T09:45:00Z" },
  { id: "5", patient: "Robert Chen", issue: "Follow-up required for new medication side effects", priority: "low", date: "2025-04-07T16:30:00Z" },
];

const mockStats = {
  totalClients: 247,
  activeProtocols: 183,
  upcomingAppointments: 18,
  todayAppointments: 8,
};

const mockAppointments = [
  { id: "1", patient: "George Georgallides", type: "Video Consultation", time: "09:30 AM - 10:00 AM", status: "confirmed" },
  { id: "2", patient: "Emma Watson", type: "In-person Visit", time: "11:15 AM - 12:00 PM", status: "confirmed" },
  { id: "3", patient: "Michael Scott", type: "Lab Review", time: "01:30 PM - 02:00 PM", status: "confirmed" },
  { id: "4", patient: "Jennifer Lopez", type: "Initial Consultation", time: "03:00 PM - 04:00 PM", status: "confirmed" },
  { id: "5", patient: "David Kim", type: "Follow-up", time: "04:30 PM - 05:00 PM", status: "confirmed" },
];

const mockUpcoming = [
  { id: "1", patient: "Lisa Johnson", type: "Video Consultation", date: "Tomorrow, 10:00 AM" },
  { id: "2", patient: "Alex Rodriguez", type: "Initial Consultation", date: "Tomorrow, 02:30 PM" },
  { id: "3", patient: "Sophia Miller", type: "Lab Review", date: "Apr 12, 09:15 AM" },
  { id: "4", patient: "William Chen", type: "Follow-up", date: "Apr 12, 11:30 AM" },
  { id: "5", patient: "Olivia Smith", type: "Protocol Review", date: "Apr 13, 01:45 PM" },
];

const Dashboard = () => {
  return (
    <DashboardLayout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats Overview */}
        <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Clients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalClients}</div>
              <p className="text-xs text-muted-foreground mt-1">+4 this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Protocols</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.activeProtocols}</div>
              <p className="text-xs text-muted-foreground mt-1">{Math.round((mockStats.activeProtocols / mockStats.totalClients) * 100)}% of clients</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Today's Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.todayAppointments}</div>
              <p className="text-xs text-muted-foreground mt-1">Next: 09:30 AM</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.upcomingAppointments}</div>
              <p className="text-xs text-muted-foreground mt-1">Next 7 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Attention Required */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold mb-4">Requiring Attention</h2>
          <div className="space-y-3">
            {mockAlerts.map(alert => (
              <Alert key={alert.id} className={`border-l-4 ${alert.priority === 'high' ? 'border-l-red-500' : alert.priority === 'medium' ? 'border-l-amber-500' : 'border-l-blue-500'}`}>
                <AlertTriangle className={`h-4 w-4 ${alert.priority === 'high' ? 'text-red-500' : alert.priority === 'medium' ? 'text-amber-500' : 'text-blue-500'}`} />
                <AlertTitle className="flex justify-between items-center">
                  <Link to="/clients" className="font-medium hover:underline">{alert.patient}</Link>
                  <div className="text-xs text-muted-foreground">
                    {new Date(alert.date).toLocaleDateString()}
                  </div>
                </AlertTitle>
                <AlertDescription className="mt-1">
                  {alert.issue}
                </AlertDescription>
              </Alert>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-2">View All Alerts</Button>
        </div>

        {/* Today's Schedule */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Today's Schedule</h2>
            <Link to="/calendar">
              <Button variant="ghost" size="sm" className="text-xs gap-1">
                <CalendarIcon className="h-3 w-3" />
                Full Calendar
              </Button>
            </Link>
          </div>

          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium text-sm">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {mockAppointments.map(appointment => (
                <div key={appointment.id} className="p-3 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <Link to="/clients" className="font-medium text-sm hover:underline">{appointment.patient}</Link>
                      <div className="flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{appointment.time}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-xs bg-blue-50 text-blue-700 rounded-full px-2 py-0.5">{appointment.type}</span>
                      <div className="mt-1 text-xs text-right text-muted-foreground capitalize">{appointment.status}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Appointments Preview */}
          <div>
            <h3 className="text-sm font-medium mb-2">Upcoming Appointments</h3>
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="divide-y divide-gray-100">
                {mockUpcoming.slice(0, 3).map(appointment => (
                  <div key={appointment.id} className="p-3 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <Link to="/clients" className="font-medium text-sm hover:underline">{appointment.patient}</Link>
                        <div className="flex items-center gap-1 mt-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{appointment.date}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-xs bg-blue-50 text-blue-700 rounded-full px-2 py-0.5">{appointment.type}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-2 border-t border-gray-200">
                <Button variant="ghost" size="sm" className="w-full text-xs">View All Upcoming</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
