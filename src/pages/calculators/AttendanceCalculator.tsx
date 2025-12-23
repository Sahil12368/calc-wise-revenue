import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import { getCalculatorById } from '@/lib/calculators';

const AttendanceCalculator = () => {
  const calculator = getCalculatorById('attendance')!;
  const [present, setPresent] = useState('');
  const [total, setTotal] = useState('');
  const [result, setResult] = useState<{ percentage: number; status: string } | null>(null);

  const calculate = () => {
    const p = parseFloat(present);
    const t = parseFloat(total);
    if (isNaN(p) || isNaN(t) || t <= 0) return;
    const percentage = (p / t) * 100;
    const status = percentage >= 75 ? 'Safe' : percentage >= 65 ? 'Warning' : 'Critical';
    setResult({ percentage, status });
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      title="Attendance Calculator"
      description="Calculate your attendance percentage. Check if you meet the minimum requirement."
      intro="Track your attendance and ensure you meet the minimum requirement (usually 75%)."
      formula="Attendance % = (Days Present / Total Days) × 100"
      example="Present: 68 days\nTotal: 80 days\nAttendance = (68/80) × 100 = 85%"
      faqs={[
        { question: 'What is the minimum attendance required?', answer: 'Most institutions require 75% minimum attendance to appear in exams.' },
        { question: 'How can I improve my attendance?', answer: 'Attend all future classes regularly and avoid unnecessary leaves.' },
      ]}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <Label htmlFor="present" className="mb-2 block">Days Present</Label>
          <Input id="present" type="number" value={present} onChange={(e) => setPresent(e.target.value)} placeholder="e.g., 68" className="calc-input" />
        </div>
        <div>
          <Label htmlFor="total" className="mb-2 block">Total Days</Label>
          <Input id="total" type="number" value={total} onChange={(e) => setTotal(e.target.value)} placeholder="e.g., 80" className="calc-input" />
        </div>
      </div>
      <div className="flex gap-3 mb-6">
        <Button onClick={calculate} className="calc-btn flex-1">Calculate</Button>
        <Button onClick={() => { setPresent(''); setTotal(''); setResult(null); }} variant="outline" className="calc-btn-secondary">Reset</Button>
      </div>
      {result && (
        <div className="calc-result animate-scale-in text-center">
          <p className="text-sm text-muted-foreground mb-2">Your Attendance:</p>
          <p className="calc-result-value">{result.percentage.toFixed(2)}%</p>
          <p className={`mt-2 font-semibold ${result.status === 'Safe' ? 'text-success' : result.status === 'Warning' ? 'text-warning' : 'text-destructive'}`}>
            Status: {result.status} {result.status === 'Safe' ? '✓' : result.status === 'Warning' ? '⚠' : '✗'}
          </p>
        </div>
      )}
    </CalculatorLayout>
  );
};

export default AttendanceCalculator;
