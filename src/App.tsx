import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ScrollToTop from "@/components/common/ScrollToTop";
import Index from "./pages/Index";
import AllCalculators from "./pages/AllCalculators";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Disclaimer from "./pages/Disclaimer";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";

// Calculator pages - Math
import PercentageCalculator from "./pages/calculators/PercentageCalculator";
import AverageCalculator from "./pages/calculators/AverageCalculator";
import RatioCalculator from "./pages/calculators/RatioCalculator";
import ScientificCalculator from "./pages/calculators/ScientificCalculator";
import FractionCalculator from "./pages/calculators/FractionCalculator";
import RandomNumberCalculator from "./pages/calculators/RandomNumberCalculator";
import TriangleCalculator from "./pages/calculators/TriangleCalculator";
import StandardDeviationCalculator from "./pages/calculators/StandardDeviationCalculator";

// Calculator pages - Health
import BMICalculator from "./pages/calculators/BMICalculator";
import BMRCalculator from "./pages/calculators/BMRCalculator";
import CalorieCalculator from "./pages/calculators/CalorieCalculator";
import IdealWeightCalculator from "./pages/calculators/IdealWeightCalculator";
import BodyFatCalculator from "./pages/calculators/BodyFatCalculator";

// Calculator pages - Finance
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
import CompoundInterestCalculator from "./pages/calculators/CompoundInterestCalculator";
import SalaryCalculator from "./pages/calculators/SalaryCalculator";
import InterestRateCalculator from "./pages/calculators/InterestRateCalculator";
import SalesTaxCalculator from "./pages/calculators/SalesTaxCalculator";
import SimpleInterestCalculator from "./pages/calculators/SimpleInterestCalculator";
import EMICalculator from "./pages/calculators/EMICalculator";
import SavingsGoalCalculator from "./pages/calculators/SavingsGoalCalculator";

// Calculator pages - Other
import AgeCalculator from "./pages/calculators/AgeCalculator";
import DateDifferenceCalculator from "./pages/calculators/DateDifferenceCalculator";
import DateCalculator from "./pages/calculators/DateCalculator";
import TimeCalculator from "./pages/calculators/TimeCalculator";
import HoursCalculator from "./pages/calculators/HoursCalculator";
import GPACalculator from "./pages/calculators/GPACalculator";
import GradeCalculator from "./pages/calculators/GradeCalculator";
import ConcreteCalculator from "./pages/calculators/ConcreteCalculator";
import SubnetCalculator from "./pages/calculators/SubnetCalculator";
import PasswordGeneratorCalculator from "./pages/calculators/PasswordGeneratorCalculator";
import ConversionCalculator from "./pages/calculators/ConversionCalculator";
import PercentageToCGPACalculator from "./pages/calculators/PercentageToCGPACalculator";
import CGPAToPercentageCalculator from "./pages/calculators/CGPAToPercentageCalculator";
import MarksCalculator from "./pages/calculators/MarksCalculator";
import AttendanceCalculator from "./pages/calculators/AttendanceCalculator";

// Page tracking component
import { usePageTracking } from "./hooks/usePageTracking";

const PageTracker = ({ children }: { children: React.ReactNode }) => {
  usePageTracking();
  return <>{children}</>;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <PageTracker>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/calculators" element={<AllCalculators />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/disclaimer" element={<Disclaimer />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin" element={<Admin />} />
              
              {/* Math Calculators */}
              <Route path="/calculator/percentage" element={<PercentageCalculator />} />
              <Route path="/calculator/average" element={<AverageCalculator />} />
              <Route path="/calculator/ratio" element={<RatioCalculator />} />
              <Route path="/calculator/scientific" element={<ScientificCalculator />} />
              <Route path="/calculator/fraction" element={<FractionCalculator />} />
              <Route path="/calculator/random-number" element={<RandomNumberCalculator />} />
              <Route path="/calculator/triangle" element={<TriangleCalculator />} />
              <Route path="/calculator/standard-deviation" element={<StandardDeviationCalculator />} />
              
              {/* Health Calculators */}
              <Route path="/calculator/bmi" element={<BMICalculator />} />
              <Route path="/calculator/bmr" element={<BMRCalculator />} />
              <Route path="/calculator/calorie" element={<CalorieCalculator />} />
              <Route path="/calculator/ideal-weight" element={<IdealWeightCalculator />} />
              <Route path="/calculator/body-fat" element={<BodyFatCalculator />} />
              
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
              <Route path="/calculator/date" element={<DateCalculator />} />
              <Route path="/calculator/time" element={<TimeCalculator />} />
              <Route path="/calculator/hours" element={<HoursCalculator />} />
              <Route path="/calculator/gpa" element={<GPACalculator />} />
              <Route path="/calculator/grade" element={<GradeCalculator />} />
              <Route path="/calculator/concrete" element={<ConcreteCalculator />} />
              <Route path="/calculator/subnet" element={<SubnetCalculator />} />
              <Route path="/calculator/password-generator" element={<PasswordGeneratorCalculator />} />
              <Route path="/calculator/conversion" element={<ConversionCalculator />} />
              <Route path="/calculator/percentage-to-cgpa" element={<PercentageToCGPACalculator />} />
              <Route path="/calculator/cgpa-to-percentage" element={<CGPAToPercentageCalculator />} />
              <Route path="/calculator/marks" element={<MarksCalculator />} />
              <Route path="/calculator/attendance" element={<AttendanceCalculator />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageTracker>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
