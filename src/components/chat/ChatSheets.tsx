
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import CopilotChat from "./CopilotChat";
import ClientChat from "./ClientChat";
import { Bot, MessageCircle } from "lucide-react";
import { Sparkles } from "lucide-react";

export const ChatButtons = () => {
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [clientOpen, setClientOpen] = useState(false);
  
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
      {/* Copilot Chat Button */}
      <Sheet open={copilotOpen} onOpenChange={setCopilotOpen}>
        <SheetTrigger asChild>
          <button className="bg-primary hover:bg-primary/90 text-white p-3 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105 group relative">
            <Bot className="h-6 w-6 absolute group-hover:opacity-0 transition-opacity" />
            <Sparkles className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse absolute" />
          </button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[400px] p-0 sm:max-w-md">
          <CopilotChat />
        </SheetContent>
      </Sheet>

      {/* Client Chat Button */}
      <Sheet open={clientOpen} onOpenChange={setClientOpen}>
        <SheetTrigger asChild>
          <button className="bg-white hover:bg-gray-100 text-primary border border-gray-200 p-3 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105">
            <MessageCircle className="h-6 w-6" />
          </button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[400px] p-0 sm:max-w-md">
          <ClientChat />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ChatButtons;
