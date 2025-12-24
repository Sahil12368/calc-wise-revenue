import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import CurrencySelector, { Currency, formatCurrency, getCurrencySymbol } from '@/components/calculator/CurrencySelector';
import { getCalculatorById } from '@/lib/calculators';

interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

const AmortizationCalculator = () => {
  const calculator = getCalculatorById('amortization')!;
  
  const [currency, setCurrency] = useState<Currency>('USD');
  const [loanAmount, setLoanAmount] = useState('');
  const [rate, setRate] = useState('');
  const [months, setMonths] = useState('');
  const [result, setResult] = useState<{ monthly: number; schedule: AmortizationRow[] } | null>(null);

  const calculate = () => {
    const p = parseFloat(loanAmount);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseInt(months);

    if (isNaN(p) || isNaN(r) || isNaN(n) || p <= 0 || r <= 0 || n <= 0) return;

    const monthly = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    
    const schedule: AmortizationRow[] = [];
    let balance = p;
    
    for (let i = 1; i <= Math.min(n, 60); i++) {
      const interest = balance * r;
      const principal = monthly - interest;
      balance -= principal;
      
      schedule.push({
        month: i,
        payment: monthly,
        principal,
        interest,
        balance: Math.max(0, balance),
      });
    }

    setResult({ monthly, schedule });
  };

  const reset = () => {
    setLoanAmount('');
    setRate('');
    setMonths('');
    setResult(null);
  };

  const symbol = getCurrencySymbol(currency);

  return (
    <CalculatorLayout
      calculator={calculator}
      title="Amortization Calculator"
      description="Generate a detailed loan amortization schedule showing principal and interest breakdown."
      intro="See exactly how your loan payments are split between principal and interest each month with our amortization calculator."
      formula="Monthly Payment = P × [r(1+r)^n] / [(1+r)^n - 1]"
      example="For a $100,000 loan at 6% for 360 months: First payment = $166.79 interest, $432.87 principal"
      faqs={[
        { question: 'What is amortization?', answer: 'Amortization is the process of spreading loan payments over time. Each payment includes both principal and interest.' },
        { question: 'Why does interest decrease over time?', answer: 'Interest is calculated on the remaining balance. As you pay down the principal, less interest accrues each month.' },
        { question: 'How can I pay off my loan faster?', answer: 'Making extra principal payments reduces your balance faster and decreases total interest paid.' },
      ]}
    >
      {/* Currency Selector */}
      <div className="flex items-center justify-between mb-4">
        <Label className="text-sm text-muted-foreground">Select Currency:</Label>
        <CurrencySelector value={currency} onChange={setCurrency} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <Label htmlFor="loanAmount" className="mb-2 block">Loan Amount ({symbol})</Label>
          <Input id="loanAmount" type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} placeholder="100000" className="calc-input" />
        </div>
        <div>
          <Label htmlFor="rate" className="mb-2 block">Annual Interest Rate (%)</Label>
          <Input id="rate" type="number" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="6.0" className="calc-input" />
        </div>
        <div>
          <Label htmlFor="months" className="mb-2 block">Loan Term (months)</Label>
          <Input id="months" type="number" value={months} onChange={(e) => setMonths(e.target.value)} placeholder="360" className="calc-input" />
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <Button onClick={calculate} className="calc-btn flex-1">Calculate</Button>
        <Button onClick={reset} variant="outline" className="calc-btn-secondary">Reset</Button>
      </div>

      {result && (
        <div className="animate-scale-in space-y-6">
          <div className="calc-result">
            <p className="text-sm text-muted-foreground mb-1 text-center">Monthly Payment</p>
            <p className="calc-result-value text-center">{formatCurrency(result.monthly, currency)}</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-2 px-3 text-left">Month</th>
                  <th className="py-2 px-3 text-right">Payment</th>
                  <th className="py-2 px-3 text-right">Principal</th>
                  <th className="py-2 px-3 text-right">Interest</th>
                  <th className="py-2 px-3 text-right">Balance</th>
                </tr>
              </thead>
              <tbody>
                {result.schedule.map((row) => (
                  <tr key={row.month} className="border-b border-border/50">
                    <td className="py-2 px-3">{row.month}</td>
                    <td className="py-2 px-3 text-right">{formatCurrency(row.payment, currency)}</td>
                    <td className="py-2 px-3 text-right">{formatCurrency(row.principal, currency)}</td>
                    <td className="py-2 px-3 text-right">{formatCurrency(row.interest, currency)}</td>
                    <td className="py-2 px-3 text-right">{formatCurrency(row.balance, currency)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {parseInt(months) > 60 && (
              <p className="text-sm text-muted-foreground mt-2 text-center">Showing first 60 months...</p>
            )}
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
};

export default AmortizationCalculator;
