import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import { getCalculatorById } from '@/lib/calculators';

const BodyFatCalculator = () => {
  const calculator = getCalculatorById('body-fat')!;
  
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState('');
  const [waist, setWaist] = useState('');
  const [neck, setNeck] = useState('');
  const [hip, setHip] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState<{ bodyFat: number; category: string; leanMass: number; fatMass: number } | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const waistCm = parseFloat(waist);
    const neckCm = parseFloat(neck);
    const heightCm = parseFloat(height);
    const hipCm = parseFloat(hip) || 0;

    if (isNaN(w) || isNaN(waistCm) || isNaN(neckCm) || isNaN(heightCm)) return;
    if (gender === 'female' && isNaN(hipCm)) return;

    let bodyFat: number;
    
    if (gender === 'male') {
      bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waistCm - neckCm) + 0.15456 * Math.log10(heightCm)) - 450;
    } else {
      bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waistCm + hipCm - neckCm) + 0.22100 * Math.log10(heightCm)) - 450;
    }

    bodyFat = Math.max(0, Math.min(bodyFat, 60));

    let category: string;
    if (gender === 'male') {
      if (bodyFat < 6) category = 'Essential Fat';
      else if (bodyFat < 14) category = 'Athletic';
      else if (bodyFat < 18) category = 'Fitness';
      else if (bodyFat < 25) category = 'Average';
      else category = 'Obese';
    } else {
      if (bodyFat < 14) category = 'Essential Fat';
      else if (bodyFat < 21) category = 'Athletic';
      else if (bodyFat < 25) category = 'Fitness';
      else if (bodyFat < 32) category = 'Average';
      else category = 'Obese';
    }

    const fatMass = (w * bodyFat) / 100;
    const leanMass = w - fatMass;

    setResult({ bodyFat, category, leanMass, fatMass });
  };

  const reset = () => {
    setWeight('');
    setWaist('');
    setNeck('');
    setHip('');
    setHeight('');
    setResult(null);
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      title="Body Fat Calculator"
      description="Estimate your body fat percentage using the U.S. Navy method with body measurements."
      intro="Calculate your body fat percentage using simple body measurements. This uses the U.S. Navy circumference method."
      formula="Uses the U.S. Navy body fat formula based on height, waist, neck, and hip (for women) measurements"
      example="Male, 180cm height, 85cm waist, 38cm neck: Body Fat ≈ 18%"
      faqs={[
        { question: 'How accurate is this method?', answer: 'The Navy method is accurate within 3-4% for most people. DEXA scans are more precise but expensive.' },
        { question: 'What is a healthy body fat percentage?', answer: 'For men: 10-20% is healthy. For women: 18-28% is healthy. Athletes may be lower.' },
        { question: 'Where should I measure my waist?', answer: 'Measure at your navel level for men, at the narrowest point for women. Keep the tape level.' },
      ]}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <Label className="mb-2 block">Gender</Label>
          <Select value={gender} onValueChange={(v) => setGender(v as 'male' | 'female')}>
            <SelectTrigger className="calc-input">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="weight" className="mb-2 block">Weight (kg)</Label>
          <Input id="weight" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="75" className="calc-input" />
        </div>
        <div>
          <Label htmlFor="height" className="mb-2 block">Height (cm)</Label>
          <Input id="height" type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="175" className="calc-input" />
        </div>
        <div>
          <Label htmlFor="waist" className="mb-2 block">Waist (cm)</Label>
          <Input id="waist" type="number" value={waist} onChange={(e) => setWaist(e.target.value)} placeholder="85" className="calc-input" />
        </div>
        <div>
          <Label htmlFor="neck" className="mb-2 block">Neck (cm)</Label>
          <Input id="neck" type="number" value={neck} onChange={(e) => setNeck(e.target.value)} placeholder="38" className="calc-input" />
        </div>
        {gender === 'female' && (
          <div>
            <Label htmlFor="hip" className="mb-2 block">Hip (cm)</Label>
            <Input id="hip" type="number" value={hip} onChange={(e) => setHip(e.target.value)} placeholder="95" className="calc-input" />
          </div>
        )}
      </div>

      <div className="flex gap-3 mb-6">
        <Button onClick={calculate} className="calc-btn flex-1">Calculate</Button>
        <Button onClick={reset} variant="outline" className="calc-btn-secondary">Reset</Button>
      </div>

      {result && (
        <div className="calc-result animate-scale-in">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Body Fat</p>
              <p className="calc-result-value text-2xl">{result.bodyFat.toFixed(1)}%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Category</p>
              <p className="text-xl font-bold text-foreground">{result.category}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Fat Mass</p>
              <p className="text-xl font-bold text-foreground">{result.fatMass.toFixed(1)} kg</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Lean Mass</p>
              <p className="text-xl font-bold text-foreground">{result.leanMass.toFixed(1)} kg</p>
            </div>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
};

export default BodyFatCalculator;
