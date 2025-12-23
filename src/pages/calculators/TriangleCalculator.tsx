import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import { getCalculatorById } from '@/lib/calculators';

const TriangleCalculator = () => {
  const calculator = getCalculatorById('triangle')!;
  
  const [mode, setMode] = useState<'sides' | 'baseHeight'>('sides');
  const [sideA, setSideA] = useState('');
  const [sideB, setSideB] = useState('');
  const [sideC, setSideC] = useState('');
  const [base, setBase] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState<{ area: number; perimeter?: number; type?: string; angles?: number[] } | null>(null);

  const calculate = () => {
    if (mode === 'baseHeight') {
      const b = parseFloat(base);
      const h = parseFloat(height);
      if (isNaN(b) || isNaN(h) || b <= 0 || h <= 0) return;
      setResult({ area: (b * h) / 2 });
    } else {
      const a = parseFloat(sideA);
      const b = parseFloat(sideB);
      const c = parseFloat(sideC);
      
      if (isNaN(a) || isNaN(b) || isNaN(c) || a <= 0 || b <= 0 || c <= 0) return;
      
      // Check valid triangle
      if (a + b <= c || b + c <= a || a + c <= b) {
        setResult(null);
        alert('Invalid triangle: sum of any two sides must be greater than the third');
        return;
      }

      const perimeter = a + b + c;
      const s = perimeter / 2;
      const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));

      // Calculate angles using law of cosines
      const angleA = Math.acos((b * b + c * c - a * a) / (2 * b * c)) * 180 / Math.PI;
      const angleB = Math.acos((a * a + c * c - b * b) / (2 * a * c)) * 180 / Math.PI;
      const angleC = 180 - angleA - angleB;

      // Determine type
      let type: string;
      if (a === b && b === c) type = 'Equilateral';
      else if (a === b || b === c || a === c) type = 'Isosceles';
      else type = 'Scalene';

      if (Math.abs(angleA - 90) < 0.01 || Math.abs(angleB - 90) < 0.01 || Math.abs(angleC - 90) < 0.01) {
        type += ' Right';
      } else if (angleA > 90 || angleB > 90 || angleC > 90) {
        type += ' Obtuse';
      } else {
        type += ' Acute';
      }

      setResult({ area, perimeter, type, angles: [angleA, angleB, angleC] });
    }
  };

  const reset = () => {
    setSideA('');
    setSideB('');
    setSideC('');
    setBase('');
    setHeight('');
    setResult(null);
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      title="Triangle Calculator"
      description="Calculate triangle area, perimeter, angles, and identify triangle type."
      intro="Calculate all properties of a triangle using either three sides or base and height."
      formula="Area (Heron's): √[s(s-a)(s-b)(s-c)] where s = (a+b+c)/2 | Area (Base/Height): ½ × base × height"
      example="Triangle with sides 3, 4, 5: Area = 6, Perimeter = 12, Type = Scalene Right"
      faqs={[
        { question: 'What is a valid triangle?', answer: 'The sum of any two sides must be greater than the third side.' },
        { question: 'How are angles calculated?', answer: 'We use the Law of Cosines to calculate each angle from the three sides.' },
        { question: 'What are the triangle types?', answer: 'Equilateral (all sides equal), Isosceles (two equal), Scalene (all different). Can also be Right, Acute, or Obtuse.' },
      ]}
    >
      <div className="mb-6">
        <Label className="mb-2 block">Calculation Method</Label>
        <Select value={mode} onValueChange={(v) => { setMode(v as 'sides' | 'baseHeight'); reset(); }}>
          <SelectTrigger className="calc-input">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sides">Three Sides (SSS)</SelectItem>
            <SelectItem value="baseHeight">Base and Height</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {mode === 'sides' ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div>
            <Label htmlFor="sideA" className="mb-2 block">Side A</Label>
            <Input id="sideA" type="number" value={sideA} onChange={(e) => setSideA(e.target.value)} placeholder="3" className="calc-input" />
          </div>
          <div>
            <Label htmlFor="sideB" className="mb-2 block">Side B</Label>
            <Input id="sideB" type="number" value={sideB} onChange={(e) => setSideB(e.target.value)} placeholder="4" className="calc-input" />
          </div>
          <div>
            <Label htmlFor="sideC" className="mb-2 block">Side C</Label>
            <Input id="sideC" type="number" value={sideC} onChange={(e) => setSideC(e.target.value)} placeholder="5" className="calc-input" />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <Label htmlFor="base" className="mb-2 block">Base</Label>
            <Input id="base" type="number" value={base} onChange={(e) => setBase(e.target.value)} placeholder="10" className="calc-input" />
          </div>
          <div>
            <Label htmlFor="height" className="mb-2 block">Height</Label>
            <Input id="height" type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="5" className="calc-input" />
          </div>
        </div>
      )}

      <div className="flex gap-3 mb-6">
        <Button onClick={calculate} className="calc-btn flex-1">Calculate</Button>
        <Button onClick={reset} variant="outline" className="calc-btn-secondary">Reset</Button>
      </div>

      {result && (
        <div className="calc-result animate-scale-in">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Area</p>
              <p className="calc-result-value text-2xl">{result.area.toFixed(2)}</p>
            </div>
            {result.perimeter && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">Perimeter</p>
                <p className="text-xl font-bold text-foreground">{result.perimeter.toFixed(2)}</p>
              </div>
            )}
            {result.type && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">Type</p>
                <p className="text-lg font-bold text-foreground">{result.type}</p>
              </div>
            )}
            {result.angles && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">Angles</p>
                <p className="text-sm font-medium text-foreground">
                  {result.angles.map(a => a.toFixed(1) + '°').join(', ')}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
};

export default TriangleCalculator;
