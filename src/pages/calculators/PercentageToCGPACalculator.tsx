import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import { getCalculatorById } from '@/lib/calculators';

const PercentageToCGPACalculator = () => {
  const calculator = getCalculatorById('percentage-to-cgpa')!;
  const [percentage, setPercentage] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const p = parseFloat(percentage);
    if (isNaN(p) || p < 0 || p > 100) return;
    setResult(p / 9.5);
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      title="Percentage to CGPA Converter"
      description="Convert your percentage to CGPA easily. Standard formula used by most universities."
      intro="Convert your percentage marks to CGPA using the standard conversion formula."
      formula="CGPA = Percentage / 9.5"
      example="Percentage: 85%\nCGPA = 85 / 9.5 = 8.95"
      faqs={[
        { question: 'Is this formula universal?', answer: 'Most Indian universities use this formula, but some may have different conversion standards.' },
        { question: 'What is a good CGPA?', answer: 'Generally, CGPA above 8.0 is considered good, and above 9.0 is excellent.' },
      ]}
    >
      <div className="space-y-4 mb-6">
        <div>
          <Label htmlFor="percentage" className="mb-2 block">Percentage (%)</Label>
          <Input id="percentage" type="number" value={percentage} onChange={(e) => setPercentage(e.target.value)} placeholder="e.g., 85" className="calc-input" />
        </div>
      </div>
      <div className="flex gap-3 mb-6">
        <Button onClick={calculate} className="calc-btn flex-1">Convert</Button>
        <Button onClick={() => { setPercentage(''); setResult(null); }} variant="outline" className="calc-btn-secondary">Reset</Button>
      </div>
      {result !== null && (
        <div className="calc-result animate-scale-in text-center">
          <p className="text-sm text-muted-foreground mb-2">Your CGPA:</p>
          <p className="calc-result-value">{result.toFixed(2)}</p>
        </div>
      )}
    </CalculatorLayout>
  );
};

export default PercentageToCGPACalculator;
