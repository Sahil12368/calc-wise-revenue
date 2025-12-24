import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import { getCalculatorById } from '@/lib/calculators';

const DateCalculator = () => {
  const calculator = getCalculatorById('date')!;
  
  const [startDate, setStartDate] = useState('');
  const [days, setDays] = useState('');
  const [operation, setOperation] = useState<'add' | 'subtract'>('add');
  const [result, setResult] = useState<{ date: Date; formatted: string } | null>(null);

  const calculate = () => {
    const start = new Date(startDate);
    const daysNum = parseInt(days);

    if (isNaN(start.getTime()) || isNaN(daysNum)) return;

    const resultDate = new Date(start);
    if (operation === 'add') {
      resultDate.setDate(resultDate.getDate() + daysNum);
    } else {
      resultDate.setDate(resultDate.getDate() - daysNum);
    }

    const formatted = resultDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    setResult({ date: resultDate, formatted });
  };

  const reset = () => {
    setStartDate('');
    setDays('');
    setResult(null);
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      title="Date Calculator"
      description="Add or subtract days, weeks, months from any date."
      intro="Calculate what date it will be after adding or subtracting days from a starting date."
      formula="Result Date = Start Date ± Number of Days"
      example="January 1, 2024 + 100 days = April 10, 2024"
      faqs={[
        { question: 'Does this account for leap years?', answer: 'Yes, the calculator automatically handles leap years and varying month lengths.' },
        { question: 'Can I calculate weeks instead of days?', answer: 'Yes, just multiply weeks by 7. For example, 2 weeks = 14 days.' },
        { question: 'What date format should I use?', answer: 'Use the date picker or enter in YYYY-MM-DD format (e.g., 2024-01-15).' },
      ]}
      contentSections={[
        {
          title: 'What is a Date Calculator?',
          content: 'A date calculator is a tool that helps you add or subtract a specific number of days from any given date. It takes into account all calendar complexities including leap years, varying month lengths (28, 29, 30, or 31 days), and century boundaries.\n\nThis tool is invaluable for planning events, calculating deadlines, determining due dates, and any situation where you need to know what date falls a certain number of days before or after a specific date.',
        },
        {
          title: 'How to Use This Calculator',
          content: '1. Enter your starting date using the date picker\n2. Enter the number of days you want to add or subtract\n3. Click "Add Days" or "Subtract Days" to select the operation\n4. Click "Calculate" to see the resulting date\n\nThe result will show the full date including the day of the week, making it easy to plan around weekends and holidays.',
        },
        {
          title: 'Common Uses for Date Calculations',
          content: '• Project Management: Calculate project deadlines and milestones\n• Legal Deadlines: Determine filing dates, notice periods, or statute of limitations\n• Medical: Track medication schedules, follow-up appointments\n• Finance: Calculate loan maturity dates, payment due dates\n• Travel: Plan trip durations and return dates\n• Pregnancy: Calculate due dates and trimester milestones\n• Contracts: Determine notice periods, warranty expiration\n• Personal: Birthday countdowns, anniversary planning',
        },
        {
          title: 'Tips for Date Calculations',
          content: '• For weeks: Multiply the number of weeks by 7\n• For months: Note that months vary (28-31 days), so use approximate values like 30 days\n• For years: Use 365 days (or 366 for leap years)\n• Remember time zones may affect the actual date in different locations\n• For recurring events, calculate from the most recent occurrence',
        },
      ]}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <Label htmlFor="startDate" className="mb-2 block">Start Date</Label>
          <Input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="calc-input"
          />
        </div>
        <div>
          <Label htmlFor="days" className="mb-2 block">Number of Days</Label>
          <Input
            id="days"
            type="number"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            placeholder="30"
            className="calc-input"
          />
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        <Button
          variant={operation === 'add' ? 'default' : 'outline'}
          onClick={() => setOperation('add')}
          className="flex-1"
        >
          Add Days
        </Button>
        <Button
          variant={operation === 'subtract' ? 'default' : 'outline'}
          onClick={() => setOperation('subtract')}
          className="flex-1"
        >
          Subtract Days
        </Button>
      </div>

      <div className="flex gap-3 mb-6">
        <Button onClick={calculate} className="calc-btn flex-1">Calculate</Button>
        <Button onClick={reset} variant="outline" className="calc-btn-secondary">Reset</Button>
      </div>

      {result && (
        <div className="calc-result animate-scale-in text-center">
          <p className="text-sm text-muted-foreground mb-2">Result Date:</p>
          <p className="calc-result-value text-2xl">{result.formatted}</p>
        </div>
      )}
    </CalculatorLayout>
  );
};

export default DateCalculator;
