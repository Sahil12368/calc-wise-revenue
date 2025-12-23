import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import { getCalculatorById } from '@/lib/calculators';

const TimeCalculator = () => {
  const calculator = getCalculatorById('time')!;
  
  const [hours1, setHours1] = useState('');
  const [minutes1, setMinutes1] = useState('');
  const [seconds1, setSeconds1] = useState('');
  const [hours2, setHours2] = useState('');
  const [minutes2, setMinutes2] = useState('');
  const [seconds2, setSeconds2] = useState('');
  const [operation, setOperation] = useState('+');
  const [result, setResult] = useState<{ hours: number; minutes: number; seconds: number; total: string } | null>(null);

  const calculate = () => {
    const totalSeconds1 = (parseInt(hours1) || 0) * 3600 + (parseInt(minutes1) || 0) * 60 + (parseInt(seconds1) || 0);
    const totalSeconds2 = (parseInt(hours2) || 0) * 3600 + (parseInt(minutes2) || 0) * 60 + (parseInt(seconds2) || 0);

    let resultSeconds: number;
    if (operation === '+') {
      resultSeconds = totalSeconds1 + totalSeconds2;
    } else {
      resultSeconds = Math.abs(totalSeconds1 - totalSeconds2);
    }

    const hours = Math.floor(resultSeconds / 3600);
    const minutes = Math.floor((resultSeconds % 3600) / 60);
    const seconds = resultSeconds % 60;

    const total = `${hours}h ${minutes}m ${seconds}s`;

    setResult({ hours, minutes, seconds, total });
  };

  const reset = () => {
    setHours1('');
    setMinutes1('');
    setSeconds1('');
    setHours2('');
    setMinutes2('');
    setSeconds2('');
    setResult(null);
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      title="Time Calculator"
      description="Add or subtract time durations in hours, minutes, and seconds."
      intro="Calculate the sum or difference of two time durations. Perfect for tracking work hours or project time."
      formula="Total = Time 1 ± Time 2 (converted to seconds, then back to h:m:s)"
      example="2h 30m + 1h 45m = 4h 15m"
      faqs={[
        { question: 'How do I calculate overtime?', answer: 'Enter your total hours worked as Time 1 and regular hours as Time 2, then subtract.' },
        { question: 'Can I enter only minutes?', answer: 'Yes, leave hours and seconds blank if you only want to work with minutes.' },
        { question: 'What if result is negative?', answer: 'The calculator shows the absolute difference. Check which time is larger.' },
      ]}
    >
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div>
          <Label className="mb-2 block text-sm">Hours</Label>
          <Input type="number" value={hours1} onChange={(e) => setHours1(e.target.value)} placeholder="0" className="calc-input" />
        </div>
        <div>
          <Label className="mb-2 block text-sm">Minutes</Label>
          <Input type="number" value={minutes1} onChange={(e) => setMinutes1(e.target.value)} placeholder="0" className="calc-input" />
        </div>
        <div>
          <Label className="mb-2 block text-sm">Seconds</Label>
          <Input type="number" value={seconds1} onChange={(e) => setSeconds1(e.target.value)} placeholder="0" className="calc-input" />
        </div>
      </div>

      <div className="flex justify-center mb-4">
        <Select value={operation} onValueChange={setOperation}>
          <SelectTrigger className="w-24">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="+">+</SelectItem>
            <SelectItem value="-">−</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-6">
        <div>
          <Label className="mb-2 block text-sm">Hours</Label>
          <Input type="number" value={hours2} onChange={(e) => setHours2(e.target.value)} placeholder="0" className="calc-input" />
        </div>
        <div>
          <Label className="mb-2 block text-sm">Minutes</Label>
          <Input type="number" value={minutes2} onChange={(e) => setMinutes2(e.target.value)} placeholder="0" className="calc-input" />
        </div>
        <div>
          <Label className="mb-2 block text-sm">Seconds</Label>
          <Input type="number" value={seconds2} onChange={(e) => setSeconds2(e.target.value)} placeholder="0" className="calc-input" />
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <Button onClick={calculate} className="calc-btn flex-1">Calculate</Button>
        <Button onClick={reset} variant="outline" className="calc-btn-secondary">Reset</Button>
      </div>

      {result && (
        <div className="calc-result animate-scale-in text-center">
          <p className="text-sm text-muted-foreground mb-2">Result:</p>
          <p className="calc-result-value">{result.total}</p>
          <p className="text-muted-foreground mt-2">
            ({result.hours * 60 + result.minutes} minutes total)
          </p>
        </div>
      )}
    </CalculatorLayout>
  );
};

export default TimeCalculator;
