import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import CurrencySelector, { Currency, formatCurrency, getCurrencySymbol } from '@/components/calculator/CurrencySelector';
import { getCalculatorById } from '@/lib/calculators';

const LoanCalculator = () => {
  const calculator = getCalculatorById('loan')!;
  
  const [currency, setCurrency] = useState<Currency>('USD');
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [months, setMonths] = useState('');
  const [result, setResult] = useState<{ monthly: number; total: number; interest: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(months);

    if (isNaN(p) || isNaN(r) || isNaN(n) || p <= 0 || n <= 0) return;

    if (r === 0) {
      const monthly = p / n;
      setResult({ monthly, total: p, interest: 0 });
      return;
    }

    const monthly = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = monthly * n;
    const interest = total - p;

    setResult({ monthly, total, interest });
  };

  const reset = () => {
    setPrincipal('');
    setRate('');
    setMonths('');
    setResult(null);
  };

  const symbol = getCurrencySymbol(currency);

  return (
    <CalculatorLayout
      calculator={calculator}
      title="Loan Calculator"
      description="Calculate loan payments, total interest, and create an amortization schedule for any type of loan."
      intro="Our free loan calculator helps you determine monthly payments and total costs for personal loans, car loans, or any fixed-term loan."
      formula="Monthly Payment = P × [r(1+r)^n] / [(1+r)^n - 1]"
      example="For a $10,000 loan at 8% APR for 36 months: Monthly Payment = $313.36, Total Interest = $1,281.04"
      faqs={[
        { question: 'What affects my loan payment?', answer: 'The loan amount, interest rate, and loan term all affect your monthly payment. A longer term means lower payments but more interest paid overall.' },
        { question: 'What is APR?', answer: 'APR (Annual Percentage Rate) is the yearly cost of borrowing, including interest and fees, expressed as a percentage.' },
        { question: 'How can I reduce my loan costs?', answer: 'You can reduce costs by making extra payments, choosing a shorter term, improving your credit score, or comparing rates from multiple lenders.' },
      ]}
    >
      {/* Currency Selector */}
      <div className="flex items-center justify-between mb-4">
        <Label className="text-sm text-muted-foreground">Select Currency:</Label>
        <CurrencySelector value={currency} onChange={setCurrency} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <Label htmlFor="principal" className="mb-2 block">Loan Amount ({symbol})</Label>
          <Input id="principal" type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} placeholder="10000" className="calc-input" />
        </div>
        <div>
          <Label htmlFor="rate" className="mb-2 block">Interest Rate (%)</Label>
          <Input id="rate" type="number" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="8.0" className="calc-input" />
        </div>
        <div>
          <Label htmlFor="months" className="mb-2 block">Loan Term (months)</Label>
          <Input id="months" type="number" value={months} onChange={(e) => setMonths(e.target.value)} placeholder="36" className="calc-input" />
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
              <p className="text-sm text-muted-foreground mb-1">Monthly Payment</p>
              <p className="calc-result-value">{formatCurrency(result.monthly, currency)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Payment</p>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(result.total, currency)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Interest</p>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(result.interest, currency)}</p>
            </div>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
};

export default LoanCalculator;
