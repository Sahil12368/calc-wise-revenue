import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import { getCalculatorById } from '@/lib/calculators';

const StandardDeviationCalculator = () => {
  const calculator = getCalculatorById('standard-deviation')!;
  
  const [input, setInput] = useState('');
  const [result, setResult] = useState<{ mean: number; variance: number; stdDev: number; count: number; sum: number; popStdDev: number } | null>(null);

  const calculate = () => {
    const numbers = input
      .split(/[,\s]+/)
      .map(n => parseFloat(n.trim()))
      .filter(n => !isNaN(n));

    if (numbers.length < 2) {
      alert('Please enter at least 2 numbers');
      return;
    }

    const count = numbers.length;
    const sum = numbers.reduce((a, b) => a + b, 0);
    const mean = sum / count;
    
    const squaredDiffs = numbers.map(n => Math.pow(n - mean, 2));
    const variance = squaredDiffs.reduce((a, b) => a + b, 0) / (count - 1);
    const popVariance = squaredDiffs.reduce((a, b) => a + b, 0) / count;
    const stdDev = Math.sqrt(variance);
    const popStdDev = Math.sqrt(popVariance);

    setResult({ mean, variance, stdDev, count, sum, popStdDev });
  };

  const reset = () => {
    setInput('');
    setResult(null);
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      title="Standard Deviation Calculator"
      description="Calculate standard deviation, variance, and other statistics for a data set."
      intro="Enter your numbers to calculate the standard deviation, variance, mean, and other statistical measures."
      formula="σ = √[Σ(xi - μ)² / N] (population) | s = √[Σ(xi - x̄)² / (n-1)] (sample)"
      example="Data: 2, 4, 4, 4, 5, 5, 7, 9 | Mean = 5 | Std Dev (sample) = 2.14"
      faqs={[
        { question: 'What is standard deviation?', answer: 'Standard deviation measures how spread out numbers are from the average. A low value means data points are close to the mean.' },
        { question: 'Sample vs Population?', answer: 'Use sample (n-1) for a sample of a larger population. Use population (N) when you have the entire population data.' },
        { question: 'How do I enter numbers?', answer: 'Enter numbers separated by commas or spaces. Example: 1, 2, 3, 4, 5 or 1 2 3 4 5' },
      ]}
    >
      <div className="mb-6">
        <Label htmlFor="input" className="mb-2 block">Enter numbers (comma or space separated)</Label>
        <Input
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="1, 2, 3, 4, 5 or 1 2 3 4 5"
          className="calc-input"
        />
      </div>

      <div className="flex gap-3 mb-6">
        <Button onClick={calculate} className="calc-btn flex-1">Calculate</Button>
        <Button onClick={reset} variant="outline" className="calc-btn-secondary">Reset</Button>
      </div>

      {result && (
        <div className="calc-result animate-scale-in">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Std Dev (Sample)</p>
              <p className="calc-result-value text-2xl">{result.stdDev.toFixed(4)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Std Dev (Population)</p>
              <p className="text-xl font-bold text-foreground">{result.popStdDev.toFixed(4)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Variance</p>
              <p className="text-xl font-bold text-foreground">{result.variance.toFixed(4)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Mean</p>
              <p className="text-xl font-bold text-foreground">{result.mean.toFixed(4)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Sum</p>
              <p className="text-xl font-bold text-foreground">{result.sum}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Count</p>
              <p className="text-xl font-bold text-foreground">{result.count}</p>
            </div>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
};

export default StandardDeviationCalculator;
