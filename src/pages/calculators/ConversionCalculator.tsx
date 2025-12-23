import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import { getCalculatorById } from '@/lib/calculators';

type Category = 'length' | 'weight' | 'temperature' | 'area' | 'volume' | 'speed' | 'data';

const ConversionCalculator = () => {
  const calculator = getCalculatorById('conversion')!;
  
  const [category, setCategory] = useState<Category>('length');
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const [value, setValue] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const units: Record<Category, { name: string; toBase: number }[]> = {
    length: [
      { name: 'Meters', toBase: 1 },
      { name: 'Kilometers', toBase: 1000 },
      { name: 'Centimeters', toBase: 0.01 },
      { name: 'Millimeters', toBase: 0.001 },
      { name: 'Miles', toBase: 1609.344 },
      { name: 'Yards', toBase: 0.9144 },
      { name: 'Feet', toBase: 0.3048 },
      { name: 'Inches', toBase: 0.0254 },
    ],
    weight: [
      { name: 'Kilograms', toBase: 1 },
      { name: 'Grams', toBase: 0.001 },
      { name: 'Milligrams', toBase: 0.000001 },
      { name: 'Pounds', toBase: 0.453592 },
      { name: 'Ounces', toBase: 0.0283495 },
      { name: 'Tons (metric)', toBase: 1000 },
    ],
    temperature: [
      { name: 'Celsius', toBase: 1 },
      { name: 'Fahrenheit', toBase: 1 },
      { name: 'Kelvin', toBase: 1 },
    ],
    area: [
      { name: 'Square Meters', toBase: 1 },
      { name: 'Square Kilometers', toBase: 1000000 },
      { name: 'Square Feet', toBase: 0.092903 },
      { name: 'Square Yards', toBase: 0.836127 },
      { name: 'Acres', toBase: 4046.86 },
      { name: 'Hectares', toBase: 10000 },
    ],
    volume: [
      { name: 'Liters', toBase: 1 },
      { name: 'Milliliters', toBase: 0.001 },
      { name: 'Gallons (US)', toBase: 3.78541 },
      { name: 'Quarts', toBase: 0.946353 },
      { name: 'Cups', toBase: 0.236588 },
      { name: 'Cubic Meters', toBase: 1000 },
    ],
    speed: [
      { name: 'Meters/second', toBase: 1 },
      { name: 'Kilometers/hour', toBase: 0.277778 },
      { name: 'Miles/hour', toBase: 0.44704 },
      { name: 'Feet/second', toBase: 0.3048 },
      { name: 'Knots', toBase: 0.514444 },
    ],
    data: [
      { name: 'Bytes', toBase: 1 },
      { name: 'Kilobytes', toBase: 1024 },
      { name: 'Megabytes', toBase: 1048576 },
      { name: 'Gigabytes', toBase: 1073741824 },
      { name: 'Terabytes', toBase: 1099511627776 },
    ],
  };

  const convertTemperature = (val: number, from: string, to: string): number => {
    let celsius: number;
    
    if (from === 'Celsius') celsius = val;
    else if (from === 'Fahrenheit') celsius = (val - 32) * 5/9;
    else celsius = val - 273.15;

    if (to === 'Celsius') return celsius;
    if (to === 'Fahrenheit') return celsius * 9/5 + 32;
    return celsius + 273.15;
  };

  const calculate = () => {
    const val = parseFloat(value);
    if (isNaN(val) || !fromUnit || !toUnit) return;

    if (category === 'temperature') {
      setResult(convertTemperature(val, fromUnit, toUnit));
      return;
    }

    const fromConversion = units[category].find(u => u.name === fromUnit)?.toBase || 1;
    const toConversion = units[category].find(u => u.name === toUnit)?.toBase || 1;
    
    const baseValue = val * fromConversion;
    setResult(baseValue / toConversion);
  };

  const reset = () => {
    setValue('');
    setResult(null);
  };

  const handleCategoryChange = (cat: Category) => {
    setCategory(cat);
    setFromUnit(units[cat][0].name);
    setToUnit(units[cat][1]?.name || units[cat][0].name);
    setResult(null);
  };

  // Initialize units on first render
  if (!fromUnit && units[category].length > 0) {
    setFromUnit(units[category][0].name);
    setToUnit(units[category][1]?.name || units[category][0].name);
  }

  return (
    <CalculatorLayout
      calculator={calculator}
      title="Unit Conversion Calculator"
      description="Convert between different units of measurement for length, weight, temperature, and more."
      intro="Convert between units quickly and accurately. Supports length, weight, temperature, area, volume, speed, and data."
      formula="Value in Target Unit = Value × (From Conversion Factor / To Conversion Factor)"
      example="100 km = 62.14 miles | 0°C = 32°F | 1 GB = 1024 MB"
      faqs={[
        { question: 'Are these conversions exact?', answer: 'Yes, we use standard conversion factors. Some may be rounded for display purposes.' },
        { question: 'Why is temperature conversion different?', answer: 'Temperature uses a different formula (not simple multiplication) because the scales have different zero points.' },
        { question: 'What data units are used?', answer: 'We use binary units where 1 KB = 1024 bytes (IEC standard), common in computing.' },
      ]}
    >
      <div className="mb-6">
        <Label className="mb-2 block">Category</Label>
        <Select value={category} onValueChange={(v) => handleCategoryChange(v as Category)}>
          <SelectTrigger className="calc-input">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="length">Length</SelectItem>
            <SelectItem value="weight">Weight</SelectItem>
            <SelectItem value="temperature">Temperature</SelectItem>
            <SelectItem value="area">Area</SelectItem>
            <SelectItem value="volume">Volume</SelectItem>
            <SelectItem value="speed">Speed</SelectItem>
            <SelectItem value="data">Data</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <Label htmlFor="value" className="mb-2 block">Value</Label>
          <Input
            id="value"
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter value"
            className="calc-input"
          />
        </div>
        <div>
          <Label className="mb-2 block">From</Label>
          <Select value={fromUnit} onValueChange={setFromUnit}>
            <SelectTrigger className="calc-input">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {units[category].map((u) => (
                <SelectItem key={u.name} value={u.name}>{u.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="mb-2 block">To</Label>
          <Select value={toUnit} onValueChange={setToUnit}>
            <SelectTrigger className="calc-input">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {units[category].map((u) => (
                <SelectItem key={u.name} value={u.name}>{u.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <Button onClick={calculate} className="calc-btn flex-1">Convert</Button>
        <Button onClick={reset} variant="outline" className="calc-btn-secondary">Reset</Button>
      </div>

      {result !== null && (
        <div className="calc-result animate-scale-in text-center">
          <p className="text-sm text-muted-foreground mb-2">
            {value} {fromUnit} =
          </p>
          <p className="calc-result-value">
            {result < 0.0001 || result > 9999999 
              ? result.toExponential(4) 
              : result.toLocaleString(undefined, { maximumFractionDigits: 6 })}
          </p>
          <p className="text-lg text-muted-foreground mt-1">{toUnit}</p>
        </div>
      )}
    </CalculatorLayout>
  );
};

export default ConversionCalculator;
