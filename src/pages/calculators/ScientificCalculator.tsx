import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import { getCalculatorById } from '@/lib/calculators';

const ScientificCalculator = () => {
  const calculator = getCalculatorById('scientific')!;
  
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [isNewNumber, setIsNewNumber] = useState(true);

  const handleNumber = (num: string) => {
    if (isNewNumber) {
      setDisplay(num);
      setIsNewNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperator = (op: string) => {
    setEquation(display + ' ' + op + ' ');
    setIsNewNumber(true);
  };

  const handleFunction = (func: string) => {
    const num = parseFloat(display);
    let result: number;

    switch (func) {
      case 'sin': result = Math.sin(num * Math.PI / 180); break;
      case 'cos': result = Math.cos(num * Math.PI / 180); break;
      case 'tan': result = Math.tan(num * Math.PI / 180); break;
      case 'sqrt': result = Math.sqrt(num); break;
      case 'log': result = Math.log10(num); break;
      case 'ln': result = Math.log(num); break;
      case 'x²': result = num * num; break;
      case 'x³': result = num * num * num; break;
      case '1/x': result = 1 / num; break;
      case '±': result = -num; break;
      case '%': result = num / 100; break;
      case 'π': result = Math.PI; break;
      case 'e': result = Math.E; break;
      case '!': result = factorial(Math.floor(num)); break;
      default: return;
    }

    setDisplay(isNaN(result) || !isFinite(result) ? 'Error' : result.toString());
    setIsNewNumber(true);
  };

  const factorial = (n: number): number => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
  };

  const calculate = () => {
    try {
      const expression = equation + display;
      const sanitized = expression.replace(/×/g, '*').replace(/÷/g, '/').replace(/\s+/g, '');
      const result = eval(sanitized);
      setDisplay(result.toString());
      setEquation('');
      setIsNewNumber(true);
    } catch {
      setDisplay('Error');
      setIsNewNumber(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
    setIsNewNumber(true);
  };

  const buttons = [
    ['sin', 'cos', 'tan', 'π'],
    ['log', 'ln', 'x²', 'sqrt'],
    ['7', '8', '9', '÷'],
    ['4', '5', '6', '×'],
    ['1', '2', '3', '-'],
    ['0', '.', '±', '+'],
    ['C', '(', ')', '='],
  ];

  return (
    <CalculatorLayout
      calculator={calculator}
      title="Scientific Calculator"
      description="A full-featured scientific calculator with trigonometric, logarithmic, and advanced math functions."
      intro="Perform advanced mathematical calculations including trigonometry, logarithms, exponents, and more."
      formula="Supports sin, cos, tan (in degrees), log, ln, square root, exponents, and factorial"
      example="sin(30) = 0.5 | log(100) = 2 | √16 = 4"
      faqs={[
        { question: 'Are angles in degrees or radians?', answer: 'Trigonometric functions use degrees. For example, sin(90) = 1.' },
        { question: 'What is ln vs log?', answer: 'Log is base 10 logarithm, ln is natural logarithm (base e).' },
        { question: 'How do I calculate powers?', answer: 'Use x² for square, or type the full expression like 2*2*2 for 2³.' },
      ]}
    >
      <div className="max-w-md mx-auto">
        <div className="bg-secondary p-4 rounded-lg mb-4">
          <div className="text-right text-sm text-muted-foreground h-6">{equation}</div>
          <Input
            value={display}
            readOnly
            className="text-right text-3xl font-mono bg-transparent border-none h-12"
          />
        </div>

        <div className="grid grid-cols-4 gap-2">
          {buttons.flat().map((btn) => (
            <Button
              key={btn}
              variant={btn === '=' ? 'default' : ['C', '÷', '×', '-', '+'].includes(btn) ? 'secondary' : 'outline'}
              className={`h-12 text-lg ${btn === '=' ? 'bg-primary' : ''}`}
              onClick={() => {
                if (btn === 'C') clear();
                else if (btn === '=') calculate();
                else if ('0123456789.'.includes(btn)) handleNumber(btn);
                else if (['+', '-', '×', '÷'].includes(btn)) handleOperator(btn);
                else if (['(', ')'].includes(btn)) handleNumber(btn);
                else handleFunction(btn);
              }}
            >
              {btn === 'sqrt' ? '√' : btn}
            </Button>
          ))}
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default ScientificCalculator;
