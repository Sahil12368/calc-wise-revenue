import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import { getCalculatorById } from '@/lib/calculators';
import { Copy, RefreshCw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const PasswordGeneratorCalculator = () => {
  const calculator = getCalculatorById('password-generator')!;
  
  const [length, setLength] = useState('16');
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState<'weak' | 'medium' | 'strong' | 'very-strong'>('medium');

  const generatePassword = () => {
    let chars = '';
    if (uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (numbers) chars += '0123456789';
    if (symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!chars) {
      toast({ title: 'Error', description: 'Please select at least one character type', variant: 'destructive' });
      return;
    }

    const len = parseInt(length) || 16;
    let result = '';
    // Use cryptographically secure random number generation
    const randomValues = crypto.getRandomValues(new Uint32Array(len));
    for (let i = 0; i < len; i++) {
      result += chars.charAt(randomValues[i] % chars.length);
    }

    setPassword(result);
    
    // Calculate strength
    let score = 0;
    if (len >= 8) score++;
    if (len >= 12) score++;
    if (len >= 16) score++;
    if (uppercase && lowercase) score++;
    if (numbers) score++;
    if (symbols) score++;

    if (score <= 2) setStrength('weak');
    else if (score <= 4) setStrength('medium');
    else if (score <= 5) setStrength('strong');
    else setStrength('very-strong');
  };

  const copyToClipboard = async () => {
    if (password) {
      await navigator.clipboard.writeText(password);
      toast({ title: 'Copied!', description: 'Password copied to clipboard' });
    }
  };

  const strengthColors = {
    'weak': 'bg-destructive',
    'medium': 'bg-yellow-500',
    'strong': 'bg-green-500',
    'very-strong': 'bg-primary',
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      title="Password Generator"
      description="Generate secure random passwords with customizable length and character types."
      intro="Create strong, random passwords instantly. Customize length and character types for maximum security."
      formula="Uses cryptographically secure random selection from chosen character sets"
      example="16 characters with all types: xK9#mP2$vL5@nQ8!"
      faqs={[
        { question: 'How long should my password be?', answer: 'At least 12 characters, ideally 16+. Longer passwords are exponentially harder to crack.' },
        { question: 'Why include symbols?', answer: 'Symbols dramatically increase the possible combinations, making passwords much harder to guess.' },
        { question: 'Is this password stored anywhere?', answer: 'No, passwords are generated locally in your browser and never sent to any server.' },
      ]}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <Label htmlFor="length" className="mb-2 block">Password Length</Label>
          <Input
            id="length"
            type="number"
            min="4"
            max="128"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="calc-input"
          />
        </div>
        <div className="space-y-3">
          <Label className="block">Character Types</Label>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Checkbox id="uppercase" checked={uppercase} onCheckedChange={(c) => setUppercase(!!c)} />
              <Label htmlFor="uppercase" className="text-sm">A-Z</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="lowercase" checked={lowercase} onCheckedChange={(c) => setLowercase(!!c)} />
              <Label htmlFor="lowercase" className="text-sm">a-z</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="numbers" checked={numbers} onCheckedChange={(c) => setNumbers(!!c)} />
              <Label htmlFor="numbers" className="text-sm">0-9</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="symbols" checked={symbols} onCheckedChange={(c) => setSymbols(!!c)} />
              <Label htmlFor="symbols" className="text-sm">!@#$</Label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <Button onClick={generatePassword} className="calc-btn flex-1">
          <RefreshCw className="mr-2 h-4 w-4" /> Generate Password
        </Button>
      </div>

      {password && (
        <div className="calc-result animate-scale-in">
          <div className="flex items-center gap-2 mb-4">
            <Input
              value={password}
              readOnly
              className="font-mono text-lg flex-1"
            />
            <Button variant="outline" size="icon" onClick={copyToClipboard}>
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={generatePassword}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-muted-foreground">Password Strength</span>
              <span className="text-sm font-medium capitalize">{strength.replace('-', ' ')}</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all ${strengthColors[strength]}`}
                style={{ 
                  width: strength === 'weak' ? '25%' : 
                         strength === 'medium' ? '50%' : 
                         strength === 'strong' ? '75%' : '100%' 
                }}
              />
            </div>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
};

export default PasswordGeneratorCalculator;
