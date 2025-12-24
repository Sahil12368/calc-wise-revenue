import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import CurrencySelector, { Currency, formatCurrency, getCurrencySymbol } from '@/components/calculator/CurrencySelector';
import { getCalculatorById } from '@/lib/calculators';

const CompoundInterestCalculator = () => {
  const calculator = getCalculatorById('compound-interest')!;
  
  const [currency, setCurrency] = useState<Currency>('INR');
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [frequency, setFrequency] = useState('12');
  const [result, setResult] = useState<{ amount: number; interest: number; simple: number } | null>(null);
  const [error, setError] = useState('');

  const frequencies = [
    { value: '1', label: 'Annually' },
    { value: '2', label: 'Semi-Annually' },
    { value: '4', label: 'Quarterly' },
    { value: '12', label: 'Monthly' },
    { value: '365', label: 'Daily' },
  ];

  const calculate = () => {
    const P = parseFloat(principal);
    const R = parseFloat(rate) / 100;
    const T = parseFloat(time);
    const n = parseFloat(frequency);

    if (isNaN(P) || isNaN(R) || isNaN(T) || P <= 0 || R <= 0 || T <= 0) {
      setError('Please enter valid positive values');
      setResult(null);
      return;
    }

    setError('');

    // Compound Interest Formula: A = P(1 + r/n)^(nt)
    const amount = P * Math.pow(1 + R / n, n * T);
    const interest = amount - P;
    const simple = P * (parseFloat(rate) / 100) * T;

    setResult({ amount, interest, simple });
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
      title="Compound Interest Calculator"
      description="Calculate compound interest with different compounding frequencies. Compare growth of your investments over time."
      intro="See how your money grows with compound interest. Enter your investment details and compounding frequency to calculate returns."
      formula="A = P × (1 + r/n)^(n×t)
Where: A = Final Amount, P = Principal, r = Annual Rate (decimal), n = Compounding Frequency, t = Time (years)"
      example={`Principal: ₹1,00,000
Rate: 10% per year
Time: 5 years
Compounding: Monthly (n=12)

A = 1,00,000 × (1 + 0.10/12)^(12×5)
A = 1,00,000 × 1.6453
A = ₹1,64,530.89
Interest Earned: ₹64,530.89`}
      faqs={[
        {
          question: 'What does compounding frequency mean?',
          answer: 'Compounding frequency is how often interest is calculated and added to your principal. More frequent compounding (e.g., monthly vs yearly) results in higher returns.',
        },
        {
          question: 'Is compound interest better than simple interest?',
          answer: 'For investments, yes! Compound interest earns "interest on interest" and grows exponentially. For loans, it means you pay more over time.',
        },
        {
          question: 'What is the Rule of 72?',
          answer: 'The Rule of 72 estimates how long it takes to double your money. Divide 72 by the interest rate. At 8%, money doubles in about 9 years.',
        },
      ]}
      contentSections={[
        {
          title: 'What is Compound Interest?',
          content: 'Compound interest is often called "interest on interest" because you earn returns not just on your original principal, but also on the interest that has already accumulated. This creates exponential growth over time, making it one of the most powerful concepts in finance.\n\nAlbert Einstein allegedly called compound interest "the eighth wonder of the world." Whether he said it or not, the principle holds true—compound interest can dramatically grow your wealth over time.',
        },
        {
          title: 'How to Use This Calculator',
          content: '1. Enter your principal (starting) amount\n2. Enter the annual interest rate\n3. Enter the time period in years\n4. Select how often interest is compounded\n5. Click "Calculate" to see your results\n\nThe calculator shows your final amount, compound interest earned, and compares it to what you would earn with simple interest.',
        },
        {
          title: 'The Power of Compounding Frequency',
          content: 'More frequent compounding leads to higher returns:\n\n• Annually (n=1): Interest calculated once per year\n• Semi-Annually (n=2): Twice per year\n• Quarterly (n=4): Four times per year\n• Monthly (n=12): Twelve times per year\n• Daily (n=365): Every day\n\nThe difference becomes more significant with larger amounts and longer time periods.',
        },
        {
          title: 'Compound Interest vs Simple Interest',
          content: 'Simple Interest: Calculated only on the original principal. Formula: I = P × R × T\n\nCompound Interest: Calculated on principal plus accumulated interest. Formula: A = P(1 + r/n)^(nt)\n\nExample with ₹1,00,000 at 10% for 10 years:\n• Simple Interest: ₹1,00,000 in interest\n• Compound Interest (annual): ₹1,59,374 in interest\n\nYou earn 59% more with compound interest!',
        },
        {
          title: 'Real-World Applications',
          content: '• Savings Accounts: Banks compound interest on your deposits\n• Fixed Deposits: Higher rates with compound growth\n• Mutual Funds: Returns reinvested for compounding\n• Retirement Accounts: Long-term compounding builds wealth\n• Loans: Understanding compound interest helps avoid debt traps\n• Credit Cards: High compound rates make debt grow quickly',
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
          <Input id="principal" type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} placeholder="e.g., 100000" className="calc-input" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="rate" className="mb-2 block">Annual Interest Rate (%)</Label>
            <Input id="rate" type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="e.g., 10" className="calc-input" />
          </div>
          <div>
            <Label htmlFor="time" className="mb-2 block">Time Period (years)</Label>
            <Input id="time" type="number" step="0.5" value={time} onChange={(e) => setTime(e.target.value)} placeholder="e.g., 5" className="calc-input" />
          </div>
        </div>
        <div>
          <Label className="mb-2 block">Compounding Frequency</Label>
          <Select value={frequency} onValueChange={setFrequency}>
            <SelectTrigger className="w-full sm:w-64"><SelectValue /></SelectTrigger>
            <SelectContent>
              {frequencies.map((f) => (
                <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
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
          <div className="text-center mb-6">
            <p className="text-sm text-muted-foreground mb-2">Final Amount</p>
            <p className="calc-result-value">{formatCurrency(result.amount, currency)}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
            <div className="text-center p-3 bg-background rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Compound Interest</p>
              <p className="text-lg font-bold text-success">{formatCurrency(result.interest, currency)}</p>
            </div>
            <div className="text-center p-3 bg-background rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">If Simple Interest</p>
              <p className="text-lg font-bold text-muted-foreground">{formatCurrency(result.simple, currency)}</p>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-sm text-center text-muted-foreground">
              You earn <span className="text-success font-semibold">{formatCurrency(result.interest - result.simple, currency)}</span> more with compound interest!
            </p>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
};

export default CompoundInterestCalculator;
