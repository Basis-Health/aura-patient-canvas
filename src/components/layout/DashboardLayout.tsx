
import React from "react";
import { 
  Search, Bell, MessageSquare, Settings, Clock, ChevronLeft, 
  ChevronRight, Users, Calendar, LineChart, Beaker, FileText,
  Bot, MessageCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const DashboardLayout = ({ children, title }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex relative">
      {/* Sidebar */}
      <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-6 space-y-8">
        <div className="flex flex-col items-center space-y-8">
          <ChevronLeft className="h-5 w-5 text-gray-500" />
          <Link to="/">
            <Users className="h-5 w-5 text-gray-500 hover:text-primary transition-colors" />
          </Link>
          <Calendar className="h-5 w-5 text-gray-500" />
          <LineChart className="h-5 w-5 text-gray-500" />
          <Beaker className="h-5 w-5 text-gray-500" />
          <Link to="/notes">
            <FileText className="h-5 w-5 text-gray-500 hover:text-primary transition-colors" />
          </Link>
        </div>
        <div className="mt-auto">
          <Settings className="h-5 w-5 text-gray-500" />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">basis</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by client"
                className="pl-10 pr-4 py-2 rounded-md bg-gray-100 border-0 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none w-72"
              />
            </div>
            <div className="relative">
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">11</span>
              <Bell className="h-5 w-5 text-gray-500" />
            </div>
            <div className="relative">
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
              <MessageSquare className="h-5 w-5 text-gray-500" />
            </div>
            <Settings className="h-5 w-5 text-gray-500" />
            <div className="flex items-center space-x-1">
              <Clock className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-700">3:54 pm</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          {title && <h1 className="text-2xl font-bold mb-6">{title}</h1>}
          {children}
        </main>
      </div>

      {/* Sticky Chat Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4">
        {/* Copilot Chat Button */}
        <button className="bg-primary hover:bg-primary/90 text-white p-3 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105">
          <Bot className="h-6 w-6" />
        </button>
        
        {/* Client Chat Button */}
        <button className="bg-white hover:bg-gray-100 text-primary border border-gray-200 p-3 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105">
          <MessageCircle className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default DashboardLayout;
