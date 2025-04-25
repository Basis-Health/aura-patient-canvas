
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { ArrowLeft } from "lucide-react";

interface VerificationFormProps {
  email: string;
  onSubmit: () => void;
}

export const VerificationForm: React.FC<VerificationFormProps> = ({ email, onSubmit }) => {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (value.length !== 4) {
      setError("Please enter the complete verification code");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call to verify code
    setTimeout(() => {
      if (value === "1234") { // For demo purposes only
        onSubmit();
      } else {
        setIsLoading(false);
        setError("Invalid verification code. Please try again.");
      }
    }, 1000);
  };

  return (
    <Card className="shadow-lg animate-fade-in">
      <CardHeader>
        <CardTitle>Verify your email</CardTitle>
        <CardDescription>
          We've sent a 4-digit code to {email}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="flex justify-center">
              <InputOTP
                maxLength={4}
                value={value}
                onChange={setValue}
                disabled={isLoading}
                render={({ slots }) => (
                  <InputOTPGroup>
                    {slots.map((slot, index) => (
                      <InputOTPSlot key={index} {...slot} index={index} />
                    ))}
                  </InputOTPGroup>
                )}
              />
            </div>
            {error && (
              <p className="text-sm text-red-500 text-center mt-2">{error}</p>
            )}
            <Button type="submit" className="w-full mt-2" disabled={isLoading}>
              {isLoading ? "Verifying..." : "Verify & Log in"}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 border-t pt-4">
        <p className="text-sm text-center text-gray-500">
          Didn't receive a code? <button className="text-primary underline">Resend</button>
        </p>
        <button 
          className="flex items-center text-sm text-gray-500"
          onClick={() => window.location.reload()}
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to login
        </button>
      </CardFooter>
    </Card>
  );
};
