import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import { getCalculatorById } from '@/lib/calculators';

const ConcreteCalculator = () => {
  const calculator = getCalculatorById('concrete')!;
  
  const [shape, setShape] = useState<'slab' | 'column' | 'stairs'>('slab');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [depth, setDepth] = useState('');
  const [diameter, setDiameter] = useState('');
  const [height, setHeight] = useState('');
  const [steps, setSteps] = useState('');
  const [rise, setRise] = useState('');
  const [run, setRun] = useState('');
  const [result, setResult] = useState<{ cubicFeet: number; cubicYards: number; cubicMeters: number; bags60: number; bags80: number } | null>(null);

  const calculate = () => {
    let cubicFeet: number;

    if (shape === 'slab') {
      const l = parseFloat(length);
      const w = parseFloat(width);
      const d = parseFloat(depth) / 12; // inches to feet
      if (isNaN(l) || isNaN(w) || isNaN(d)) return;
      cubicFeet = l * w * d;
    } else if (shape === 'column') {
      const d = parseFloat(diameter) / 12; // inches to feet
      const h = parseFloat(height);
      if (isNaN(d) || isNaN(h)) return;
      cubicFeet = Math.PI * Math.pow(d / 2, 2) * h;
    } else {
      const w = parseFloat(width);
      const numSteps = parseInt(steps);
      const riseIn = parseFloat(rise) / 12;
      const runIn = parseFloat(run) / 12;
      if (isNaN(w) || isNaN(numSteps) || isNaN(riseIn) || isNaN(runIn)) return;
      
      let total = 0;
      for (let i = 1; i <= numSteps; i++) {
        total += w * runIn * (riseIn * i);
      }
      cubicFeet = total;
    }

    const cubicYards = cubicFeet / 27;
    const cubicMeters = cubicFeet * 0.0283168;
    const bags60 = Math.ceil(cubicFeet / 0.45); // 60lb bag covers ~0.45 cu ft
    const bags80 = Math.ceil(cubicFeet / 0.6);  // 80lb bag covers ~0.6 cu ft

    setResult({ cubicFeet, cubicYards, cubicMeters, bags60, bags80 });
  };

  const reset = () => {
    setLength('');
    setWidth('');
    setDepth('');
    setDiameter('');
    setHeight('');
    setSteps('');
    setRise('');
    setRun('');
    setResult(null);
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      title="Concrete Calculator"
      description="Calculate concrete volume needed for slabs, columns, and stairs projects."
      intro="Estimate how much concrete you need for your project. Get results in cubic yards and number of bags."
      formula="Slab: Volume = Length × Width × Depth | Column: Volume = π × (Diameter/2)² × Height"
      example="10' × 10' slab at 4\" thick = 1.23 cubic yards = 28 bags (80lb)"
      faqs={[
        { question: 'How much extra should I order?', answer: 'Order 5-10% extra to account for spillage, uneven ground, and waste.' },
        { question: 'What is a cubic yard?', answer: 'A cubic yard is 27 cubic feet (3×3×3 feet). Most concrete is sold by the cubic yard.' },
        { question: 'Should I use bags or ready-mix?', answer: 'For projects over 1 cubic yard, ready-mix delivery is usually more economical and easier.' },
      ]}
    >
      <div className="mb-6">
        <Label className="mb-2 block">Project Type</Label>
        <Select value={shape} onValueChange={(v) => { setShape(v as 'slab' | 'column' | 'stairs'); reset(); }}>
          <SelectTrigger className="calc-input">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="slab">Slab / Patio / Footing</SelectItem>
            <SelectItem value="column">Column / Cylinder</SelectItem>
            <SelectItem value="stairs">Stairs</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {shape === 'slab' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div>
            <Label htmlFor="length" className="mb-2 block">Length (feet)</Label>
            <Input id="length" type="number" value={length} onChange={(e) => setLength(e.target.value)} placeholder="10" className="calc-input" />
          </div>
          <div>
            <Label htmlFor="width" className="mb-2 block">Width (feet)</Label>
            <Input id="width" type="number" value={width} onChange={(e) => setWidth(e.target.value)} placeholder="10" className="calc-input" />
          </div>
          <div>
            <Label htmlFor="depth" className="mb-2 block">Depth (inches)</Label>
            <Input id="depth" type="number" value={depth} onChange={(e) => setDepth(e.target.value)} placeholder="4" className="calc-input" />
          </div>
        </div>
      )}

      {shape === 'column' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <Label htmlFor="diameter" className="mb-2 block">Diameter (inches)</Label>
            <Input id="diameter" type="number" value={diameter} onChange={(e) => setDiameter(e.target.value)} placeholder="12" className="calc-input" />
          </div>
          <div>
            <Label htmlFor="height" className="mb-2 block">Height (feet)</Label>
            <Input id="height" type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="8" className="calc-input" />
          </div>
        </div>
      )}

      {shape === 'stairs' && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div>
            <Label htmlFor="width" className="mb-2 block">Width (feet)</Label>
            <Input id="width" type="number" value={width} onChange={(e) => setWidth(e.target.value)} placeholder="4" className="calc-input" />
          </div>
          <div>
            <Label htmlFor="steps" className="mb-2 block">Number of Steps</Label>
            <Input id="steps" type="number" value={steps} onChange={(e) => setSteps(e.target.value)} placeholder="5" className="calc-input" />
          </div>
          <div>
            <Label htmlFor="rise" className="mb-2 block">Rise (inches)</Label>
            <Input id="rise" type="number" value={rise} onChange={(e) => setRise(e.target.value)} placeholder="7" className="calc-input" />
          </div>
          <div>
            <Label htmlFor="run" className="mb-2 block">Run (inches)</Label>
            <Input id="run" type="number" value={run} onChange={(e) => setRun(e.target.value)} placeholder="11" className="calc-input" />
          </div>
        </div>
      )}

      <div className="flex gap-3 mb-6">
        <Button onClick={calculate} className="calc-btn flex-1">Calculate</Button>
        <Button onClick={reset} variant="outline" className="calc-btn-secondary">Reset</Button>
      </div>

      {result && (
        <div className="calc-result animate-scale-in">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Cubic Yards</p>
              <p className="calc-result-value text-2xl">{result.cubicYards.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Cubic Feet</p>
              <p className="text-xl font-bold text-foreground">{result.cubicFeet.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Cubic Meters</p>
              <p className="text-xl font-bold text-foreground">{result.cubicMeters.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">60lb Bags</p>
              <p className="text-xl font-bold text-foreground">{result.bags60}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">80lb Bags</p>
              <p className="text-xl font-bold text-foreground">{result.bags80}</p>
            </div>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
};

export default ConcreteCalculator;
