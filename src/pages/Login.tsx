
import React, { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { VerificationForm } from "@/components/auth/VerificationForm";
import { LoadingScreen } from "@/components/auth/LoadingScreen";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"email" | "verification" | "loading">("email");
  const navigate = useNavigate();

  const handleEmailSubmit = (submittedEmail: string) => {
    setEmail(submittedEmail);
    setStep("verification");
  };

  const handleVerificationSubmit = () => {
    setStep("loading");
    // Simulate authentication process
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-50 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 text-primary">basis</h1>
          <p className="text-gray-600">Your coaching platform</p>
        </div>

        {step === "email" && (
          <LoginForm onSubmit={handleEmailSubmit} />
        )}
        
        {step === "verification" && (
          <VerificationForm email={email} onSubmit={handleVerificationSubmit} />
        )}
        
        {step === "loading" && (
          <LoadingScreen />
        )}
      </div>
    </div>
  );
};

export default Login;
