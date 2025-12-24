import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import CurrencySelector, { Currency, formatCurrency, getCurrencySymbol } from '@/components/calculator/CurrencySelector';
import { getCalculatorById } from '@/lib/calculators';

const InvestmentCalculator = () => {
  const calculator = getCalculatorById('investment')!;
  
  const [currency, setCurrency] = useState<Currency>('USD');
  const [initial, setInitial] = useState('');
  const [monthly, setMonthly] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [result, setResult] = useState<{ total: number; invested: number; returns: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(initial) || 0;
    const pmt = parseFloat(monthly) || 0;
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(years) * 12;

    if (isNaN(n) || n <= 0 || (p === 0 && pmt === 0)) return;

    const fvInitial = p * Math.pow(1 + r, n);
    const fvMonthly = pmt * ((Math.pow(1 + r, n) - 1) / r);
    const total = fvInitial + fvMonthly;
    const invested = p + (pmt * n);
    const returns = total - invested;

    setResult({ total, invested, returns });
  };

  const reset = () => {
    setInitial('');
    setMonthly('');
    setRate('');
    setYears('');
    setResult(null);
  };

  const symbol = getCurrencySymbol(currency);

  return (
    <CalculatorLayout
      calculator={calculator}
      title="Investment Calculator"
      description="Calculate the future value of your investments with compound growth."
      intro="Plan your investment strategy with our calculator. See how your initial investment and regular contributions can grow over time."
      formula="FV = PV × (1 + r)^n + PMT × [(1 + r)^n - 1] / r"
      example="$5,000 initial + $200/month at 8% for 20 years = $142,374"
      faqs={[
        { question: 'What is compound growth?', answer: 'Compound growth means your returns generate their own returns. Over time, this creates exponential growth.' },
        { question: 'How does contribution timing affect returns?', answer: 'Earlier contributions have more time to compound, so starting early is more powerful than increasing contributions later.' },
        { question: 'What return rate should I use?', answer: 'Stock market historical average is 7-10%. Use a conservative estimate of 6-8% for long-term planning.' },
      ]}
    >
      {/* Currency Selector */}
      <div className="flex items-center justify-between mb-4">
        <Label className="text-sm text-muted-foreground">Select Currency:</Label>
        <CurrencySelector value={currency} onChange={setCurrency} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <Label htmlFor="initial" className="mb-2 block">Initial Investment ({symbol})</Label>
          <Input id="initial" type="number" value={initial} onChange={(e) => setInitial(e.target.value)} placeholder="5000" className="calc-input" />
        </div>
        <div>
          <Label htmlFor="monthly" className="mb-2 block">Monthly Contribution ({symbol})</Label>
          <Input id="monthly" type="number" value={monthly} onChange={(e) => setMonthly(e.target.value)} placeholder="200" className="calc-input" />
        </div>
        <div>
          <Label htmlFor="rate" className="mb-2 block">Expected Annual Return (%)</Label>
          <Input id="rate" type="number" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="8.0" className="calc-input" />
        </div>
        <div>
          <Label htmlFor="years" className="mb-2 block">Investment Period (years)</Label>
          <Input id="years" type="number" value={years} onChange={(e) => setYears(e.target.value)} placeholder="20" className="calc-input" />
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
              <p className="text-sm text-muted-foreground mb-1">Future Value</p>
              <p className="calc-result-value">{formatCurrency(result.total, currency)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Invested</p>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(result.invested, currency)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Investment Returns</p>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(result.returns, currency)}</p>
            </div>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
};

export default InvestmentCalculator;
