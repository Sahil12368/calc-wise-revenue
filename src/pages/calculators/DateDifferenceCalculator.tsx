import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import { getCalculatorById } from '@/lib/calculators';
import { differenceInDays, differenceInWeeks, differenceInMonths, differenceInYears, parseISO, isValid, format } from 'date-fns';

const DateDifferenceCalculator = () => {
  const calculator = getCalculatorById('date-difference')!;
  
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [result, setResult] = useState<{ days: number; weeks: number; months: number; years: number } | null>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    const start = parseISO(startDate);
    const end = parseISO(endDate);

    if (!isValid(start) || !isValid(end)) {
      setError('Please enter valid dates');
      setResult(null);
      return;
    }

    setError('');

    const days = Math.abs(differenceInDays(end, start));
    const weeks = Math.abs(differenceInWeeks(end, start));
    const months = Math.abs(differenceInMonths(end, start));
    const years = Math.abs(differenceInYears(end, start));

    setResult({ days, weeks, months, years });
  };

  const reset = () => {
    setStartDate('');
    setEndDate('');
    setResult(null);
    setError('');
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      title="Date Difference Calculator"
      description="Calculate the difference between two dates in days, weeks, months, and years. Free date calculator for project planning and more."
      intro="Find out exactly how many days, weeks, months, or years are between any two dates with our free date difference calculator."
      formula="Difference = End Date - Start Date (calculated in various units)"
      example={`Start Date: January 1, 2024
End Date: December 31, 2024

Difference:
- 365 days
- 52 weeks
- 12 months
- 1 year`}
      faqs={[
        {
          question: 'Does this calculator count both start and end dates?',
          answer: 'The calculator counts the number of complete days between the two dates. If you want to include both dates, add 1 to the result.',
        },
        {
          question: 'Can I calculate dates in the past?',
          answer: 'Yes! You can calculate the difference between any two dates, whether in the past, present, or future.',
        },
        {
          question: 'How are months calculated?',
          answer: 'Months are calculated as complete calendar months between the two dates, accounting for varying month lengths.',
        },
      ]}
    >
      {/* Input Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <Label htmlFor="startDate" className="mb-2 block">
            Start Date
          </Label>
          <Input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="calc-input"
          />
        </div>
        <div>
          <Label htmlFor="endDate" className="mb-2 block">
            End Date
          </Label>
          <Input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="calc-input"
          />
        </div>
      </div>

      {error && (
        <p className="text-destructive text-sm mb-4">{error}</p>
      )}

      {/* Buttons */}
      <div className="flex gap-3 mb-6">
        <Button onClick={calculate} className="calc-btn flex-1">
          Calculate Difference
        </Button>
        <Button onClick={reset} variant="outline" className="calc-btn-secondary">
          Reset
        </Button>
      </div>

      {/* Result */}
      {result && (
        <div className="calc-result animate-scale-in">
          <p className="text-sm text-muted-foreground mb-4 text-center">Time Between Dates:</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-background rounded-lg">
              <p className="text-2xl md:text-3xl font-bold text-primary">{result.days}</p>
              <p className="text-sm text-muted-foreground">Days</p>
            </div>
            <div className="text-center p-3 bg-background rounded-lg">
              <p className="text-2xl md:text-3xl font-bold text-primary">{result.weeks}</p>
              <p className="text-sm text-muted-foreground">Weeks</p>
            </div>
            <div className="text-center p-3 bg-background rounded-lg">
              <p className="text-2xl md:text-3xl font-bold text-primary">{result.months}</p>
              <p className="text-sm text-muted-foreground">Months</p>
            </div>
            <div className="text-center p-3 bg-background rounded-lg">
              <p className="text-2xl md:text-3xl font-bold text-primary">{result.years}</p>
              <p className="text-sm text-muted-foreground">Years</p>
            </div>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
};

export default DateDifferenceCalculator;
