import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import CurrencySelector, { Currency, formatCurrency, getCurrencySymbol } from '@/components/calculator/CurrencySelector';
import { getCalculatorById } from '@/lib/calculators';

const SalaryCalculator = () => {
  const calculator = getCalculatorById('salary')!;
  
  const [currency, setCurrency] = useState<Currency>('USD');
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

  const symbol = getCurrencySymbol(currency);

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
      contentSections={[
        {
          title: 'What is a Salary Calculator?',
          content: 'A salary calculator converts your pay between different time periods—hourly, daily, weekly, bi-weekly, monthly, and yearly. This helps you compare job offers, understand your true earning rate, or budget based on your pay schedule.\n\nWhether you are paid hourly and want to know your annual salary, or salaried and curious about your hourly rate, this calculator provides instant conversions.',
        },
        {
          title: 'How to Use This Calculator',
          content: '1. Select your currency\n2. Enter your salary amount\n3. Select the pay period (hourly, daily, weekly, etc.)\n4. Adjust hours per week if different from 40\n5. Click "Calculate" to see all conversions\n\nThe calculator assumes a standard work year of 52 weeks and 5 work days per week.',
        },
        {
          title: 'Understanding Pay Periods',
          content: '• Hourly: Paid for each hour worked\n• Daily: Paid per day (useful for contractors)\n• Weekly: Paid once per week (52 paychecks/year)\n• Bi-weekly: Paid every two weeks (26 paychecks/year)\n• Semi-monthly: Paid twice per month (24 paychecks/year)\n• Monthly: Paid once per month (12 paychecks/year)\n• Yearly: Annual salary\n\nNote: Bi-weekly and semi-monthly are different! Bi-weekly gives you two extra paychecks per year.',
        },
        {
          title: 'Comparing Job Offers',
          content: 'When comparing job offers, convert everything to the same time period:\n\n• $25/hour = $52,000/year (at 40 hrs/week)\n• $4,500/month = $54,000/year\n• $2,000/bi-weekly = $52,000/year\n\nDon\'t forget to consider:\n• Benefits value (health insurance, retirement matching)\n• Paid time off\n• Bonus potential\n• Work hours expected\n• Commute costs',
        },
        {
          title: 'Gross vs Net Salary',
          content: 'This calculator shows gross (before-tax) amounts. Your net (take-home) pay will be lower after:\n\n• Income Tax: Federal and state/local taxes\n• Social Security: ~6.2% in the US\n• Medicare: ~1.45% in the US\n• Health Insurance: If deducted from paycheck\n• Retirement Contributions: 401(k), pension, etc.\n• Other Deductions: Union dues, garnishments, etc.\n\nActual take-home is typically 65-80% of gross pay.',
        },
      ]}
    >
      {/* Currency Selector */}
      <div className="flex items-center justify-between mb-4">
        <Label className="text-sm text-muted-foreground">Select Currency:</Label>
        <CurrencySelector value={currency} onChange={setCurrency} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <Label htmlFor="amount" className="mb-2 block">Amount ({symbol})</Label>
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
              <p className="text-xl font-bold text-foreground">{formatCurrency(result.hourly, currency)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Daily</p>
              <p className="text-xl font-bold text-foreground">{formatCurrency(result.daily, currency)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Weekly</p>
              <p className="text-xl font-bold text-foreground">{formatCurrency(result.weekly, currency)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Bi-weekly</p>
              <p className="text-xl font-bold text-foreground">{formatCurrency(result.biweekly, currency)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Monthly</p>
              <p className="text-xl font-bold text-foreground">{formatCurrency(result.monthly, currency)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Yearly</p>
              <p className="calc-result-value text-xl">{formatCurrency(result.yearly, currency)}</p>
            </div>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
};

export default SalaryCalculator;
