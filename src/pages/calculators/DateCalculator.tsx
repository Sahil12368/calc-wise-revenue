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
