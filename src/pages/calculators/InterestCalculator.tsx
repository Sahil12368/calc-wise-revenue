import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import { getCalculatorById } from '@/lib/calculators';

const InterestCalculator = () => {
  const calculator = getCalculatorById('interest')!;
  
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [type, setType] = useState<'simple' | 'compound'>('simple');
  const [result, setResult] = useState<{ interest: number; total: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);

    if (isNaN(p) || isNaN(r) || isNaN(t) || p <= 0 || t <= 0) return;

    let interest: number;
    let total: number;

    if (type === 'simple') {
      interest = p * r * t;
      total = p + interest;
    } else {
      total = p * Math.pow(1 + r, t);
      interest = total - p;
    }

    setResult({ interest, total });
  };

  const reset = () => {
    setPrincipal('');
    setRate('');
    setTime('');
    setResult(null);
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      title="Interest Calculator"
      description="Calculate simple or compound interest on investments or loans."
      intro="Our interest calculator helps you understand how much interest you'll earn or pay over time. Choose between simple and compound interest calculations."
      formula="Simple: I = P × R × T | Compound: A = P × (1 + R)^T"
      example="$10,000 at 5% for 5 years: Simple Interest = $2,500, Compound Interest = $2,762.82"
      faqs={[
        { question: 'What is simple interest?', answer: 'Simple interest is calculated only on the principal amount. It remains constant over time.' },
        { question: 'What is compound interest?', answer: 'Compound interest is calculated on both the principal and accumulated interest, leading to faster growth over time.' },
        { question: 'Which is better for savings?', answer: 'Compound interest is better for savings as your money grows faster. For loans, simple interest typically means you pay less.' },
      ]}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <Label htmlFor="principal" className="mb-2 block">Principal Amount ($)</Label>
          <Input id="principal" type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} placeholder="10000" className="calc-input" />
        </div>
        <div>
          <Label htmlFor="rate" className="mb-2 block">Annual Interest Rate (%)</Label>
          <Input id="rate" type="number" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="5.0" className="calc-input" />
        </div>
        <div>
          <Label htmlFor="time" className="mb-2 block">Time Period (years)</Label>
          <Input id="time" type="number" value={time} onChange={(e) => setTime(e.target.value)} placeholder="5" className="calc-input" />
        </div>
        <div>
          <Label className="mb-2 block">Interest Type</Label>
          <Select value={type} onValueChange={(v) => setType(v as 'simple' | 'compound')}>
            <SelectTrigger className="calc-input">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="simple">Simple Interest</SelectItem>
              <SelectItem value="compound">Compound Interest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <Button onClick={calculate} className="calc-btn flex-1">Calculate</Button>
        <Button onClick={reset} variant="outline" className="calc-btn-secondary">Reset</Button>
      </div>

      {result && (
        <div className="calc-result animate-scale-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Interest Earned</p>
              <p className="calc-result-value">${result.interest.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
              <p className="text-2xl font-bold text-foreground">${result.total.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
};

export default InterestCalculator;
