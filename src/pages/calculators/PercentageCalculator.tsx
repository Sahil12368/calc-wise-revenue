import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import { getCalculatorById } from '@/lib/calculators';

const PercentageCalculator = () => {
  const calculator = getCalculatorById('percentage')!;
  
  const [mode, setMode] = useState<'whatIs' | 'whatPercent' | 'change'>('whatIs');
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const num1 = parseFloat(value1);
    const num2 = parseFloat(value2);

    if (isNaN(num1) || isNaN(num2)) {
      setResult('Please enter valid numbers');
      return;
    }

    let res: number;
    let explanation: string;

    switch (mode) {
      case 'whatIs':
        res = (num1 / 100) * num2;
        explanation = `${num1}% of ${num2} = ${res.toFixed(2)}`;
        break;
      case 'whatPercent':
        res = (num1 / num2) * 100;
        explanation = `${num1} is ${res.toFixed(2)}% of ${num2}`;
        break;
      case 'change':
        res = ((num2 - num1) / num1) * 100;
        explanation = res >= 0
          ? `Increase of ${res.toFixed(2)}% from ${num1} to ${num2}`
          : `Decrease of ${Math.abs(res).toFixed(2)}% from ${num1} to ${num2}`;
        break;
    }

    setResult(explanation);
  };

  const reset = () => {
    setValue1('');
    setValue2('');
    setResult(null);
  };

  const modes = [
    { id: 'whatIs', label: 'What is X% of Y?' },
    { id: 'whatPercent', label: 'X is what % of Y?' },
    { id: 'change', label: '% Change from X to Y' },
  ];

  return (
    <CalculatorLayout
      calculator={calculator}
      title="Percentage Calculator"
      description="Calculate percentages easily. Find what is X% of Y, what percent X is of Y, or percentage change between two numbers."
      intro="Our free percentage calculator helps you solve all types of percentage problems quickly and accurately. Perfect for students, shoppers, and professionals."
      formula={`What is X% of Y: Result = (X / 100) × Y
X is what % of Y: Result = (X / Y) × 100
% Change: Result = ((New - Old) / Old) × 100`}
      example={`Example: What is 25% of 200?
Result = (25 / 100) × 200 = 50
So, 25% of 200 is 50.`}
      faqs={[
        {
          question: 'How do I calculate percentage of a number?',
          answer: 'To find X% of a number, multiply the number by X and divide by 100. For example, 20% of 150 = (20 × 150) / 100 = 30.',
        },
        {
          question: 'How do I find what percentage one number is of another?',
          answer: 'Divide the first number by the second number and multiply by 100. For example, 25 is what percent of 200? (25 / 200) × 100 = 12.5%.',
        },
        {
          question: 'How do I calculate percentage increase or decrease?',
          answer: 'Subtract the old value from the new value, divide by the old value, and multiply by 100. A positive result means increase, negative means decrease.',
        },
      ]}
    >
      {/* Mode Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {modes.map((m) => (
          <Button
            key={m.id}
            variant={mode === m.id ? 'default' : 'outline'}
            onClick={() => {
              setMode(m.id as typeof mode);
              reset();
            }}
            className="text-sm"
          >
            {m.label}
          </Button>
        ))}
      </div>

      {/* Input Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <Label htmlFor="value1" className="mb-2 block">
            {mode === 'whatIs' ? 'Percentage (%)' : mode === 'whatPercent' ? 'Value' : 'Original Value'}
          </Label>
          <Input
            id="value1"
            type="number"
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
            placeholder={mode === 'whatIs' ? 'Enter percentage' : 'Enter value'}
            className="calc-input"
          />
        </div>
        <div>
          <Label htmlFor="value2" className="mb-2 block">
            {mode === 'whatIs' ? 'Of Number' : mode === 'whatPercent' ? 'Of Total' : 'New Value'}
          </Label>
          <Input
            id="value2"
            type="number"
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
            placeholder="Enter number"
            className="calc-input"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mb-6">
        <Button onClick={calculate} className="calc-btn flex-1">
          Calculate
        </Button>
        <Button onClick={reset} variant="outline" className="calc-btn-secondary">
          Reset
        </Button>
      </div>

      {/* Result */}
      {result && (
        <div className="calc-result animate-scale-in">
          <p className="text-sm text-muted-foreground mb-2">Result:</p>
          <p className="calc-result-value">{result}</p>
        </div>
      )}
    </CalculatorLayout>
  );
};

export default PercentageCalculator;
