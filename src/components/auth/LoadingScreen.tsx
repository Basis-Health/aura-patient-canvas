
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(30);
    }, 500);
    
    const timer2 = setTimeout(() => {
      setProgress(60);
    }, 1000);
    
    const timer3 = setTimeout(() => {
      setProgress(100);
    }, 2000);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);
  
  return (
    <Card className="shadow-lg animate-fade-in">
      <CardContent className="pt-6">
        <div className="space-y-6">
          <Progress value={progress} className="h-1" />
          
          <div className="py-8 flex flex-col items-center justify-center">
            <div className="rounded-full bg-primary/10 p-6 mb-4">
              <svg
                className="h-12 w-12 text-primary animate-pulse"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-center">Logging you in...</h3>
            <p className="text-sm text-gray-500 text-center mt-2">
              Preparing your dashboard
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
