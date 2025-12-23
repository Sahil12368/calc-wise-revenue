import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import { getCalculatorById } from '@/lib/calculators';

const BMRCalculator = () => {
  const calculator = getCalculatorById('bmr')!;
  
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState<{ bmr: number; activities: { name: string; calories: number }[] } | null>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    const numAge = parseFloat(age);
    const numHeight = parseFloat(height);
    const numWeight = parseFloat(weight);

    if (isNaN(numAge) || isNaN(numHeight) || isNaN(numWeight) ||
        numAge <= 0 || numHeight <= 0 || numWeight <= 0) {
      setError('Please enter valid positive values');
      setResult(null);
      return;
    }

    setError('');

    // Mifflin-St Jeor Equation
    let bmr: number;
    if (gender === 'male') {
      bmr = (10 * numWeight) + (6.25 * numHeight) - (5 * numAge) + 5;
    } else {
      bmr = (10 * numWeight) + (6.25 * numHeight) - (5 * numAge) - 161;
    }

    const activities = [
      { name: 'Sedentary (little or no exercise)', calories: bmr * 1.2 },
      { name: 'Light exercise (1-3 days/week)', calories: bmr * 1.375 },
      { name: 'Moderate exercise (3-5 days/week)', calories: bmr * 1.55 },
      { name: 'Active (6-7 days/week)', calories: bmr * 1.725 },
      { name: 'Very active (hard exercise daily)', calories: bmr * 1.9 },
    ];

    setResult({ bmr, activities });
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
      title="BMR Calculator"
      description="Calculate your Basal Metabolic Rate (BMR) - the calories your body burns at rest. Find your daily calorie needs."
      intro="Your BMR tells you how many calories your body needs at complete rest. Use this to understand your metabolism and plan your diet."
      formula={`Mifflin-St Jeor Equation:
Men: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) + 5
Women: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) - 161`}
      example={`Male, 30 years old, 175 cm, 70 kg:
BMR = (10 × 70) + (6.25 × 175) - (5 × 30) + 5
BMR = 700 + 1093.75 - 150 + 5
BMR = 1648.75 calories/day`}
      faqs={[
        {
          question: 'What is BMR?',
          answer: 'BMR (Basal Metabolic Rate) is the number of calories your body needs to maintain basic functions like breathing, circulation, and cell production while at complete rest.',
        },
        {
          question: 'How is BMR different from TDEE?',
          answer: 'BMR is calories burned at rest. TDEE (Total Daily Energy Expenditure) includes BMR plus calories burned through daily activities and exercise.',
        },
        {
          question: 'Can I eat only my BMR calories?',
          answer: 'No, you should not eat below your BMR. Your body needs additional calories for daily activities. Consult a nutritionist for proper calorie targets.',
        },
      ]}
    >
      {/* Input Fields */}
      <div className="space-y-4 mb-6">
        <div>
          <Label className="mb-2 block">Gender</Label>
          <Select value={gender} onValueChange={(v) => setGender(v as 'male' | 'female')}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="age" className="mb-2 block">Age (years)</Label>
            <Input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="e.g., 30"
              className="calc-input"
            />
          </div>
          <div>
            <Label htmlFor="height" className="mb-2 block">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="e.g., 175"
              className="calc-input"
            />
          </div>
          <div>
            <Label htmlFor="weight" className="mb-2 block">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="e.g., 70"
              className="calc-input"
            />
          </div>
        </div>
      </div>

      {error && <p className="text-destructive text-sm mb-4">{error}</p>}

      {/* Buttons */}
      <div className="flex gap-3 mb-6">
        <Button onClick={calculate} className="calc-btn flex-1">Calculate BMR</Button>
        <Button onClick={reset} variant="outline" className="calc-btn-secondary">Reset</Button>
      </div>

      {/* Result */}
      {result && (
        <div className="calc-result animate-scale-in">
          <div className="text-center mb-6">
            <p className="text-sm text-muted-foreground mb-2">Your Basal Metabolic Rate:</p>
            <p className="calc-result-value">{Math.round(result.bmr)} calories/day</p>
          </div>
          
          <div className="border-t border-border pt-4">
            <p className="font-semibold text-foreground mb-3">Daily Calorie Needs by Activity Level:</p>
            <div className="space-y-2">
              {result.activities.map((activity, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-background rounded-lg">
                  <span className="text-sm text-muted-foreground">{activity.name}</span>
                  <span className="font-semibold text-primary">{Math.round(activity.calories)} cal</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
};

export default BMRCalculator;
