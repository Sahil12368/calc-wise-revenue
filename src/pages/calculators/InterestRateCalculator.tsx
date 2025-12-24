import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import { getCalculatorById } from '@/lib/calculators';
import CurrencySelector, { Currency, formatCurrency, getCurrencySymbol } from '@/components/calculator/CurrencySelector';

const InterestRateCalculator = () => {
  const calculator = getCalculatorById('interest-rate')!;
  
  const [currency, setCurrency] = useState<Currency>('USD');
  const [principal, setPrincipal] = useState('');
  const [finalAmount, setFinalAmount] = useState('');
  const [years, setYears] = useState('');
  const [result, setResult] = useState<{ rate: number; totalInterest: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(principal);
    const a = parseFloat(finalAmount);
    const t = parseFloat(years);

    if (isNaN(p) || isNaN(a) || isNaN(t) || p <= 0 || a <= 0 || t <= 0) return;

    // Using compound interest formula: A = P(1 + r)^t
    // Solving for r: r = (A/P)^(1/t) - 1
    const rate = (Math.pow(a / p, 1 / t) - 1) * 100;
    const totalInterest = a - p;

    setResult({ rate, totalInterest });
  };

  const reset = () => {
    setPrincipal('');
    setFinalAmount('');
    setYears('');
    setResult(null);
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      title="Interest Rate Calculator"
      description="Calculate the interest rate needed to grow your investment to a target amount."
      intro="Find out what interest rate you need to reach your financial goals. Enter your starting amount, target amount, and time period."
      formula="Rate = ((Final Amount / Principal)^(1/Years) - 1) × 100"
      example="To grow $10,000 to $15,000 in 5 years, you need an 8.45% annual return"
      faqs={[
        { question: 'Is this rate realistic?', answer: 'Average stock market returns are 7-10% annually. Rates above 10% carry higher risk.' },
        { question: 'Does this account for inflation?', answer: 'No, this is the nominal rate. Subtract inflation (typically 2-3%) for real returns.' },
        { question: 'What affects actual returns?', answer: 'Investment type, market conditions, fees, taxes, and compounding frequency all affect your actual returns.' },
      ]}
    >
      <div className="flex justify-end mb-4">
        <CurrencySelector value={currency} onChange={setCurrency} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <Label htmlFor="principal" className="mb-2 block">Starting Amount ({getCurrencySymbol(currency)})</Label>
          <Input id="principal" type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} placeholder="10000" className="calc-input" />
        </div>
        <div>
          <Label htmlFor="finalAmount" className="mb-2 block">Target Amount ({getCurrencySymbol(currency)})</Label>
          <Input id="finalAmount" type="number" value={finalAmount} onChange={(e) => setFinalAmount(e.target.value)} placeholder="15000" className="calc-input" />
        </div>
        <div>
          <Label htmlFor="years" className="mb-2 block">Time Period (years)</Label>
          <Input id="years" type="number" value={years} onChange={(e) => setYears(e.target.value)} placeholder="5" className="calc-input" />
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <Button onClick={calculate} className="calc-btn flex-1">Calculate</Button>
        <Button onClick={reset} variant="outline" className="calc-btn-secondary">Reset</Button>
      </div>

      {result && (
        <div className="calc-result animate-scale-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Required Interest Rate</p>
              <p className="calc-result-value">{result.rate.toFixed(2)}%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Interest Earned</p>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(result.totalInterest, currency)}</p>
            </div>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
};

export default InterestRateCalculator;
