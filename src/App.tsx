import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Guests from "./pages/Guests";
import Reservations from "./pages/Reservations";
import InHouse from "./pages/InHouse";
import Rooms from "./pages/Rooms";
import Agencies from "./pages/Agencies";
import Communications from "./pages/Communications";
import Reports from "./pages/Reports";
import Tasks from "./pages/Tasks";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/guests" element={<Guests />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/in-house" element={<InHouse />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/agencies" element={<Agencies />} />
          <Route path="/communications" element={<Communications />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
