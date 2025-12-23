import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import { getCalculatorById } from '@/lib/calculators';

const AverageCalculator = () => {
  const calculator = getCalculatorById('average')!;
  
  const [numbers, setNumbers] = useState('');
  const [result, setResult] = useState<{ mean: number; median: number; mode: string; sum: number; count: number } | null>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    // Parse numbers from various formats
    const nums = numbers
      .replace(/[,\s]+/g, ' ')
      .trim()
      .split(' ')
      .map(n => parseFloat(n))
      .filter(n => !isNaN(n));

    if (nums.length === 0) {
      setError('Please enter at least one valid number');
      setResult(null);
      return;
    }

    setError('');

    // Mean
    const sum = nums.reduce((a, b) => a + b, 0);
    const mean = sum / nums.length;

    // Median
    const sorted = [...nums].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const median = sorted.length % 2 !== 0
      ? sorted[mid]
      : (sorted[mid - 1] + sorted[mid]) / 2;

    // Mode
    const frequency: Record<number, number> = {};
    let maxFreq = 0;
    nums.forEach(n => {
      frequency[n] = (frequency[n] || 0) + 1;
      maxFreq = Math.max(maxFreq, frequency[n]);
    });
    
    const modes = Object.entries(frequency)
      .filter(([_, freq]) => freq === maxFreq)
      .map(([num]) => parseFloat(num));
    
    const mode = maxFreq === 1 
      ? 'No mode (all values appear once)'
      : modes.join(', ');

    setResult({ mean, median, mode, sum, count: nums.length });
  };

  const reset = () => {
    setNumbers('');
    setResult(null);
    setError('');
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      title="Average Calculator"
      description="Calculate mean, median, and mode of a set of numbers. Free statistics calculator for students and professionals."
      intro="Find the average (mean), median, and mode of any set of numbers. Just enter your numbers separated by spaces or commas."
      formula={`Mean = Sum of all values / Number of values
Median = Middle value when sorted
Mode = Most frequently occurring value(s)`}
      example={`Numbers: 5, 10, 15, 10, 20, 10

Sum: 70
Count: 6
Mean: 70/6 = 11.67
Median: (10+10)/2 = 10
Mode: 10 (appears 3 times)`}
      faqs={[
        {
          question: 'What is the difference between mean, median, and mode?',
          answer: 'Mean is the arithmetic average. Median is the middle value when data is sorted. Mode is the value that appears most frequently.',
        },
        {
          question: 'When should I use median instead of mean?',
          answer: 'Use median when your data has outliers or is skewed. Mean is more affected by extreme values, while median gives the central tendency.',
        },
        {
          question: 'Can there be multiple modes?',
          answer: 'Yes! If two or more values appear with the same highest frequency, they are all modes. This is called bimodal or multimodal distribution.',
        },
      ]}
    >
      {/* Input */}
      <div className="mb-6">
        <Label htmlFor="numbers" className="mb-2 block">
          Enter Numbers (separated by spaces or commas)
        </Label>
        <Textarea
          id="numbers"
          value={numbers}
          onChange={(e) => setNumbers(e.target.value)}
          placeholder="e.g., 10, 20, 30, 40, 50 or 10 20 30 40 50"
          className="calc-input min-h-[100px]"
        />
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
        <div className="calc-result animate-scale-in">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-3 bg-background rounded-lg">
              <p className="text-sm text-muted-foreground">Count</p>
              <p className="text-xl font-bold text-foreground">{result.count}</p>
            </div>
            <div className="text-center p-3 bg-background rounded-lg">
              <p className="text-sm text-muted-foreground">Sum</p>
              <p className="text-xl font-bold text-foreground">{result.sum.toFixed(2)}</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-background rounded-lg">
              <span className="text-muted-foreground">Mean (Average)</span>
              <span className="text-xl font-bold text-primary">{result.mean.toFixed(4)}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-background rounded-lg">
              <span className="text-muted-foreground">Median</span>
              <span className="text-xl font-bold text-primary">{result.median.toFixed(4)}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-background rounded-lg">
              <span className="text-muted-foreground">Mode</span>
              <span className="text-xl font-bold text-primary">{result.mode}</span>
            </div>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
};

export default AverageCalculator;
