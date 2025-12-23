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

// New Financial Calculators
import MortgageCalculator from "./pages/calculators/MortgageCalculator";
import LoanCalculator from "./pages/calculators/LoanCalculator";
import AutoLoanCalculator from "./pages/calculators/AutoLoanCalculator";
import InterestCalculator from "./pages/calculators/InterestCalculator";
import PaymentCalculator from "./pages/calculators/PaymentCalculator";
import RetirementCalculator from "./pages/calculators/RetirementCalculator";
import AmortizationCalculator from "./pages/calculators/AmortizationCalculator";
import InvestmentCalculator from "./pages/calculators/InvestmentCalculator";
import InflationCalculator from "./pages/calculators/InflationCalculator";
import FinanceCalculator from "./pages/calculators/FinanceCalculator";
import IncomeTaxCalculator from "./pages/calculators/IncomeTaxCalculator";
import SalaryCalculator from "./pages/calculators/SalaryCalculator";
import InterestRateCalculator from "./pages/calculators/InterestRateCalculator";
import SalesTaxCalculator from "./pages/calculators/SalesTaxCalculator";

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
          
          {/* Math Calculators */}
          <Route path="/calculator/percentage" element={<PercentageCalculator />} />
          <Route path="/calculator/average" element={<AverageCalculator />} />
          <Route path="/calculator/ratio" element={<RatioCalculator />} />
          
          {/* Health Calculators */}
          <Route path="/calculator/bmi" element={<BMICalculator />} />
          <Route path="/calculator/bmr" element={<BMRCalculator />} />
          <Route path="/calculator/calorie" element={<CalorieCalculator />} />
          <Route path="/calculator/ideal-weight" element={<IdealWeightCalculator />} />
          
          {/* Finance Calculators */}
          <Route path="/calculator/mortgage" element={<MortgageCalculator />} />
          <Route path="/calculator/loan" element={<LoanCalculator />} />
          <Route path="/calculator/auto-loan" element={<AutoLoanCalculator />} />
          <Route path="/calculator/interest" element={<InterestCalculator />} />
          <Route path="/calculator/payment" element={<PaymentCalculator />} />
          <Route path="/calculator/retirement" element={<RetirementCalculator />} />
          <Route path="/calculator/amortization" element={<AmortizationCalculator />} />
          <Route path="/calculator/investment" element={<InvestmentCalculator />} />
          <Route path="/calculator/inflation" element={<InflationCalculator />} />
          <Route path="/calculator/finance" element={<FinanceCalculator />} />
          <Route path="/calculator/income-tax" element={<IncomeTaxCalculator />} />
          <Route path="/calculator/compound-interest" element={<CompoundInterestCalculator />} />
          <Route path="/calculator/salary" element={<SalaryCalculator />} />
          <Route path="/calculator/interest-rate" element={<InterestRateCalculator />} />
          <Route path="/calculator/sales-tax" element={<SalesTaxCalculator />} />
          <Route path="/calculator/simple-interest" element={<SimpleInterestCalculator />} />
          <Route path="/calculator/emi" element={<EMICalculator />} />
          <Route path="/calculator/savings-goal" element={<SavingsGoalCalculator />} />
          
          {/* Other Calculators */}
          <Route path="/calculator/age" element={<AgeCalculator />} />
          <Route path="/calculator/date-difference" element={<DateDifferenceCalculator />} />
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
