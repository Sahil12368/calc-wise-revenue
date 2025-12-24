import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import CurrencySelector, { Currency, formatCurrency, getCurrencySymbol } from '@/components/calculator/CurrencySelector';
import { getCalculatorById } from '@/lib/calculators';

const SimpleInterestCalculator = () => {
  const calculator = getCalculatorById('simple-interest')!;
  
  const [currency, setCurrency] = useState<Currency>('INR');
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [result, setResult] = useState<{ interest: number; total: number } | null>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    const P = parseFloat(principal);
    const R = parseFloat(rate);
    const T = parseFloat(time);

    if (isNaN(P) || isNaN(R) || isNaN(T) || P <= 0 || R <= 0 || T <= 0) {
      setError('Please enter valid positive values');
      setResult(null);
      return;
    }

    setError('');
    const interest = (P * R * T) / 100;
    const total = P + interest;
    setResult({ interest, total });
  };

  const reset = () => {
    setPrincipal('');
    setRate('');
    setTime('');
    setResult(null);
    setError('');
  };

  const symbol = getCurrencySymbol(currency);

  return (
    <CalculatorLayout
      calculator={calculator}
      title="Simple Interest Calculator"
      description="Calculate simple interest on your investments or loans. Find interest amount and total return with our free calculator."
      intro="Calculate simple interest quickly. Enter principal amount, interest rate, and time period to see your earnings or payment."
      formula="Simple Interest = (P × R × T) / 100
Total Amount = Principal + Interest
Where: P = Principal, R = Rate (%), T = Time (years)"
      example={`Principal: ₹50,000
Rate: 8% per year
Time: 3 years

Interest = (50,000 × 8 × 3) / 100 = ₹12,000
Total Amount = ₹50,000 + ₹12,000 = ₹62,000`}
      faqs={[
        {
          question: 'What is simple interest?',
          answer: 'Simple interest is calculated only on the principal amount. The interest remains constant each year, unlike compound interest which grows exponentially.',
        },
        {
          question: 'Where is simple interest commonly used?',
          answer: 'Simple interest is used in car loans, short-term personal loans, and some fixed deposits. It\'s simpler to calculate but yields less than compound interest.',
        },
        {
          question: 'How is simple interest different from compound interest?',
          answer: 'Simple interest is calculated on principal only. Compound interest is calculated on principal plus accumulated interest, making it grow faster over time.',
        },
      ]}
    >
      {/* Currency Selector */}
      <div className="flex items-center justify-between mb-4">
        <Label className="text-sm text-muted-foreground">Select Currency:</Label>
        <CurrencySelector value={currency} onChange={setCurrency} />
      </div>

      {/* Input Fields */}
      <div className="space-y-4 mb-6">
        <div>
          <Label htmlFor="principal" className="mb-2 block">Principal Amount ({symbol})</Label>
          <Input id="principal" type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} placeholder="e.g., 50000" className="calc-input" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="rate" className="mb-2 block">Interest Rate (% per year)</Label>
            <Input id="rate" type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="e.g., 8" className="calc-input" />
          </div>
          <div>
            <Label htmlFor="time" className="mb-2 block">Time Period (years)</Label>
            <Input id="time" type="number" step="0.5" value={time} onChange={(e) => setTime(e.target.value)} placeholder="e.g., 3" className="calc-input" />
          </div>
        </div>
      </div>

      {error && <p className="text-destructive text-sm mb-4">{error}</p>}

      {/* Buttons */}
      <div className="flex gap-3 mb-6">
        <Button onClick={calculate} className="calc-btn flex-1">Calculate</Button>
        <Button onClick={reset} variant="outline" className="calc-btn-secondary">Reset</Button>
      </div>

      {/* Result */}
      {result && (
        <div className="calc-result animate-scale-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="text-center p-4 bg-background rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Interest Earned</p>
              <p className="text-2xl font-bold text-success">{formatCurrency(result.interest, currency)}</p>
            </div>
            <div className="text-center p-4 bg-background rounded-lg border-2 border-primary">
              <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
              <p className="text-2xl font-bold text-primary">{formatCurrency(result.total, currency)}</p>
            </div>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
};

export default SimpleInterestCalculator;
