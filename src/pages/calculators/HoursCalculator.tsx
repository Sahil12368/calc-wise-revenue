import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import { getCalculatorById } from '@/lib/calculators';

const HoursCalculator = () => {
  const calculator = getCalculatorById('hours')!;
  
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [breakMinutes, setBreakMinutes] = useState('');
  const [result, setResult] = useState<{ hours: number; minutes: number; decimal: number; total: string } | null>(null);

  const calculate = () => {
    if (!startTime || !endTime) return;

    const [startH, startM] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);
    
    let startMinutes = startH * 60 + startM;
    let endMinutes = endH * 60 + endM;
    
    // Handle overnight shifts
    if (endMinutes < startMinutes) {
      endMinutes += 24 * 60;
    }

    let totalMinutes = endMinutes - startMinutes - (parseInt(breakMinutes) || 0);
    if (totalMinutes < 0) totalMinutes = 0;

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const decimal = totalMinutes / 60;

    const total = `${hours}h ${minutes}m`;

    setResult({ hours, minutes, decimal, total });
  };

  const reset = () => {
    setStartTime('');
    setEndTime('');
    setBreakMinutes('');
    setResult(null);
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      title="Hours Calculator"
      description="Calculate work hours between start and end times, with break deductions."
      intro="Track your work hours accurately. Enter start time, end time, and any breaks to calculate total hours worked."
      formula="Total Hours = End Time - Start Time - Break Time"
      example="Start: 9:00 AM, End: 5:30 PM, Break: 30 min = 8 hours"
      faqs={[
        { question: 'Does it handle overnight shifts?', answer: 'Yes, if end time is before start time, it assumes you worked past midnight.' },
        { question: 'How do I enter time?', answer: 'Use the time picker or enter in 24-hour format (e.g., 09:00 for 9 AM, 17:00 for 5 PM).' },
        { question: 'What is decimal hours?', answer: 'Decimal hours express time as a decimal. 8.5 means 8 hours 30 minutes.' },
      ]}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <Label htmlFor="startTime" className="mb-2 block">Start Time</Label>
          <Input
            id="startTime"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="calc-input"
          />
        </div>
        <div>
          <Label htmlFor="endTime" className="mb-2 block">End Time</Label>
          <Input
            id="endTime"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="calc-input"
          />
        </div>
        <div>
          <Label htmlFor="breakMinutes" className="mb-2 block">Break (minutes)</Label>
          <Input
            id="breakMinutes"
            type="number"
            value={breakMinutes}
            onChange={(e) => setBreakMinutes(e.target.value)}
            placeholder="30"
            className="calc-input"
          />
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
              <p className="text-sm text-muted-foreground mb-1">Hours Worked</p>
              <p className="calc-result-value">{result.total}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Decimal Hours</p>
              <p className="text-2xl font-bold text-foreground">{result.decimal.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
};

export default HoursCalculator;
