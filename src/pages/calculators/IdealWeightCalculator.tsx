import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import { getCalculatorById } from '@/lib/calculators';

const IdealWeightCalculator = () => {
  const calculator = getCalculatorById('ideal-weight')!;
  
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState<{ robinson: number; miller: number; devine: number; hamwi: number; range: { min: number; max: number } } | null>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    const numHeight = parseFloat(height);

    if (isNaN(numHeight) || numHeight <= 0) {
      setError('Please enter a valid height');
      setResult(null);
      return;
    }

    if (numHeight < 152) {
      setError('Height should be at least 152 cm (5 feet) for accurate results');
      setResult(null);
      return;
    }

    setError('');

    // Convert cm to inches above 5 feet
    const inchesOver5Feet = (numHeight - 152.4) / 2.54;

    let robinson: number, miller: number, devine: number, hamwi: number;

    if (gender === 'male') {
      robinson = 52 + 1.9 * inchesOver5Feet;
      miller = 56.2 + 1.41 * inchesOver5Feet;
      devine = 50 + 2.3 * inchesOver5Feet;
      hamwi = 48 + 2.7 * inchesOver5Feet;
    } else {
      robinson = 49 + 1.7 * inchesOver5Feet;
      miller = 53.1 + 1.36 * inchesOver5Feet;
      devine = 45.5 + 2.3 * inchesOver5Feet;
      hamwi = 45.5 + 2.2 * inchesOver5Feet;
    }

    // Calculate healthy range (±10%)
    const average = (robinson + miller + devine + hamwi) / 4;
    const range = {
      min: average * 0.9,
      max: average * 1.1,
    };

    setResult({ robinson, miller, devine, hamwi, range });
  };

  const reset = () => {
    setHeight('');
    setResult(null);
    setError('');
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      title="Ideal Weight Calculator"
      description="Calculate your ideal body weight using multiple scientific formulas. Find your healthy weight range based on height and gender."
      intro="Find your ideal weight using four different scientific formulas. Get a healthy weight range tailored to your height and gender."
      formula={`Robinson Formula:
Men: 52 kg + 1.9 kg per inch over 5 feet
Women: 49 kg + 1.7 kg per inch over 5 feet

Miller Formula:
Men: 56.2 kg + 1.41 kg per inch over 5 feet
Women: 53.1 kg + 1.36 kg per inch over 5 feet`}
      example={`Male, 175 cm (5'9"):
Inches over 5 feet = (175 - 152.4) / 2.54 = 8.9"
Robinson: 52 + (1.9 × 8.9) = 68.9 kg
Miller: 56.2 + (1.41 × 8.9) = 68.7 kg`}
      faqs={[
        {
          question: 'Which ideal weight formula is most accurate?',
          answer: 'No single formula is perfect for everyone. The average of all formulas gives a reasonable estimate. Consider your body composition and consult a healthcare provider.',
        },
        {
          question: 'Why are there different ideal weight formulas?',
          answer: 'Different researchers developed these formulas based on different populations and criteria. Using multiple formulas provides a more comprehensive view.',
        },
        {
          question: 'Is ideal weight the same as healthy weight?',
          answer: 'Ideal weight is an estimate based on height. Healthy weight also depends on muscle mass, bone density, age, and overall health. BMI and body fat percentage are also important.',
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

        <div>
          <Label htmlFor="height" className="mb-2 block">Height (cm)</Label>
          <Input
            id="height"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="e.g., 175"
            className="calc-input w-full sm:w-1/2"
          />
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
          <div className="text-center mb-6 p-4 bg-background rounded-lg border-2 border-primary">
            <p className="text-sm text-muted-foreground mb-2">Healthy Weight Range</p>
            <p className="calc-result-value">{result.range.min.toFixed(1)} - {result.range.max.toFixed(1)} kg</p>
          </div>
          
          <div className="border-t border-border pt-4">
            <p className="font-semibold text-foreground mb-3">By Formula:</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: 'Robinson', value: result.robinson },
                { name: 'Miller', value: result.miller },
                { name: 'Devine', value: result.devine },
                { name: 'Hamwi', value: result.hamwi },
              ].map((formula) => (
                <div key={formula.name} className="p-3 bg-background rounded-lg text-center">
                  <p className="text-xs text-muted-foreground">{formula.name}</p>
                  <p className="font-semibold text-foreground">{formula.value.toFixed(1)} kg</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
};

export default IdealWeightCalculator;
