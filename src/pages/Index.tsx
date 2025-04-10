
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Bell, Calendar as CalendarIcon, ChevronRight, Clock, User, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AttentionItem {
  id: string;
  clientId: string;
  clientName: string;
  note: string;
  type: "biomarker" | "appointment" | "protocol" | "task";
  priority: "high" | "medium" | "low";
  date: string;
}

interface AppointmentItem {
  id: string;
  clientId: string;
  clientName: string;
  time: string;
  duration: string;
  type: string;
}

interface ClinicStat {
  title: string;
  value: string | number;
  change?: {
    value: string;
    trend: "up" | "down";
  };
  icon: React.ReactNode;
}

const mockAttentionItems: AttentionItem[] = [
  {
    id: "1",
    clientId: "1",
    clientName: "Jordan Roseboro",
    note: "Has out of range biomarkers that require review",
    type: "biomarker",
    priority: "high",
    date: "Today"
  },
  {
    id: "2",
    clientId: "3",
    clientName: "Konstantin Rolf",
    note: "Missed appointment on April 8th",
    type: "appointment",
    priority: "medium",
    date: "2 days ago"
  },
  {
    id: "3",
    clientId: "2",
    clientName: "Anni Roseboro",
    note: "Protocol adherence below 50% for 2 weeks",
    type: "protocol",
    priority: "high",
    date: "Yesterday"
  },
  {
    id: "4",
    clientId: "4",
    clientName: "Emma Thompson",
    note: "Follow-up task due for recent lab results",
    type: "task",
    priority: "medium",
    date: "Today"
  }
];

const mockClinicStats: ClinicStat[] = [
  {
    title: "Total Clients",
    value: 126,
    change: {
      value: "12%",
      trend: "up"
    },
    icon: <Users className="h-5 w-5 text-gray-400" />
  },
  {
    title: "Active Protocols",
    value: 57,
    change: {
      value: "5%",
      trend: "up"
    },
    icon: <Bell className="h-5 w-5 text-gray-400" />
  },
  {
    title: "Appointments Today",
    value: 8,
    icon: <CalendarIcon className="h-5 w-5 text-gray-400" />
  },
  {
    title: "Pending Invites",
    value: 14,
    change: {
      value: "2",
      trend: "down"
    },
    icon: <User className="h-5 w-5 text-gray-400" />
  }
];

const mockTodayAppointments: AppointmentItem[] = [
  {
    id: "1",
    clientId: "6",
    clientName: "Sarah Johnson",
    time: "9:00 AM",
    duration: "30 min",
    type: "Initial Consultation"
  },
  {
    id: "2",
    clientId: "5",
    clientName: "Michael Chen",
    time: "10:30 AM",
    duration: "45 min",
    type: "Follow-up"
  },
  {
    id: "3",
    clientId: "4",
    clientName: "Emma Thompson",
    time: "1:15 PM",
    duration: "30 min",
    type: "Protocol Review"
  },
  {
    id: "4",
    clientId: "3",
    clientName: "Konstantin Rolf",
    time: "3:00 PM",
    duration: "45 min",
    type: "Lab Results Review"
  }
];

const mockUpcomingAppointments: AppointmentItem[] = [
  {
    id: "5",
    clientId: "2",
    clientName: "Anni Roseboro",
    time: "11:00 AM",
    duration: "30 min",
    type: "Initial Consultation",
  },
  {
    id: "6",
    clientId: "1",
    clientName: "Jordan Roseboro",
    time: "2:30 PM",
    duration: "45 min",
    type: "Follow-up",
  }
];

const Index = () => {
  const navigate = useNavigate();
  const today = new Date();

  const handleClientClick = (clientId: string) => {
    navigate('/'); // Navigate to client profile
  };

  const getPriorityColor = (priority: "high" | "medium" | "low") => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-amber-100 text-amber-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <DashboardLayout title="Dashboard">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Clinic Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockClinicStats.map((stat, index) => (
            <Card key={index} className="bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                {stat.change && (
                  <p className={`text-xs ${stat.change.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {stat.change.trend === 'up' ? '↑' : '↓'} {stat.change.value} from last month
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Items Requiring Attention */}
          <div className="lg:col-span-2">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Requires Your Attention</CardTitle>
                <CardDescription>
                  Items that need review or follow-up
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAttentionItems.map((item) => (
                    <div 
                      key={item.id}
                      className="flex items-start border-b border-gray-100 pb-4 cursor-pointer hover:bg-gray-50 p-2 rounded-md"
                      onClick={() => handleClientClick(item.clientId)}
                    >
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium text-gray-900">{item.clientName}</h3>
                          <Badge variant="outline" className={getPriorityColor(item.priority)}>
                            {item.priority}
                          </Badge>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{item.note}</p>
                        <div className="mt-2 flex items-center text-xs text-gray-500">
                          <Clock className="mr-1 h-3 w-3" />
                          {item.date}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" size="sm" className="mt-4 w-full flex justify-between">
                  View all items <ChevronRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Calendar View */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>
                {today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar 
                mode="single"
                selected={today}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
        </div>

        {/* Today's Appointments */}
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Today's Appointments</CardTitle>
              <CardDescription>
                {today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              Schedule New
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Today</h3>
                {mockTodayAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {mockTodayAppointments.map((appointment) => (
                      <div 
                        key={appointment.id} 
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-md cursor-pointer hover:border-primary hover:shadow-sm"
                        onClick={() => handleClientClick(appointment.clientId)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="bg-primary/10 text-primary rounded-full p-2">
                            <Clock className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-medium">{appointment.clientName}</h4>
                            <p className="text-sm text-gray-500">{appointment.type}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{appointment.time}</p>
                          <p className="text-sm text-gray-500">{appointment.duration}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No appointments scheduled for today.</p>
                )}
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Tomorrow</h3>
                {mockUpcomingAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {mockUpcomingAppointments.map((appointment) => (
                      <div 
                        key={appointment.id} 
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-md cursor-pointer hover:border-primary hover:shadow-sm"
                        onClick={() => handleClientClick(appointment.clientId)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="bg-gray-100 text-gray-600 rounded-full p-2">
                            <Clock className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-medium">{appointment.clientName}</h4>
                            <p className="text-sm text-gray-500">{appointment.type}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{appointment.time}</p>
                          <p className="text-sm text-gray-500">{appointment.duration}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No appointments scheduled for tomorrow.</p>
                )}
                <Button variant="ghost" size="sm" className="mt-6 w-full flex justify-between">
                  View full schedule <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Index;
