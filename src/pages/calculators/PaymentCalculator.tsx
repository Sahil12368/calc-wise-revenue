import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import CurrencySelector, { Currency, formatCurrency, getCurrencySymbol } from '@/components/calculator/CurrencySelector';
import { getCalculatorById } from '@/lib/calculators';

const PaymentCalculator = () => {
  const calculator = getCalculatorById('payment')!;
  
  const [currency, setCurrency] = useState<Currency>('USD');
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [months, setMonths] = useState('');
  const [result, setResult] = useState<{ monthly: number; biweekly: number; weekly: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(months);

    if (isNaN(p) || isNaN(n) || p <= 0 || n <= 0) return;

    let monthly: number;
    if (r === 0) {
      monthly = p / n;
    } else {
      monthly = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }

    const biweekly = monthly / 2;
    const weekly = monthly / 4;

    setResult({ monthly, biweekly, weekly });
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
      title="Payment Calculator"
      description="Calculate monthly, bi-weekly, and weekly payments for any loan amount."
      intro="Our payment calculator helps you understand your loan payments in different frequencies. See how much you'll pay monthly, bi-weekly, or weekly."
      formula="Monthly Payment = P × [r(1+r)^n] / [(1+r)^n - 1]"
      example="For a $15,000 loan at 6% for 48 months: Monthly = $352.28, Bi-weekly = $176.14, Weekly = $88.07"
      faqs={[
        { question: 'Is bi-weekly payment better?', answer: 'Bi-weekly payments can help you pay off your loan faster and save on interest, as you make 26 half-payments (13 full payments) per year instead of 12.' },
        { question: 'How are weekly payments calculated?', answer: 'Weekly payments are calculated by dividing the monthly payment by 4. This helps with budgeting if you get paid weekly.' },
        { question: 'Can I switch payment frequencies?', answer: 'Most lenders allow you to choose your payment frequency. Check with your lender about available options and any fees.' },
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
          <Input id="principal" type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} placeholder="15000" className="calc-input" />
        </div>
        <div>
          <Label htmlFor="rate" className="mb-2 block">Annual Interest Rate (%)</Label>
          <Input id="rate" type="number" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="6.0" className="calc-input" />
        </div>
        <div>
          <Label htmlFor="months" className="mb-2 block">Loan Term (months)</Label>
          <Input id="months" type="number" value={months} onChange={(e) => setMonths(e.target.value)} placeholder="48" className="calc-input" />
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
              <p className="text-sm text-muted-foreground mb-1">Bi-weekly Payment</p>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(result.biweekly, currency)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Weekly Payment</p>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(result.weekly, currency)}</p>
            </div>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
};

export default PaymentCalculator;
