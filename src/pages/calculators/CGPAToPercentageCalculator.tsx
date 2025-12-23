import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import { getCalculatorById } from '@/lib/calculators';

const CGPAToPercentageCalculator = () => {
  const calculator = getCalculatorById('cgpa-to-percentage')!;
  const [cgpa, setCgpa] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const c = parseFloat(cgpa);
    if (isNaN(c) || c < 0 || c > 10) return;
    setResult(c * 9.5);
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      title="CGPA to Percentage Converter"
      description="Convert your CGPA to percentage easily. Standard formula used by most universities."
      intro="Convert your CGPA to percentage marks using the standard conversion formula."
      formula="Percentage = CGPA × 9.5"
      example="CGPA: 8.5\nPercentage = 8.5 × 9.5 = 80.75%"
      faqs={[
        { question: 'Why multiply by 9.5?', answer: 'This is the standard conversion factor used by CBSE and most Indian universities.' },
        { question: 'Is this accurate for all universities?', answer: 'Most universities use this formula, but some may have slightly different conversion methods.' },
      ]}
    >
      <div className="space-y-4 mb-6">
        <div>
          <Label htmlFor="cgpa" className="mb-2 block">CGPA (0-10)</Label>
          <Input id="cgpa" type="number" step="0.1" value={cgpa} onChange={(e) => setCgpa(e.target.value)} placeholder="e.g., 8.5" className="calc-input" />
        </div>
      </div>
      <div className="flex gap-3 mb-6">
        <Button onClick={calculate} className="calc-btn flex-1">Convert</Button>
        <Button onClick={() => { setCgpa(''); setResult(null); }} variant="outline" className="calc-btn-secondary">Reset</Button>
      </div>
      {result !== null && (
        <div className="calc-result animate-scale-in text-center">
          <p className="text-sm text-muted-foreground mb-2">Your Percentage:</p>
          <p className="calc-result-value">{result.toFixed(2)}%</p>
        </div>
      )}
    </CalculatorLayout>
  );
};

export default CGPAToPercentageCalculator;
