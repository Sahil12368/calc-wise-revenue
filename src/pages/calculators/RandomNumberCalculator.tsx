import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import { getCalculatorById } from '@/lib/calculators';

const RandomNumberCalculator = () => {
  const calculator = getCalculatorById('random-number')!;
  
  const [min, setMin] = useState('1');
  const [max, setMax] = useState('100');
  const [count, setCount] = useState('1');
  const [allowDuplicates, setAllowDuplicates] = useState(true);
  const [result, setResult] = useState<number[]>([]);

  const generate = () => {
    const minNum = parseInt(min);
    const maxNum = parseInt(max);
    const countNum = parseInt(count);

    if (isNaN(minNum) || isNaN(maxNum) || isNaN(countNum) || countNum < 1) return;
    if (minNum > maxNum) return;

    const range = maxNum - minNum + 1;
    
    if (!allowDuplicates && countNum > range) {
      alert(`Cannot generate ${countNum} unique numbers in range ${minNum}-${maxNum}`);
      return;
    }

    const numbers: number[] = [];
    
    if (allowDuplicates) {
      for (let i = 0; i < countNum; i++) {
        numbers.push(Math.floor(Math.random() * range) + minNum);
      }
    } else {
      const pool = Array.from({ length: range }, (_, i) => i + minNum);
      for (let i = 0; i < countNum; i++) {
        const index = Math.floor(Math.random() * pool.length);
        numbers.push(pool.splice(index, 1)[0]);
      }
    }

    setResult(numbers);
  };

  const reset = () => {
    setMin('1');
    setMax('100');
    setCount('1');
    setResult([]);
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      title="Random Number Generator"
      description="Generate random numbers within any range. Perfect for games, lotteries, or random selection."
      intro="Generate random numbers instantly. Set your range, choose how many numbers you need, and get truly random results."
      formula="Uses JavaScript's Math.random() with uniform distribution"
      example="Generate 5 random numbers between 1 and 100: 23, 67, 12, 89, 45"
      faqs={[
        { question: 'Are the numbers truly random?', answer: 'JavaScript uses a pseudo-random number generator which is suitable for most purposes but not for cryptographic use.' },
        { question: 'Can I generate without duplicates?', answer: 'Yes, uncheck "Allow duplicates" to generate unique numbers only.' },
        { question: 'What is the maximum range?', answer: 'You can use any integers. For very large ranges, performance may vary.' },
      ]}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <Label htmlFor="min" className="mb-2 block">Minimum</Label>
          <Input id="min" type="number" value={min} onChange={(e) => setMin(e.target.value)} className="calc-input" />
        </div>
        <div>
          <Label htmlFor="max" className="mb-2 block">Maximum</Label>
          <Input id="max" type="number" value={max} onChange={(e) => setMax(e.target.value)} className="calc-input" />
        </div>
        <div>
          <Label htmlFor="count" className="mb-2 block">How Many</Label>
          <Input id="count" type="number" value={count} onChange={(e) => setCount(e.target.value)} className="calc-input" />
        </div>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <input
          type="checkbox"
          id="duplicates"
          checked={allowDuplicates}
          onChange={(e) => setAllowDuplicates(e.target.checked)}
          className="h-4 w-4"
        />
        <Label htmlFor="duplicates">Allow duplicates</Label>
      </div>

      <div className="flex gap-3 mb-6">
        <Button onClick={generate} className="calc-btn flex-1">Generate</Button>
        <Button onClick={reset} variant="outline" className="calc-btn-secondary">Reset</Button>
      </div>

      {result.length > 0 && (
        <div className="calc-result animate-scale-in">
          <p className="text-sm text-muted-foreground mb-2 text-center">Generated Numbers:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {result.map((num, i) => (
              <span key={i} className="px-4 py-2 bg-primary/10 rounded-lg text-xl font-bold text-primary">
                {num}
              </span>
            ))}
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
};

export default RandomNumberCalculator;
