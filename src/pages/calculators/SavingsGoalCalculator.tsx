import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import { getCalculatorById } from '@/lib/calculators';

const SavingsGoalCalculator = () => {
  const calculator = getCalculatorById('savings-goal')!;
  
  const [goalAmount, setGoalAmount] = useState('');
  const [currentSavings, setCurrentSavings] = useState('');
  const [months, setMonths] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [result, setResult] = useState<{ monthlySavings: number; totalSaved: number; interestEarned: number } | null>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    const goal = parseFloat(goalAmount);
    const current = parseFloat(currentSavings) || 0;
    const numMonths = parseFloat(months);
    const rate = parseFloat(interestRate) || 0;

    if (isNaN(goal) || isNaN(numMonths) || goal <= 0 || numMonths <= 0) {
      setError('Please enter valid goal amount and months');
      setResult(null);
      return;
    }

    if (goal <= current) {
      setError('Goal amount should be greater than current savings');
      setResult(null);
      return;
    }

    setError('');

    const remaining = goal - current;
    
    if (rate === 0) {
      const monthlySavings = remaining / numMonths;
      setResult({ monthlySavings, totalSaved: goal, interestEarned: 0 });
    } else {
      // With interest: using future value of annuity formula
      const monthlyRate = rate / 100 / 12;
      const futureValueOfCurrent = current * Math.pow(1 + monthlyRate, numMonths);
      const remainingNeeded = goal - futureValueOfCurrent;
      
      // PMT formula: PMT = FV * r / ((1 + r)^n - 1)
      const monthlySavings = remainingNeeded * monthlyRate / (Math.pow(1 + monthlyRate, numMonths) - 1);
      const totalSaved = current + monthlySavings * numMonths;
      const interestEarned = goal - totalSaved;
      
      setResult({ monthlySavings: Math.max(0, monthlySavings), totalSaved, interestEarned: Math.max(0, interestEarned) });
    }
  };

  const reset = () => {
    setGoalAmount('');
    setCurrentSavings('');
    setMonths('');
    setInterestRate('');
    setResult(null);
    setError('');
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      title="Savings Goal Calculator"
      description="Plan your savings to reach financial goals. Calculate how much to save monthly for your target amount."
      intro="Figure out how much you need to save each month to reach your financial goal. Account for existing savings and potential interest."
      formula="Monthly Savings = (Goal - Current Savings) / Months
With Interest: Uses future value of annuity formula"
      example={`Goal: ₹5,00,000
Current Savings: ₹50,000
Time: 24 months
Interest: 6% per year

Remaining needed: ₹4,50,000
Monthly savings needed: ≈₹17,500/month`}
      faqs={[
        {
          question: 'How do I set a realistic savings goal?',
          answer: 'Consider your monthly income, fixed expenses, and discretionary spending. A good rule is to save 20% of income, but adjust based on your goal timeline.',
        },
        {
          question: 'Should I include interest in my calculation?',
          answer: 'Yes, if you\'re putting savings in a high-yield savings account, FD, or investment. This reduces the monthly amount needed.',
        },
        {
          question: 'What if I can\'t save the calculated amount?',
          answer: 'Either extend your timeline, reduce your goal, or find ways to increase income. Even small regular savings add up over time.',
        },
      ]}
    >
      {/* Input Fields */}
      <div className="space-y-4 mb-6">
        <div>
          <Label htmlFor="goalAmount" className="mb-2 block">Savings Goal (₹)</Label>
          <Input id="goalAmount" type="number" value={goalAmount} onChange={(e) => setGoalAmount(e.target.value)} placeholder="e.g., 500000" className="calc-input" />
        </div>
        <div>
          <Label htmlFor="currentSavings" className="mb-2 block">Current Savings (₹) - Optional</Label>
          <Input id="currentSavings" type="number" value={currentSavings} onChange={(e) => setCurrentSavings(e.target.value)} placeholder="e.g., 50000" className="calc-input" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="months" className="mb-2 block">Time to Goal (months)</Label>
            <Input id="months" type="number" value={months} onChange={(e) => setMonths(e.target.value)} placeholder="e.g., 24" className="calc-input" />
          </div>
          <div>
            <Label htmlFor="interestRate" className="mb-2 block">Expected Return (% yearly) - Optional</Label>
            <Input id="interestRate" type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} placeholder="e.g., 6" className="calc-input" />
          </div>
        </div>
      </div>

      {error && <p className="text-destructive text-sm mb-4">{error}</p>}

      {/* Buttons */}
      <div className="flex gap-3 mb-6">
        <Button onClick={calculate} className="calc-btn flex-1">Calculate</Button>
        <Button onClick={reset} variant="outline" className="calc-btn-secondary">Reset</Button>
      </div>

      {/* Result */}
      {result && (
        <div className="calc-result animate-scale-in">
          <div className="text-center mb-6">
            <p className="text-sm text-muted-foreground mb-2">Save Monthly</p>
            <p className="calc-result-value">{formatCurrency(result.monthlySavings)}</p>
          </div>
          
          {result.interestEarned > 0 && (
            <div className="text-center p-4 bg-success-light rounded-lg mb-4">
              <p className="text-sm text-muted-foreground">Interest will contribute</p>
              <p className="text-xl font-bold text-success">{formatCurrency(result.interestEarned)}</p>
            </div>
          )}
          
          <div className="p-4 bg-background rounded-lg text-center">
            <p className="text-sm text-muted-foreground">Total you'll save (excluding interest)</p>
            <p className="text-lg font-semibold text-foreground">{formatCurrency(result.totalSaved)}</p>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
};

export default SavingsGoalCalculator;
