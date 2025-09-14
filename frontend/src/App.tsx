import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import About from "./pages/About";
import SuccessStories from "./pages/SuccessStories";
import Weather from "./pages/Weather";
import GetStarted from "./pages/GetStarted";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import YieldPrediction from "./pages/YieldPrediction";
import YieldPrediction_1 from "./pages/YieldPrediction_1";
import WeatherIntelligence from "./pages/WeatherIntelligence";
import SoilHealth from "./pages/SoilHealth";
import PestDisease from "./pages/PestDisease";
import Irrigation from "./pages/Irrigation";
import Performance from "./pages/Performance";
import ContactUs from "./pages/ContactUs";
import HelpDesk from "./pages/HelpDesk";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/get-started" element={<GetStarted />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />

          {/* Dashboard & Features */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/yield-prediction" element={<YieldPrediction_1 />} />
          <Route path="/weather-intelligence" element={<WeatherIntelligence />} />
          <Route path="/soil-health" element={<SoilHealth />} />
          <Route path="/pest-disease" element={<PestDisease />} />
          <Route path="/irrigation" element={<Irrigation />} />
          <Route path="/performance" element={<Performance />} />

          {/* Support */}
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/help" element={<HelpDesk />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
