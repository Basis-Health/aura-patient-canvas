
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

interface LoginFormProps {
  onSubmit: (email: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!email) {
      setError("Please enter your email address");
      return;
    }
    
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("Please enter a valid email address");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call to send verification code
    setTimeout(() => {
      setIsLoading(false);
      onSubmit(email);
    }, 1500);
  };

  return (
    <Card className="shadow-lg animate-fade-in">
      <CardHeader>
        <CardTitle>Log in to your account</CardTitle>
        <CardDescription>Enter your email to receive a verification code</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="coach@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
          </div>
          <Button type="submit" className="w-full mt-6" disabled={isLoading}>
            {isLoading ? "Sending code..." : "Continue"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-4">
        <p className="text-sm text-gray-500">
          Don't have an account? Contact your administrator
        </p>
      </CardFooter>
    </Card>
  );
};
