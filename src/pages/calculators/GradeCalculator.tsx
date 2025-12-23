import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import { getCalculatorById } from '@/lib/calculators';

const GradeCalculator = () => {
  const calculator = getCalculatorById('grade')!;
  
  const [currentGrade, setCurrentGrade] = useState('');
  const [currentWeight, setCurrentWeight] = useState('');
  const [desiredGrade, setDesiredGrade] = useState('');
  const [finalWeight, setFinalWeight] = useState('');
  const [result, setResult] = useState<{ needed: number; possible: boolean } | null>(null);

  const calculate = () => {
    const current = parseFloat(currentGrade);
    const currWeight = parseFloat(currentWeight) / 100;
    const desired = parseFloat(desiredGrade);
    const finWeight = parseFloat(finalWeight) / 100;

    if (isNaN(current) || isNaN(currWeight) || isNaN(desired) || isNaN(finWeight)) return;

    // Formula: (current × currWeight) + (needed × finWeight) = desired
    // needed = (desired - current × currWeight) / finWeight
    const needed = (desired - current * currWeight) / finWeight;
    const possible = needed <= 100 && needed >= 0;

    setResult({ needed, possible });
  };

  const reset = () => {
    setCurrentGrade('');
    setCurrentWeight('');
    setDesiredGrade('');
    setFinalWeight('');
    setResult(null);
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      title="Grade Calculator"
      description="Calculate what grade you need on your final exam to achieve your desired course grade."
      intro="Find out what you need to score on your final exam to reach your target grade."
      formula="Needed Grade = (Desired Grade - Current Grade × Current Weight) / Final Weight"
      example="Current: 85%, Weight: 70%, Desired: 90%, Final Weight: 30% → Need: 101.7% (not possible)"
      faqs={[
        { question: 'How do I find my current grade weight?', answer: 'If your final is worth 30%, your current grade weight is 70% (100% - 30%).' },
        { question: 'What if I need over 100%?', answer: 'If you need more than 100%, your desired grade is not achievable with the final alone.' },
        { question: 'Does this work for extra credit?', answer: 'If your class allows grades over 100%, a score above 100% might be possible with extra credit.' },
      ]}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <Label htmlFor="currentGrade" className="mb-2 block">Current Grade (%)</Label>
          <Input
            id="currentGrade"
            type="number"
            value={currentGrade}
            onChange={(e) => setCurrentGrade(e.target.value)}
            placeholder="85"
            className="calc-input"
          />
        </div>
        <div>
          <Label htmlFor="currentWeight" className="mb-2 block">Current Grade Weight (%)</Label>
          <Input
            id="currentWeight"
            type="number"
            value={currentWeight}
            onChange={(e) => setCurrentWeight(e.target.value)}
            placeholder="70"
            className="calc-input"
          />
        </div>
        <div>
          <Label htmlFor="desiredGrade" className="mb-2 block">Desired Final Grade (%)</Label>
          <Input
            id="desiredGrade"
            type="number"
            value={desiredGrade}
            onChange={(e) => setDesiredGrade(e.target.value)}
            placeholder="90"
            className="calc-input"
          />
        </div>
        <div>
          <Label htmlFor="finalWeight" className="mb-2 block">Final Exam Weight (%)</Label>
          <Input
            id="finalWeight"
            type="number"
            value={finalWeight}
            onChange={(e) => setFinalWeight(e.target.value)}
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
        <div className="calc-result animate-scale-in text-center">
          <p className="text-sm text-muted-foreground mb-2">You need to score:</p>
          <p className={`calc-result-value ${result.possible ? '' : 'text-destructive'}`}>
            {result.needed.toFixed(1)}%
          </p>
          <p className="text-muted-foreground mt-2">
            {result.possible 
              ? result.needed < 60 
                ? "Easy! You've got this! 🎉" 
                : result.needed < 80 
                  ? "Achievable with some studying!" 
                  : "You'll need to study hard!"
              : "This grade is not achievable. Consider adjusting your goal."
            }
          </p>
        </div>
      )}
    </CalculatorLayout>
  );
};

export default GradeCalculator;
