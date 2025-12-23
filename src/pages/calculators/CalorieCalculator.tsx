import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import { getCalculatorById } from '@/lib/calculators';

const CalorieCalculator = () => {
  const calculator = getCalculatorById('calorie')!;
  
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activity, setActivity] = useState('1.55');
  const [goal, setGoal] = useState<'lose' | 'maintain' | 'gain'>('maintain');
  const [result, setResult] = useState<{ tdee: number; target: number; deficit: number } | null>(null);
  const [error, setError] = useState('');

  const activityLevels = [
    { value: '1.2', label: 'Sedentary (little or no exercise)' },
    { value: '1.375', label: 'Light (exercise 1-3 days/week)' },
    { value: '1.55', label: 'Moderate (exercise 3-5 days/week)' },
    { value: '1.725', label: 'Active (exercise 6-7 days/week)' },
    { value: '1.9', label: 'Very Active (hard exercise daily)' },
  ];

  const calculate = () => {
    const numAge = parseFloat(age);
    const numHeight = parseFloat(height);
    const numWeight = parseFloat(weight);
    const activityMultiplier = parseFloat(activity);

    if (isNaN(numAge) || isNaN(numHeight) || isNaN(numWeight)) {
      setError('Please enter valid values');
      setResult(null);
      return;
    }

    setError('');

    // BMR using Mifflin-St Jeor
    let bmr: number;
    if (gender === 'male') {
      bmr = (10 * numWeight) + (6.25 * numHeight) - (5 * numAge) + 5;
    } else {
      bmr = (10 * numWeight) + (6.25 * numHeight) - (5 * numAge) - 161;
    }

    const tdee = bmr * activityMultiplier;
    
    let target: number;
    let deficit: number;
    
    switch (goal) {
      case 'lose':
        deficit = 500;
        target = tdee - deficit;
        break;
      case 'gain':
        deficit = -300;
        target = tdee + 300;
        break;
      default:
        deficit = 0;
        target = tdee;
    }

    setResult({ tdee, target, deficit });
  };

  const reset = () => {
    setAge('');
    setHeight('');
    setWeight('');
    setResult(null);
    setError('');
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      title="Daily Calorie Calculator"
      description="Calculate your daily calorie requirements based on your age, height, weight, and activity level. Find calories needed to lose, maintain, or gain weight."
      intro="Find out how many calories you need each day based on your body and activity level. Get personalized recommendations for your fitness goals."
      formula={`TDEE = BMR × Activity Multiplier
Weight Loss: TDEE - 500 calories/day (≈1 lb/week loss)
Weight Gain: TDEE + 300 calories/day`}
      example={`Male, 30 years, 175 cm, 70 kg, Moderate activity:
BMR = 1648.75 cal
TDEE = 1648.75 × 1.55 = 2556 calories
For weight loss: 2556 - 500 = 2056 calories/day`}
      faqs={[
        {
          question: 'What is TDEE?',
          answer: 'TDEE (Total Daily Energy Expenditure) is the total number of calories you burn per day, including all activities and exercise.',
        },
        {
          question: 'How accurate is this calorie calculator?',
          answer: 'This provides a good estimate using the Mifflin-St Jeor equation. Individual metabolism varies, so adjust based on your results over 2-4 weeks.',
        },
        {
          question: 'How fast should I lose weight?',
          answer: 'A safe rate is 0.5-1 kg (1-2 lbs) per week. This requires a deficit of 500-1000 calories daily. Faster weight loss can lead to muscle loss.',
        },
      ]}
    >
      {/* Input Fields */}
      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className="mb-2 block">Gender</Label>
            <Select value={gender} onValueChange={(v) => setGender(v as 'male' | 'female')}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="age" className="mb-2 block">Age (years)</Label>
            <Input id="age" type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="e.g., 30" className="calc-input" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="height" className="mb-2 block">Height (cm)</Label>
            <Input id="height" type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="e.g., 175" className="calc-input" />
          </div>
          <div>
            <Label htmlFor="weight" className="mb-2 block">Weight (kg)</Label>
            <Input id="weight" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g., 70" className="calc-input" />
          </div>
        </div>

        <div>
          <Label className="mb-2 block">Activity Level</Label>
          <Select value={activity} onValueChange={setActivity}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {activityLevels.map((level) => (
                <SelectItem key={level.value} value={level.value}>{level.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="mb-2 block">Goal</Label>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'lose', label: 'Lose Weight' },
              { id: 'maintain', label: 'Maintain Weight' },
              { id: 'gain', label: 'Gain Weight' },
            ].map((g) => (
              <Button
                key={g.id}
                variant={goal === g.id ? 'default' : 'outline'}
                onClick={() => setGoal(g.id as typeof goal)}
                className="text-sm"
              >
                {g.label}
              </Button>
            ))}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="text-center p-4 bg-background rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Maintenance Calories (TDEE)</p>
              <p className="text-2xl font-bold text-foreground">{Math.round(result.tdee)} cal/day</p>
            </div>
            <div className="text-center p-4 bg-background rounded-lg border-2 border-primary">
              <p className="text-sm text-muted-foreground mb-1">Target Calories</p>
              <p className="text-2xl font-bold text-primary">{Math.round(result.target)} cal/day</p>
              {result.deficit !== 0 && (
                <p className="text-xs text-muted-foreground mt-1">
                  {result.deficit > 0 ? `-${result.deficit}` : `+${Math.abs(result.deficit)}`} from TDEE
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
};

export default CalorieCalculator;
