import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import CurrencySelector, { Currency, formatCurrency, getCurrencySymbol } from '@/components/calculator/CurrencySelector';
import { getCalculatorById } from '@/lib/calculators';

const AutoLoanCalculator = () => {
  const calculator = getCalculatorById('auto-loan')!;
  
  const [currency, setCurrency] = useState<Currency>('USD');
  const [price, setPrice] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [rate, setRate] = useState('');
  const [months, setMonths] = useState('');
  const [result, setResult] = useState<{ monthly: number; total: number; interest: number; loanAmount: number } | null>(null);

  const calculate = () => {
    const carPrice = parseFloat(price);
    const down = parseFloat(downPayment) || 0;
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(months);

    if (isNaN(carPrice) || isNaN(n) || carPrice <= 0 || n <= 0) return;

    const p = carPrice - down;
    
    if (r === 0) {
      const monthly = p / n;
      setResult({ monthly, total: p, interest: 0, loanAmount: p });
      return;
    }

    const monthly = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = monthly * n;
    const interest = total - p;

    setResult({ monthly, total, interest, loanAmount: p });
  };

  const reset = () => {
    setPrice('');
    setDownPayment('');
    setRate('');
    setMonths('');
    setResult(null);
  };

  const symbol = getCurrencySymbol(currency);

  return (
    <CalculatorLayout
      calculator={calculator}
      title="Auto Loan Calculator"
      description="Calculate your car loan monthly payments, total cost, and interest with down payment options."
      intro="Use our auto loan calculator to estimate monthly payments and total costs for your car purchase. Factor in down payment and trade-in value."
      formula="Monthly Payment = (Loan Amount × r × (1+r)^n) / ((1+r)^n - 1), where Loan Amount = Vehicle Price - Down Payment"
      example="For a $25,000 car with $5,000 down at 5% for 60 months: Monthly Payment = $377.42, Total Interest = $2,645.48"
      faqs={[
        { question: 'What is a good down payment for a car?', answer: 'A 20% down payment is ideal for new cars and 10% for used cars. This reduces your loan amount and monthly payments.' },
        { question: 'How long should my car loan be?', answer: 'Shorter loans (36-48 months) cost less in interest but have higher payments. Longer loans (60-72 months) have lower payments but more total interest.' },
        { question: 'Does my credit score affect my rate?', answer: 'Yes, a higher credit score typically qualifies you for lower interest rates, which can save thousands over the life of the loan.' },
      ]}
    >
      {/* Currency Selector */}
      <div className="flex items-center justify-between mb-4">
        <Label className="text-sm text-muted-foreground">Select Currency:</Label>
        <CurrencySelector value={currency} onChange={setCurrency} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <Label htmlFor="price" className="mb-2 block">Vehicle Price ({symbol})</Label>
          <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="25000" className="calc-input" />
        </div>
        <div>
          <Label htmlFor="downPayment" className="mb-2 block">Down Payment ({symbol})</Label>
          <Input id="downPayment" type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} placeholder="5000" className="calc-input" />
        </div>
        <div>
          <Label htmlFor="rate" className="mb-2 block">Interest Rate (%)</Label>
          <Input id="rate" type="number" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="5.0" className="calc-input" />
        </div>
        <div>
          <Label htmlFor="months" className="mb-2 block">Loan Term (months)</Label>
          <Input id="months" type="number" value={months} onChange={(e) => setMonths(e.target.value)} placeholder="60" className="calc-input" />
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <Button onClick={calculate} className="calc-btn flex-1">Calculate</Button>
        <Button onClick={reset} variant="outline" className="calc-btn-secondary">Reset</Button>
      </div>

      {result && (
        <div className="calc-result animate-scale-in">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Monthly Payment</p>
              <p className="calc-result-value text-2xl">{formatCurrency(result.monthly, currency)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Loan Amount</p>
              <p className="text-xl font-bold text-foreground">{formatCurrency(result.loanAmount, currency)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Payment</p>
              <p className="text-xl font-bold text-foreground">{formatCurrency(result.total, currency)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Interest</p>
              <p className="text-xl font-bold text-foreground">{formatCurrency(result.interest, currency)}</p>
            </div>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
};

export default AutoLoanCalculator;
