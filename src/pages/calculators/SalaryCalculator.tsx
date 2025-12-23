import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import { getCalculatorById } from '@/lib/calculators';

const SalaryCalculator = () => {
  const calculator = getCalculatorById('salary')!;
  
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('yearly');
  const [hoursPerWeek, setHoursPerWeek] = useState('40');
  const [result, setResult] = useState<{ hourly: number; daily: number; weekly: number; biweekly: number; monthly: number; yearly: number } | null>(null);

  const calculate = () => {
    const value = parseFloat(amount);
    const hours = parseFloat(hoursPerWeek) || 40;
    
    if (isNaN(value) || value <= 0) return;

    let yearly: number;
    
    switch (type) {
      case 'hourly':
        yearly = value * hours * 52;
        break;
      case 'daily':
        yearly = value * 5 * 52;
        break;
      case 'weekly':
        yearly = value * 52;
        break;
      case 'biweekly':
        yearly = value * 26;
        break;
      case 'monthly':
        yearly = value * 12;
        break;
      case 'yearly':
      default:
        yearly = value;
    }

    const hourly = yearly / (hours * 52);
    const daily = yearly / (5 * 52);
    const weekly = yearly / 52;
    const biweekly = yearly / 26;
    const monthly = yearly / 12;

    setResult({ hourly, daily, weekly, biweekly, monthly, yearly });
  };

  const reset = () => {
    setAmount('');
    setType('yearly');
    setHoursPerWeek('40');
    setResult(null);
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      title="Salary Calculator"
      description="Convert your salary between hourly, daily, weekly, bi-weekly, monthly, and yearly amounts."
      intro="Easily convert your pay to different time periods. Enter your salary and see what it equals hourly, weekly, monthly, and more."
      formula="Yearly = Hourly × Hours/Week × 52 | Hourly = Yearly / (Hours/Week × 52)"
      example="$50,000/year at 40 hrs/week = $24.04/hour = $961.54/week = $4,166.67/month"
      faqs={[
        { question: 'How many work hours in a year?', answer: 'Assuming 40 hours/week and 52 weeks, there are 2,080 work hours in a year.' },
        { question: 'Are these before or after taxes?', answer: 'This calculator shows gross (before tax) amounts. Your take-home pay will be lower after taxes.' },
        { question: 'How is bi-weekly different from semi-monthly?', answer: 'Bi-weekly is every 2 weeks (26 paychecks/year). Semi-monthly is twice a month (24 paychecks/year).' },
      ]}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <Label htmlFor="amount" className="mb-2 block">Amount ($)</Label>
          <Input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="50000" className="calc-input" />
        </div>
        <div>
          <Label className="mb-2 block">Pay Period</Label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="calc-input">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hourly">Hourly</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="biweekly">Bi-weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="hours" className="mb-2 block">Hours Per Week</Label>
          <Input id="hours" type="number" value={hoursPerWeek} onChange={(e) => setHoursPerWeek(e.target.value)} placeholder="40" className="calc-input" />
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <Button onClick={calculate} className="calc-btn flex-1">Calculate</Button>
        <Button onClick={reset} variant="outline" className="calc-btn-secondary">Reset</Button>
      </div>

      {result && (
        <div className="calc-result animate-scale-in">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Hourly</p>
              <p className="text-xl font-bold text-foreground">${result.hourly.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Daily</p>
              <p className="text-xl font-bold text-foreground">${result.daily.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Weekly</p>
              <p className="text-xl font-bold text-foreground">${result.weekly.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Bi-weekly</p>
              <p className="text-xl font-bold text-foreground">${result.biweekly.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Monthly</p>
              <p className="text-xl font-bold text-foreground">${result.monthly.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Yearly</p>
              <p className="calc-result-value text-xl">${result.yearly.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
            </div>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
};

export default SalaryCalculator;
