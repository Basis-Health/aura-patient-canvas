
import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Send, 
  Paperclip, 
  Phone, 
  Video, 
  FileText, 
  Check, 
  CheckCheck,
  Plus
} from 'lucide-react';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Message {
  content: string;
  sender: 'client' | 'clinician';
  timestamp: Date;
  status: 'sent' | 'delivered' | 'seen';
}

interface ClientChatProps {
  isOpen: boolean;
  onClose: () => void;
  clientName: string;
  clientAvatar?: string;
}

const ClientChat = ({ isOpen, onClose, clientName, clientAvatar }: ClientChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "Hi Dr. Anant, I've been following the protocol you recommended. My energy levels have improved.",
      sender: 'client',
      timestamp: new Date(Date.now() - 60000 * 32), // 32 mins ago
      status: 'seen'
    },
    {
      content: "That's excellent news, George! How are you feeling about the berberine supplementation?",
      sender: 'clinician',
      timestamp: new Date(Date.now() - 60000 * 30), // 30 mins ago
      status: 'seen'
    },
    {
      content: "I think it's helping. My glucose readings have been more stable. I haven't experienced any side effects yet.",
      sender: 'client',
      timestamp: new Date(Date.now() - 60000 * 25), // 25 mins ago
      status: 'seen'
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      content: inputValue,
      sender: 'clinician',
      timestamp: new Date(),
      status: 'sent'
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    
    // Simulate message delivery
    setTimeout(() => {
      setMessages(prev => 
        prev.map((msg, idx) => 
          idx === prev.length - 1 ? {...msg, status: 'delivered'} : msg
        )
      );
    }, 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <Check className="h-3 w-3 text-gray-400" />;
      case 'delivered':
        return <Check className="h-3 w-3 text-gray-400" />;
      case 'seen':
        return <CheckCheck className="h-3 w-3 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col h-full">
        <SheetHeader className="p-4 border-b">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={clientAvatar} />
                <AvatarFallback>{clientName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <SheetTitle>{clientName}</SheetTitle>
                <SheetDescription className="text-xs flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  Online
                </SheetDescription>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost">
                <Phone className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost">
                <Video className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </SheetHeader>
        
        <div className="flex-1 overflow-auto p-4">
          {/* Group messages by date */}
          <div className="flex justify-center mb-4">
            <div className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full">
              {formatDate(messages[0]?.timestamp)}
            </div>
          </div>
          
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex mb-4 ${message.sender === 'clinician' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'client' && (
                <Avatar className="mr-2 h-8 w-8">
                  <AvatarImage src={clientAvatar} />
                  <AvatarFallback>{clientName.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              
              <div className={`max-w-[75%] rounded-lg p-3 ${
                message.sender === 'clinician' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-gray-100'
              }`}>
                <p className="text-sm">{message.content}</p>
                <div className="flex justify-end items-center gap-1 mt-1">
                  <span className="text-[10px] opacity-70">
                    {formatTime(message.timestamp)}
                  </span>
                  {message.sender === 'clinician' && getStatusIcon(message.status)}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t">
          <div className="flex items-end gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Plus className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48" align="start">
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="ghost" className="flex flex-col items-center justify-center h-16">
                    <Paperclip className="h-5 w-5 mb-1" />
                    <span className="text-xs">File</span>
                  </Button>
                  <Button variant="ghost" className="flex flex-col items-center justify-center h-16">
                    <Phone className="h-5 w-5 mb-1" />
                    <span className="text-xs">Call</span>
                  </Button>
                  <Button variant="ghost" className="flex flex-col items-center justify-center h-16">
                    <Video className="h-5 w-5 mb-1" />
                    <span className="text-xs">Video</span>
                  </Button>
                  <Button variant="ghost" className="flex flex-col items-center justify-center h-16">
                    <FileText className="h-5 w-5 mb-1" />
                    <span className="text-xs">Form</span>
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 rounded-full"
            />
            
            <Button onClick={handleSendMessage} size="icon" className="rounded-full">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ClientChat;
