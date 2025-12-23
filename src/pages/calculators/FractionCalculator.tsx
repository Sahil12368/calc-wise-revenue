import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import { getCalculatorById } from '@/lib/calculators';

const FractionCalculator = () => {
  const calculator = getCalculatorById('fraction')!;
  
  const [num1, setNum1] = useState('');
  const [den1, setDen1] = useState('');
  const [num2, setNum2] = useState('');
  const [den2, setDen2] = useState('');
  const [operation, setOperation] = useState('+');
  const [result, setResult] = useState<{ num: number; den: number; decimal: number; simplified: string } | null>(null);

  const gcd = (a: number, b: number): number => {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
      const t = b;
      b = a % b;
      a = t;
    }
    return a;
  };

  const simplify = (num: number, den: number): string => {
    if (den === 0) return 'Undefined';
    const g = gcd(num, den);
    const sNum = num / g;
    const sDen = den / g;
    if (sDen === 1) return sNum.toString();
    if (sDen < 0) return `${-sNum}/${-sDen}`;
    return `${sNum}/${sDen}`;
  };

  const calculate = () => {
    const n1 = parseInt(num1);
    const d1 = parseInt(den1);
    const n2 = parseInt(num2);
    const d2 = parseInt(den2);

    if (isNaN(n1) || isNaN(d1) || isNaN(n2) || isNaN(d2) || d1 === 0 || d2 === 0) return;

    let resNum: number;
    let resDen: number;

    switch (operation) {
      case '+':
        resNum = n1 * d2 + n2 * d1;
        resDen = d1 * d2;
        break;
      case '-':
        resNum = n1 * d2 - n2 * d1;
        resDen = d1 * d2;
        break;
      case '×':
        resNum = n1 * n2;
        resDen = d1 * d2;
        break;
      case '÷':
        resNum = n1 * d2;
        resDen = d1 * n2;
        break;
      default:
        return;
    }

    const g = gcd(resNum, resDen);
    const decimal = resNum / resDen;

    setResult({
      num: resNum / g,
      den: resDen / g,
      decimal,
      simplified: simplify(resNum, resDen),
    });
  };

  const reset = () => {
    setNum1('');
    setDen1('');
    setNum2('');
    setDen2('');
    setResult(null);
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      title="Fraction Calculator"
      description="Add, subtract, multiply, and divide fractions with automatic simplification."
      intro="Perform operations on fractions easily. Results are automatically simplified to lowest terms."
      formula="Addition: a/b + c/d = (ad + bc)/bd | Multiplication: a/b × c/d = ac/bd"
      example="1/2 + 1/3 = 5/6 | 2/3 × 3/4 = 1/2"
      faqs={[
        { question: 'How are fractions simplified?', answer: 'We divide both numerator and denominator by their greatest common divisor (GCD).' },
        { question: 'Can I use negative numbers?', answer: 'Yes, you can enter negative numbers for either the numerator or denominator.' },
        { question: 'What if my denominator is 0?', answer: 'Division by zero is undefined. The calculator will not compute if any denominator is zero.' },
      ]}
    >
      <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
        <div className="flex flex-col items-center">
          <Input
            type="number"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
            placeholder="1"
            className="w-20 text-center calc-input"
          />
          <div className="w-16 h-0.5 bg-foreground my-1" />
          <Input
            type="number"
            value={den1}
            onChange={(e) => setDen1(e.target.value)}
            placeholder="2"
            className="w-20 text-center calc-input"
          />
        </div>

        <Select value={operation} onValueChange={setOperation}>
          <SelectTrigger className="w-16">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="+">+</SelectItem>
            <SelectItem value="-">−</SelectItem>
            <SelectItem value="×">×</SelectItem>
            <SelectItem value="÷">÷</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex flex-col items-center">
          <Input
            type="number"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
            placeholder="1"
            className="w-20 text-center calc-input"
          />
          <div className="w-16 h-0.5 bg-foreground my-1" />
          <Input
            type="number"
            value={den2}
            onChange={(e) => setDen2(e.target.value)}
            placeholder="3"
            className="w-20 text-center calc-input"
          />
        </div>
      </div>

      <div className="flex gap-3 mb-6 justify-center">
        <Button onClick={calculate} className="calc-btn">Calculate</Button>
        <Button onClick={reset} variant="outline" className="calc-btn-secondary">Reset</Button>
      </div>

      {result && (
        <div className="calc-result animate-scale-in">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Result:</p>
            <p className="calc-result-value mb-2">{result.simplified}</p>
            <p className="text-lg text-muted-foreground">
              Decimal: {result.decimal.toFixed(6)}
            </p>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
};

export default FractionCalculator;
