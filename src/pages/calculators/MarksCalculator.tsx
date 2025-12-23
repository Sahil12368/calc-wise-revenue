import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import { getCalculatorById } from '@/lib/calculators';

const MarksCalculator = () => {
  const calculator = getCalculatorById('marks')!;
  const [obtained, setObtained] = useState('');
  const [total, setTotal] = useState('');
  const [result, setResult] = useState<{ percentage: number; grade: string } | null>(null);

  const getGrade = (p: number) => {
    if (p >= 90) return 'A+';
    if (p >= 80) return 'A';
    if (p >= 70) return 'B+';
    if (p >= 60) return 'B';
    if (p >= 50) return 'C';
    if (p >= 40) return 'D';
    return 'F';
  };

  const calculate = () => {
    const o = parseFloat(obtained);
    const t = parseFloat(total);
    if (isNaN(o) || isNaN(t) || t <= 0) return;
    const percentage = (o / t) * 100;
    setResult({ percentage, grade: getGrade(percentage) });
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      title="Marks Calculator"
      description="Calculate percentage and grade from marks obtained and total marks."
      intro="Enter your marks obtained and total marks to calculate percentage and grade."
      formula="Percentage = (Marks Obtained / Total Marks) × 100"
      example="Marks Obtained: 425\nTotal Marks: 500\nPercentage = (425/500) × 100 = 85%"
      faqs={[
        { question: 'How are grades assigned?', answer: 'A+: 90%+, A: 80-89%, B+: 70-79%, B: 60-69%, C: 50-59%, D: 40-49%, F: Below 40%' },
      ]}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <Label htmlFor="obtained" className="mb-2 block">Marks Obtained</Label>
          <Input id="obtained" type="number" value={obtained} onChange={(e) => setObtained(e.target.value)} placeholder="e.g., 425" className="calc-input" />
        </div>
        <div>
          <Label htmlFor="total" className="mb-2 block">Total Marks</Label>
          <Input id="total" type="number" value={total} onChange={(e) => setTotal(e.target.value)} placeholder="e.g., 500" className="calc-input" />
        </div>
      </div>
      <div className="flex gap-3 mb-6">
        <Button onClick={calculate} className="calc-btn flex-1">Calculate</Button>
        <Button onClick={() => { setObtained(''); setTotal(''); setResult(null); }} variant="outline" className="calc-btn-secondary">Reset</Button>
      </div>
      {result && (
        <div className="calc-result animate-scale-in">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div><p className="text-sm text-muted-foreground">Percentage</p><p className="calc-result-value">{result.percentage.toFixed(2)}%</p></div>
            <div><p className="text-sm text-muted-foreground">Grade</p><p className="calc-result-value">{result.grade}</p></div>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
};

export default MarksCalculator;
