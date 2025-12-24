import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import CurrencySelector, { Currency, formatCurrency, getCurrencySymbol } from '@/components/calculator/CurrencySelector';
import { getCalculatorById } from '@/lib/calculators';

const MortgageCalculator = () => {
  const calculator = getCalculatorById('mortgage')!;
  
  const [currency, setCurrency] = useState<Currency>('USD');
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [result, setResult] = useState<{ monthly: number; total: number; interest: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(years) * 12;

    if (isNaN(p) || isNaN(r) || isNaN(n) || p <= 0 || r <= 0 || n <= 0) {
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
    setYears('');
    setResult(null);
  };

  const symbol = getCurrencySymbol(currency);

  return (
    <CalculatorLayout
      calculator={calculator}
      title="Mortgage Calculator"
      description="Calculate your monthly mortgage payments, total payment amount, and interest paid over the life of the loan."
      intro="Use our free mortgage calculator to estimate your monthly home loan payments. Enter the loan amount, interest rate, and loan term to see your payment breakdown."
      formula="M = P × [r(1+r)^n] / [(1+r)^n - 1] where M = monthly payment, P = principal, r = monthly interest rate, n = number of payments"
      example="For a $300,000 mortgage at 6% interest over 30 years: Monthly Payment = $1,798.65, Total Interest = $347,514.57"
      faqs={[
        { question: 'What is included in a mortgage payment?', answer: 'A mortgage payment typically includes principal, interest, property taxes, and homeowners insurance (PITI). This calculator shows principal and interest only.' },
        { question: 'How much house can I afford?', answer: 'Generally, your monthly housing costs should not exceed 28% of your gross monthly income. Use this calculator to find a payment that fits your budget.' },
        { question: 'Should I get a 15 or 30-year mortgage?', answer: 'A 15-year mortgage has higher monthly payments but saves significantly on interest. A 30-year mortgage has lower payments but costs more over time.' },
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
          <Input id="principal" type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} placeholder="300000" className="calc-input" />
        </div>
        <div>
          <Label htmlFor="rate" className="mb-2 block">Interest Rate (%)</Label>
          <Input id="rate" type="number" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="6.0" className="calc-input" />
        </div>
        <div>
          <Label htmlFor="years" className="mb-2 block">Loan Term (years)</Label>
          <Input id="years" type="number" value={years} onChange={(e) => setYears(e.target.value)} placeholder="30" className="calc-input" />
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

export default MortgageCalculator;
