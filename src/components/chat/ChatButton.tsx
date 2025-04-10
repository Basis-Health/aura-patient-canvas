
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bot, MessageCircle, X, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatButtonProps {
  onOpenCopilotChat: () => void;
  onOpenClientChat: () => void;
}

const ChatButton = ({ onOpenCopilotChat, onOpenClientChat }: ChatButtonProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2">
      {/* Expanded options */}
      {isExpanded && (
        <>
          <Button 
            onClick={onOpenCopilotChat}
            className="rounded-full flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            <Bot size={18} />
            <span>AI Copilot</span>
          </Button>
          
          <Button 
            onClick={onOpenClientChat}
            className="rounded-full flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
          >
            <MessageCircle size={18} />
            <span>Chat with Client</span>
          </Button>
        </>
      )}

      {/* Main button */}
      <Button
        onClick={toggleExpanded}
        className={cn(
          "rounded-full h-14 w-14 flex items-center justify-center shadow-lg",
          isExpanded ? "bg-gray-700 hover:bg-gray-800" : "bg-primary hover:bg-primary/90"
        )}
      >
        {isExpanded ? <X size={20} /> : <ChevronUp size={20} />}
      </Button>
    </div>
  );
};

export default ChatButton;
