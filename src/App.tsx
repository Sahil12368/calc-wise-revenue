import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AllCalculators from "./pages/AllCalculators";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Disclaimer from "./pages/Disclaimer";
import NotFound from "./pages/NotFound";

// Calculator pages
import PercentageCalculator from "./pages/calculators/PercentageCalculator";
import AgeCalculator from "./pages/calculators/AgeCalculator";
import DateDifferenceCalculator from "./pages/calculators/DateDifferenceCalculator";
import AverageCalculator from "./pages/calculators/AverageCalculator";
import RatioCalculator from "./pages/calculators/RatioCalculator";
import BMICalculator from "./pages/calculators/BMICalculator";
import BMRCalculator from "./pages/calculators/BMRCalculator";
import CalorieCalculator from "./pages/calculators/CalorieCalculator";
import IdealWeightCalculator from "./pages/calculators/IdealWeightCalculator";
import EMICalculator from "./pages/calculators/EMICalculator";
import SimpleInterestCalculator from "./pages/calculators/SimpleInterestCalculator";
import CompoundInterestCalculator from "./pages/calculators/CompoundInterestCalculator";
import SavingsGoalCalculator from "./pages/calculators/SavingsGoalCalculator";
import PercentageToCGPACalculator from "./pages/calculators/PercentageToCGPACalculator";
import CGPAToPercentageCalculator from "./pages/calculators/CGPAToPercentageCalculator";
import MarksCalculator from "./pages/calculators/MarksCalculator";
import AttendanceCalculator from "./pages/calculators/AttendanceCalculator";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/calculators" element={<AllCalculators />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          
          {/* Calculator routes */}
          <Route path="/calculator/percentage" element={<PercentageCalculator />} />
          <Route path="/calculator/age" element={<AgeCalculator />} />
          <Route path="/calculator/date-difference" element={<DateDifferenceCalculator />} />
          <Route path="/calculator/average" element={<AverageCalculator />} />
          <Route path="/calculator/ratio" element={<RatioCalculator />} />
          <Route path="/calculator/bmi" element={<BMICalculator />} />
          <Route path="/calculator/bmr" element={<BMRCalculator />} />
          <Route path="/calculator/calorie" element={<CalorieCalculator />} />
          <Route path="/calculator/ideal-weight" element={<IdealWeightCalculator />} />
          <Route path="/calculator/emi" element={<EMICalculator />} />
          <Route path="/calculator/simple-interest" element={<SimpleInterestCalculator />} />
          <Route path="/calculator/compound-interest" element={<CompoundInterestCalculator />} />
          <Route path="/calculator/savings-goal" element={<SavingsGoalCalculator />} />
          <Route path="/calculator/percentage-to-cgpa" element={<PercentageToCGPACalculator />} />
          <Route path="/calculator/cgpa-to-percentage" element={<CGPAToPercentageCalculator />} />
          <Route path="/calculator/marks" element={<MarksCalculator />} />
          <Route path="/calculator/attendance" element={<AttendanceCalculator />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
