import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import CurrencySelector, { Currency, formatCurrency, getCurrencySymbol } from '@/components/calculator/CurrencySelector';
import { getCalculatorById } from '@/lib/calculators';

const RetirementCalculator = () => {
  const calculator = getCalculatorById('retirement')!;
  
  const [currency, setCurrency] = useState<Currency>('USD');
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

  const symbol = getCurrencySymbol(currency);

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
      contentSections={[
        {
          title: 'What is a Retirement Calculator?',
          content: 'A retirement calculator helps you estimate how much money you will have saved by the time you retire. By inputting your current age, retirement age, existing savings, and monthly contributions, you can see how your nest egg will grow over time.\n\nThis tool is essential for retirement planning, helping you determine if you are on track to meet your goals or need to adjust your savings rate.',
        },
        {
          title: 'How to Use This Calculator',
          content: '1. Enter your current age\n2. Enter your planned retirement age\n3. Enter your current retirement savings\n4. Enter how much you can save monthly\n5. Enter your expected annual return rate\n6. Click "Calculate" to see your projected savings\n\nThe calculator shows your total at retirement, how much you contributed, and how much came from investment growth.',
        },
        {
          title: 'How Much Do You Need to Retire?',
          content: 'Common rules of thumb:\n\n• 25x Rule: Save 25 times your annual expenses. At 4% withdrawal, this lasts indefinitely.\n• 70-80% Rule: Plan to replace 70-80% of pre-retirement income.\n• Age-based milestones:\n  - By 30: 1x annual salary saved\n  - By 40: 3x annual salary saved\n  - By 50: 6x annual salary saved\n  - By 60: 8x annual salary saved\n  - By 67: 10x annual salary saved',
        },
        {
          title: 'The Power of Starting Early',
          content: 'Time is the most powerful factor in retirement savings:\n\nSaving $500/month at 7% annual return:\n• Start at 25, retire at 65: $1,199,122\n• Start at 35, retire at 65: $566,764\n• Start at 45, retire at 65: $248,587\n\nStarting 10 years earlier more than doubles your retirement savings! Every year you delay costs you significantly.',
        },
        {
          title: 'Retirement Account Types',
          content: '• 401(k)/403(b): Employer-sponsored, often with matching contributions. Tax-deferred growth.\n\n• Traditional IRA: Tax-deductible contributions, taxed at withdrawal.\n\n• Roth IRA: Contributions after-tax, but withdrawals are tax-free.\n\n• Pension: Defined benefit plan, becoming less common.\n\n• Social Security: Government benefit, should supplement—not replace—savings.\n\nMaximize employer matching first—it is free money!',
        },
      ]}
    >
      {/* Currency Selector */}
      <div className="flex items-center justify-between mb-4">
        <Label className="text-sm text-muted-foreground">Select Currency:</Label>
        <CurrencySelector value={currency} onChange={setCurrency} />
      </div>

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
          <Label htmlFor="currentSavings" className="mb-2 block">Current Savings ({symbol})</Label>
          <Input id="currentSavings" type="number" value={currentSavings} onChange={(e) => setCurrentSavings(e.target.value)} placeholder="10000" className="calc-input" />
        </div>
        <div>
          <Label htmlFor="monthlyContribution" className="mb-2 block">Monthly Contribution ({symbol})</Label>
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
              <p className="calc-result-value">{formatCurrency(result.total, currency)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Contributions</p>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(result.contributions, currency)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Interest Earned</p>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(result.interest, currency)}</p>
            </div>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
};

export default RetirementCalculator;
