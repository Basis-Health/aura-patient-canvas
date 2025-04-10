
import React, { useState } from "react";
import { Send, Phone, Video, FileUp, PlusCircle, Check, CheckCheck, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  content: string;
  sender: "clinician" | "client";
  timestamp: Date;
  status: "sending" | "sent" | "delivered" | "seen";
}

const ClientChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Good morning Dr. Smith! I've been following the treatment plan as discussed.",
      sender: "client",
      timestamp: new Date(Date.now() - 3600000),
      status: "seen",
    },
    {
      id: "2",
      content: "Great to hear! How are you feeling after a week on the new medication?",
      sender: "clinician",
      timestamp: new Date(Date.now() - 3500000),
      status: "seen",
    },
    {
      id: "3",
      content: "I'm noticing some improvement in symptoms, but still having occasional headaches in the evening.",
      sender: "client",
      timestamp: new Date(Date.now() - 3000000),
      status: "seen",
    },
  ]);
  const [input, setInput] = useState("");
  const [showActions, setShowActions] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const newMessage = {
      id: Date.now().toString(),
      content: input,
      sender: "clinician" as const,
      timestamp: new Date(),
      status: "sending" as const,
    };
    
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    
    // Simulate message status updates
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: "sent" as const } : msg
        )
      );
      
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === newMessage.id ? { ...msg, status: "delivered" as const } : msg
          )
        );
        
        setTimeout(() => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === newMessage.id ? { ...msg, status: "seen" as const } : msg
            )
          );
        }, 1000);
      }, 1000);
    }, 500);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sending":
        return <div className="h-3 w-3 rounded-full bg-gray-300 animate-pulse" />;
      case "sent":
        return <Check className="h-3 w-3 text-gray-500" />;
      case "delivered":
        return <CheckCheck className="h-3 w-3 text-gray-500" />;
      case "seen":
        return <CheckCheck className="h-3 w-3 text-primary" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center">
            <User className="h-5 w-5 text-gray-500" />
          </div>
          <div>
            <h2 className="font-medium">Jane Doe</h2>
            <p className="text-xs text-gray-500">Active now</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "client" ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === "client"
                  ? "bg-gray-100 text-gray-800"
                  : "bg-primary text-primary-foreground"
              }`}
            >
              <div className="text-sm">{message.content}</div>
              <div className="flex items-center justify-end gap-1 mt-1">
                <span className="text-xs opacity-70">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                {message.sender === "clinician" && getStatusIcon(message.status)}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="border-t p-4">
        <div className="flex gap-2 relative">
          <div className="relative">
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              className="rounded-full"
              onClick={() => setShowActions(!showActions)}
            >
              <PlusCircle className="h-5 w-5" />
            </Button>
            
            {showActions && (
              <div className="absolute bottom-full mb-2 left-0 bg-white shadow-lg rounded-lg p-2 flex gap-2">
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <FileUp className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Video className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 rounded-md bg-background border focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          
          <Button type="submit" size="icon" disabled={!input.trim()}>
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ClientChat;
