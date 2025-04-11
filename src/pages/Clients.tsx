
import React, { useState } from "react";
import { 
  EyeIcon, 
  DownloadIcon, 
  MoreVerticalIcon,
  PlusIcon,
  SearchIcon 
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface Client {
  id: string;
  name: string;
  email: string;
  membership: string;
  status: "Active" | "Pending Invite";
  latestAppointment: string;
  joinedDate: string;
  avatarInitials: string;
  avatarColor: string;
}

const mockClients: Client[] = [
  {
    id: "1",
    name: "Anni Roseboro",
    email: "jordanroseboro@yahoo.com",
    membership: "All Access - West Hollywood",
    status: "Pending Invite",
    latestAppointment: "Not yet",
    joinedDate: "Fri Feb 21 2025",
    avatarInitials: "AR",
    avatarColor: "bg-green-500"
  },
  {
    id: "2",
    name: "Jordan Roseboro",
    email: "jordantroseboro@gmail.com",
    membership: "All Access - West Hollywood",
    status: "Pending Invite",
    latestAppointment: "Not yet",
    joinedDate: "Fri Feb 14 2025",
    avatarInitials: "JR",
    avatarColor: "bg-amber-700"
  },
  {
    id: "3",
    name: "Konstantin Rolf",
    email: "konstantin.rolf@gmail.com",
    membership: "Free",
    status: "Active",
    latestAppointment: "Not yet",
    joinedDate: "Wed Feb 5 2025",
    avatarInitials: "KR",
    avatarColor: "bg-red-500"
  },
  {
    id: "4",
    name: "Emma Thompson",
    email: "emma.thompson@gmail.com",
    membership: "Premium - Beverly Hills",
    status: "Active",
    latestAppointment: "Mar 15, 2025",
    joinedDate: "Mon Jan 12 2025",
    avatarInitials: "ET",
    avatarColor: "bg-blue-500"
  },
  {
    id: "5",
    name: "Michael Chen",
    email: "michael.chen@outlook.com",
    membership: "All Access - West Hollywood",
    status: "Active",
    latestAppointment: "Mar 22, 2025",
    joinedDate: "Tue Jan 7 2025",
    avatarInitials: "MC",
    avatarColor: "bg-purple-500"
  },
  {
    id: "6",
    name: "Sarah Johnson",
    email: "sarah.johnson@doctor.com",
    membership: "Staff",
    status: "Active",
    latestAppointment: "Apr 5, 2025",
    joinedDate: "Mon Dec 15 2024",
    avatarInitials: "SJ",
    avatarColor: "bg-orange-500"
  }
];

const Clients = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [clients, setClients] = useState<Client[]>(mockClients);
  const navigate = useNavigate();

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewClient = (clientId: string) => {
    navigate('/'); // Navigate to the patient profile page
  };

  return (
    <DashboardLayout title="Clients">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-2">Clients</h1>
            <p className="text-gray-600 mb-6">
              Invite clients to your clinic and manage existing members
            </p>

            <div className="flex justify-between items-center mb-6">
              <div className="relative w-64">
                <SearchIcon className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  placeholder="Type to search..." 
                  className="pl-10" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button>
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Members
              </Button>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Name</TableHead>
                    <TableHead>Membership</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Latest Appointment</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.map((client) => (
                    <TableRow 
                      key={client.id} 
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleViewClient(client.id)}
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <Avatar className={`${client.avatarColor} h-9 w-9`}>
                            <AvatarFallback className="text-white">
                              {client.avatarInitials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{client.name}</div>
                            <div className="text-sm text-gray-500">{client.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{client.membership}</TableCell>
                      <TableCell>
                        <Badge variant={client.status === "Active" ? "secondary" : "outline"}>
                          {client.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{client.latestAppointment}</TableCell>
                      <TableCell>{client.joinedDate}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewClient(client.id);
                            }}
                          >
                            <EyeIcon className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <DownloadIcon className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreVerticalIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Clients;
