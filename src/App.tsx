import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Clients from "./pages/Clients";
import Notes from "./pages/Notes";
import NotFound from "./pages/NotFound";
import ServicesProducts from "./pages/ServicesProducts";
import Labs from "./pages/Labs";
import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";
import CoachProfile from "./pages/CoachProfile";
import Login from "./pages/Login";
import FormComponents from "./pages/FormComponents";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Index />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/services-products" element={<ServicesProducts />} />
          <Route path="/labs" element={<Labs />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/coach-profile" element={<CoachProfile />} />
          <Route path="/form-components" element={<FormComponents />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
