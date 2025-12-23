import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import { getCalculatorById } from '@/lib/calculators';

const RatioCalculator = () => {
  const calculator = getCalculatorById('ratio')!;
  
  const [mode, setMode] = useState<'simplify' | 'scale' | 'equivalent'>('simplify');
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [d, setD] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState('');

  const gcd = (x: number, y: number): number => {
    x = Math.abs(x);
    y = Math.abs(y);
    while (y) {
      const t = y;
      y = x % y;
      x = t;
    }
    return x;
  };

  const calculate = () => {
    const numA = parseFloat(a);
    const numB = parseFloat(b);

    if (isNaN(numA) || isNaN(numB) || numA <= 0 || numB <= 0) {
      setError('Please enter valid positive numbers');
      setResult(null);
      return;
    }

    setError('');

    if (mode === 'simplify') {
      const divisor = gcd(numA, numB);
      setResult(`${numA / divisor} : ${numB / divisor}`);
    } else if (mode === 'scale') {
      const numC = parseFloat(c);
      if (isNaN(numC) || numC <= 0) {
        setError('Please enter a valid scale factor');
        setResult(null);
        return;
      }
      setResult(`${numA * numC} : ${numB * numC}`);
    } else if (mode === 'equivalent') {
      const numC = parseFloat(c);
      if (isNaN(numC) || numC <= 0) {
        setError('Please enter a valid value');
        setResult(null);
        return;
      }
      const unknown = (numB * numC) / numA;
      setResult(`${numC} : ${unknown.toFixed(2)}`);
    }
  };

  const reset = () => {
    setA('');
    setB('');
    setC('');
    setD('');
    setResult(null);
    setError('');
  };

  const modes = [
    { id: 'simplify', label: 'Simplify Ratio' },
    { id: 'scale', label: 'Scale Ratio' },
    { id: 'equivalent', label: 'Find Equivalent' },
  ];

  return (
    <CalculatorLayout
      calculator={calculator}
      title="Ratio Calculator"
      description="Simplify ratios, scale proportions, and find equivalent ratios. Free ratio and proportion calculator."
      intro="Calculate and simplify ratios, find equivalent proportions, or scale ratios up or down with our easy-to-use ratio calculator."
      formula={`Simplify: Divide both numbers by their GCD
Scale: Multiply both numbers by the factor
Equivalent: A:B = C:? → ? = (B × C) / A`}
      example={`Simplify 12:18:
GCD of 12 and 18 = 6
12/6 : 18/6 = 2:3

Scale 2:3 by 5:
2×5 : 3×5 = 10:15

Find equivalent: If 2:3 = 10:?
? = (3 × 10) / 2 = 15`}
      faqs={[
        {
          question: 'What is a ratio?',
          answer: 'A ratio is a comparison between two or more quantities, showing how many times one value contains another.',
        },
        {
          question: 'How do I simplify a ratio?',
          answer: 'Divide both numbers by their greatest common divisor (GCD). For example, 12:18 simplifies to 2:3 (divide by 6).',
        },
        {
          question: 'What are equivalent ratios?',
          answer: 'Equivalent ratios have the same relationship between numbers. For example, 1:2, 2:4, and 3:6 are all equivalent ratios.',
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
      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-5 gap-2 items-center">
          <div className="col-span-2">
            <Label htmlFor="a" className="mb-2 block">
              First Value
            </Label>
            <Input
              id="a"
              type="number"
              value={a}
              onChange={(e) => setA(e.target.value)}
              placeholder="e.g., 12"
              className="calc-input"
            />
          </div>
          <div className="flex items-end justify-center pb-2">
            <span className="text-2xl font-bold text-muted-foreground">:</span>
          </div>
          <div className="col-span-2">
            <Label htmlFor="b" className="mb-2 block">
              Second Value
            </Label>
            <Input
              id="b"
              type="number"
              value={b}
              onChange={(e) => setB(e.target.value)}
              placeholder="e.g., 18"
              className="calc-input"
            />
          </div>
        </div>

        {mode !== 'simplify' && (
          <div>
            <Label htmlFor="c" className="mb-2 block">
              {mode === 'scale' ? 'Scale Factor' : 'Known Value'}
            </Label>
            <Input
              id="c"
              type="number"
              value={c}
              onChange={(e) => setC(e.target.value)}
              placeholder={mode === 'scale' ? 'e.g., 5' : 'e.g., 10'}
              className="calc-input w-full sm:w-1/2"
            />
          </div>
        )}
      </div>

      {error && (
        <p className="text-destructive text-sm mb-4">{error}</p>
      )}

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
        <div className="calc-result animate-scale-in text-center">
          <p className="text-sm text-muted-foreground mb-2">Result:</p>
          <p className="calc-result-value">{result}</p>
        </div>
      )}
    </CalculatorLayout>
  );
};

export default RatioCalculator;
