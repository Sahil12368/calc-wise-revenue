import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import CurrencySelector, { Currency, formatCurrency, getCurrencySymbol } from '@/components/calculator/CurrencySelector';
import { getCalculatorById } from '@/lib/calculators';

const InflationCalculator = () => {
  const calculator = getCalculatorById('inflation')!;
  
  const [currency, setCurrency] = useState<Currency>('USD');
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [result, setResult] = useState<{ futureValue: number; purchasingPower: number; lostValue: number } | null>(null);

  const calculate = () => {
    const a = parseFloat(amount);
    const r = parseFloat(rate) / 100;
    const y = parseFloat(years);

    if (isNaN(a) || isNaN(r) || isNaN(y) || a <= 0 || y <= 0) return;

    const futureValue = a * Math.pow(1 + r, y);
    const purchasingPower = a / Math.pow(1 + r, y);
    const lostValue = a - purchasingPower;

    setResult({ futureValue, purchasingPower, lostValue });
  };

  const reset = () => {
    setAmount('');
    setRate('');
    setYears('');
    setResult(null);
  };

  const symbol = getCurrencySymbol(currency);

  return (
    <CalculatorLayout
      calculator={calculator}
      title="Inflation Calculator"
      description="Calculate how inflation affects the purchasing power of your money over time."
      intro="Understand how inflation erodes the value of your money. See what today's dollars will be worth in the future."
      formula="Future Price = Current Price × (1 + inflation rate)^years"
      example="$100 today at 3% inflation for 20 years = $180.61 to buy the same goods. Your $100 will have the purchasing power of $55.37."
      faqs={[
        { question: 'What is a typical inflation rate?', answer: 'The long-term average inflation rate in the US is about 3%. Recent years have seen both higher and lower rates.' },
        { question: 'How does inflation affect savings?', answer: 'If your savings earn less than the inflation rate, you lose purchasing power over time.' },
        { question: 'How can I protect against inflation?', answer: 'Invest in assets that historically outpace inflation, such as stocks, real estate, or inflation-protected securities (TIPS).' },
      ]}
    >
      {/* Currency Selector */}
      <div className="flex items-center justify-between mb-4">
        <Label className="text-sm text-muted-foreground">Select Currency:</Label>
        <CurrencySelector value={currency} onChange={setCurrency} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <Label htmlFor="amount" className="mb-2 block">Current Amount ({symbol})</Label>
          <Input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="100" className="calc-input" />
        </div>
        <div>
          <Label htmlFor="rate" className="mb-2 block">Inflation Rate (%)</Label>
          <Input id="rate" type="number" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="3.0" className="calc-input" />
        </div>
        <div>
          <Label htmlFor="years" className="mb-2 block">Years</Label>
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
              <p className="text-sm text-muted-foreground mb-1">Future Cost of Same Goods</p>
              <p className="calc-result-value">{formatCurrency(result.futureValue, currency)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Future Purchasing Power</p>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(result.purchasingPower, currency)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Value Lost to Inflation</p>
              <p className="text-2xl font-bold text-destructive">{formatCurrency(result.lostValue, currency)}</p>
            </div>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
};

export default InflationCalculator;
