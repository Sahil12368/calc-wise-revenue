import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import { getCalculatorById } from '@/lib/calculators';

const FinanceCalculator = () => {
  const calculator = getCalculatorById('finance')!;
  
  const [mode, setMode] = useState<'fv' | 'pv' | 'pmt'>('fv');
  const [pv, setPv] = useState('');
  const [fv, setFv] = useState('');
  const [rate, setRate] = useState('');
  const [periods, setPeriods] = useState('');
  const [pmt, setPmt] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const r = parseFloat(rate) / 100;
    const n = parseFloat(periods);

    if (isNaN(r) || isNaN(n) || n <= 0) return;

    let res: number;

    switch (mode) {
      case 'fv': {
        const principal = parseFloat(pv);
        if (isNaN(principal)) return;
        res = principal * Math.pow(1 + r, n);
        setResult(`Future Value: $${res.toFixed(2)}`);
        break;
      }
      case 'pv': {
        const future = parseFloat(fv);
        if (isNaN(future)) return;
        res = future / Math.pow(1 + r, n);
        setResult(`Present Value: $${res.toFixed(2)}`);
        break;
      }
      case 'pmt': {
        const principal = parseFloat(pv);
        if (isNaN(principal)) return;
        res = (principal * r) / (1 - Math.pow(1 + r, -n));
        setResult(`Payment: $${res.toFixed(2)}`);
        break;
      }
    }
  };

  const reset = () => {
    setPv('');
    setFv('');
    setRate('');
    setPeriods('');
    setPmt('');
    setResult(null);
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      title="Finance Calculator"
      description="A general-purpose financial calculator for various time value of money calculations."
      intro="Calculate future value, present value, or payment amounts with our versatile finance calculator."
      formula="FV = PV × (1 + r)^n | PV = FV / (1 + r)^n | PMT = PV × r / [1 - (1 + r)^-n]"
      example="$10,000 invested at 5% for 10 years: FV = $16,288.95"
      faqs={[
        { question: 'What is time value of money?', answer: 'The concept that money available today is worth more than the same amount in the future due to its earning potential.' },
        { question: 'What is present value?', answer: 'The current worth of a future sum of money given a specified rate of return.' },
        { question: 'What is future value?', answer: 'The value of a current asset at a future date based on an assumed rate of growth.' },
      ]}
    >
      <div className="mb-6">
        <Label className="mb-2 block">Calculate</Label>
        <Select value={mode} onValueChange={(v) => { setMode(v as 'fv' | 'pv' | 'pmt'); reset(); }}>
          <SelectTrigger className="calc-input">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fv">Future Value</SelectItem>
            <SelectItem value="pv">Present Value</SelectItem>
            <SelectItem value="pmt">Payment Amount</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {(mode === 'fv' || mode === 'pmt') && (
          <div>
            <Label htmlFor="pv" className="mb-2 block">Present Value ($)</Label>
            <Input id="pv" type="number" value={pv} onChange={(e) => setPv(e.target.value)} placeholder="10000" className="calc-input" />
          </div>
        )}
        {mode === 'pv' && (
          <div>
            <Label htmlFor="fv" className="mb-2 block">Future Value ($)</Label>
            <Input id="fv" type="number" value={fv} onChange={(e) => setFv(e.target.value)} placeholder="16288.95" className="calc-input" />
          </div>
        )}
        <div>
          <Label htmlFor="rate" className="mb-2 block">Interest Rate (%)</Label>
          <Input id="rate" type="number" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="5.0" className="calc-input" />
        </div>
        <div>
          <Label htmlFor="periods" className="mb-2 block">Number of Periods</Label>
          <Input id="periods" type="number" value={periods} onChange={(e) => setPeriods(e.target.value)} placeholder="10" className="calc-input" />
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <Button onClick={calculate} className="calc-btn flex-1">Calculate</Button>
        <Button onClick={reset} variant="outline" className="calc-btn-secondary">Reset</Button>
      </div>

      {result && (
        <div className="calc-result animate-scale-in text-center">
          <p className="calc-result-value">{result}</p>
        </div>
      )}
    </CalculatorLayout>
  );
};

export default FinanceCalculator;
