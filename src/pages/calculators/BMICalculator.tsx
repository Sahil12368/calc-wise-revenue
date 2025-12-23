import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import { getCalculatorById } from '@/lib/calculators';

const BMICalculator = () => {
  const calculator = getCalculatorById('bmi')!;
  
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [height, setHeight] = useState('');
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState<{ bmi: number; category: string; color: string } | null>(null);
  const [error, setError] = useState('');

  const getBMICategory = (bmi: number): { category: string; color: string } => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-info' };
    if (bmi < 25) return { category: 'Normal weight', color: 'text-success' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-warning' };
    return { category: 'Obese', color: 'text-destructive' };
  };

  const calculate = () => {
    let heightInMeters: number;
    let weightInKg: number;

    if (unit === 'metric') {
      heightInMeters = parseFloat(height) / 100;
      weightInKg = parseFloat(weight);
    } else {
      const feet = parseFloat(heightFeet) || 0;
      const inches = parseFloat(heightInches) || 0;
      heightInMeters = ((feet * 12) + inches) * 0.0254;
      weightInKg = parseFloat(weight) * 0.453592;
    }

    if (!heightInMeters || !weightInKg || heightInMeters <= 0 || weightInKg <= 0) {
      setError('Please enter valid height and weight');
      setResult(null);
      return;
    }

    setError('');
    const bmi = weightInKg / (heightInMeters * heightInMeters);
    const { category, color } = getBMICategory(bmi);
    setResult({ bmi, category, color });
  };

  const reset = () => {
    setHeight('');
    setHeightFeet('');
    setHeightInches('');
    setWeight('');
    setResult(null);
    setError('');
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      title="BMI Calculator"
      description="Calculate your Body Mass Index (BMI) to determine if you're underweight, normal, overweight, or obese. Free BMI calculator with category."
      intro="Check your Body Mass Index (BMI) using our free calculator. BMI helps assess whether your weight is in a healthy range for your height."
      formula="BMI = Weight (kg) / Height² (m²)"
      example={`Height: 175 cm (1.75 m)
Weight: 70 kg
BMI = 70 / (1.75 × 1.75) = 70 / 3.0625 = 22.86
Category: Normal weight`}
      faqs={[
        {
          question: 'What is a healthy BMI range?',
          answer: 'A BMI between 18.5 and 24.9 is considered normal weight. Below 18.5 is underweight, 25-29.9 is overweight, and 30 or above is obese.',
        },
        {
          question: 'Is BMI accurate for everyone?',
          answer: 'BMI is a general indicator and may not be accurate for athletes (who have more muscle mass), elderly people, or pregnant women. Consult a healthcare provider for personalized advice.',
        },
        {
          question: 'How often should I check my BMI?',
          answer: 'Checking your BMI monthly or quarterly is sufficient for most people. Focus on overall health trends rather than daily fluctuations.',
        },
        {
          question: 'Can children use this BMI calculator?',
          answer: 'This calculator is designed for adults (18+). Children and teens should use age-specific BMI percentile charts.',
        },
      ]}
    >
      {/* Unit Selector */}
      <div className="mb-6">
        <Label className="mb-2 block">Unit System</Label>
        <Select value={unit} onValueChange={(v) => { setUnit(v as 'metric' | 'imperial'); reset(); }}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="metric">Metric (cm, kg)</SelectItem>
            <SelectItem value="imperial">Imperial (ft/in, lbs)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Input Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {unit === 'metric' ? (
          <div>
            <Label htmlFor="height" className="mb-2 block">
              Height (cm)
            </Label>
            <Input
              id="height"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="e.g., 175"
              className="calc-input"
            />
          </div>
        ) : (
          <div>
            <Label className="mb-2 block">Height</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                value={heightFeet}
                onChange={(e) => setHeightFeet(e.target.value)}
                placeholder="Feet"
                className="calc-input"
              />
              <Input
                type="number"
                value={heightInches}
                onChange={(e) => setHeightInches(e.target.value)}
                placeholder="Inches"
                className="calc-input"
              />
            </div>
          </div>
        )}
        <div>
          <Label htmlFor="weight" className="mb-2 block">
            Weight ({unit === 'metric' ? 'kg' : 'lbs'})
          </Label>
          <Input
            id="weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder={unit === 'metric' ? 'e.g., 70' : 'e.g., 154'}
            className="calc-input"
          />
        </div>
      </div>

      {error && (
        <p className="text-destructive text-sm mb-4">{error}</p>
      )}

      {/* Buttons */}
      <div className="flex gap-3 mb-6">
        <Button onClick={calculate} className="calc-btn flex-1">
          Calculate BMI
        </Button>
        <Button onClick={reset} variant="outline" className="calc-btn-secondary">
          Reset
        </Button>
      </div>

      {/* Result */}
      {result && (
        <div className="calc-result animate-scale-in">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Your BMI:</p>
            <p className="calc-result-value mb-2">{result.bmi.toFixed(1)}</p>
            <p className={`text-xl font-semibold ${result.color}`}>{result.category}</p>
          </div>
          
          {/* BMI Scale */}
          <div className="mt-6 pt-4 border-t border-border">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>Underweight</span>
              <span>Normal</span>
              <span>Overweight</span>
              <span>Obese</span>
            </div>
            <div className="h-3 rounded-full overflow-hidden flex">
              <div className="bg-info flex-1" />
              <div className="bg-success flex-1" />
              <div className="bg-warning flex-1" />
              <div className="bg-destructive flex-1" />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>&lt;18.5</span>
              <span>18.5-24.9</span>
              <span>25-29.9</span>
              <span>30+</span>
            </div>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
};

export default BMICalculator;
