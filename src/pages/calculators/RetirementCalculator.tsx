import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import { getCalculatorById } from '@/lib/calculators';

const RetirementCalculator = () => {
  const calculator = getCalculatorById('retirement')!;
  
  const [currentAge, setCurrentAge] = useState('');
  const [retirementAge, setRetirementAge] = useState('');
  const [currentSavings, setCurrentSavings] = useState('');
  const [monthlyContribution, setMonthlyContribution] = useState('');
  const [rate, setRate] = useState('');
  const [result, setResult] = useState<{ total: number; contributions: number; interest: number } | null>(null);

  const calculate = () => {
    const current = parseInt(currentAge);
    const retirement = parseInt(retirementAge);
    const savings = parseFloat(currentSavings) || 0;
    const monthly = parseFloat(monthlyContribution);
    const r = parseFloat(rate) / 100 / 12;

    if (isNaN(current) || isNaN(retirement) || isNaN(monthly) || retirement <= current) return;

    const months = (retirement - current) * 12;
    
    // Future value of current savings
    const fvSavings = savings * Math.pow(1 + r, months);
    
    // Future value of monthly contributions
    const fvContributions = monthly * ((Math.pow(1 + r, months) - 1) / r);
    
    const total = fvSavings + fvContributions;
    const contributions = savings + (monthly * months);
    const interest = total - contributions;

    setResult({ total, contributions, interest });
  };

  const reset = () => {
    setCurrentAge('');
    setRetirementAge('');
    setCurrentSavings('');
    setMonthlyContribution('');
    setRate('');
    setResult(null);
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      title="Retirement Calculator"
      description="Plan your retirement savings and see how much you'll have when you retire."
      intro="Our retirement calculator helps you estimate your retirement savings based on your current age, savings, and monthly contributions. Start planning for a secure future."
      formula="FV = PV × (1 + r)^n + PMT × [(1 + r)^n - 1] / r"
      example="Starting at 30 with $10,000, saving $500/month at 7% until 65: Total = $1,052,346"
      faqs={[
        { question: 'How much should I save for retirement?', answer: 'A common rule is to save 10-15% of your income. Aim to replace 70-80% of your pre-retirement income.' },
        { question: 'What return rate should I expect?', answer: 'Historically, the stock market has averaged about 7-10% annually. A conservative estimate is 6-7% after inflation.' },
        { question: 'When should I start saving?', answer: 'The earlier the better! Starting at 25 vs 35 can nearly double your retirement savings due to compound interest.' },
      ]}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div>
          <Label htmlFor="currentAge" className="mb-2 block">Current Age</Label>
          <Input id="currentAge" type="number" value={currentAge} onChange={(e) => setCurrentAge(e.target.value)} placeholder="30" className="calc-input" />
        </div>
        <div>
          <Label htmlFor="retirementAge" className="mb-2 block">Retirement Age</Label>
          <Input id="retirementAge" type="number" value={retirementAge} onChange={(e) => setRetirementAge(e.target.value)} placeholder="65" className="calc-input" />
        </div>
        <div>
          <Label htmlFor="currentSavings" className="mb-2 block">Current Savings ($)</Label>
          <Input id="currentSavings" type="number" value={currentSavings} onChange={(e) => setCurrentSavings(e.target.value)} placeholder="10000" className="calc-input" />
        </div>
        <div>
          <Label htmlFor="monthlyContribution" className="mb-2 block">Monthly Contribution ($)</Label>
          <Input id="monthlyContribution" type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)} placeholder="500" className="calc-input" />
        </div>
        <div>
          <Label htmlFor="rate" className="mb-2 block">Expected Return (%)</Label>
          <Input id="rate" type="number" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="7.0" className="calc-input" />
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <Button onClick={calculate} className="calc-btn flex-1">Calculate</Button>
        <Button onClick={reset} variant="outline" className="calc-btn-secondary">Reset</Button>
      </div>

      {result && (
        <div className="calc-result animate-scale-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Retirement Savings</p>
              <p className="calc-result-value">${result.total.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Contributions</p>
              <p className="text-2xl font-bold text-foreground">${result.contributions.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Interest Earned</p>
              <p className="text-2xl font-bold text-foreground">${result.interest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
            </div>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
};

export default RetirementCalculator;
