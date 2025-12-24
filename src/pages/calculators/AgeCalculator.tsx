import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import { getCalculatorById } from '@/lib/calculators';
import { differenceInYears, differenceInMonths, differenceInDays, format, isValid, parseISO } from 'date-fns';

const AgeCalculator = () => {
  const calculator = getCalculatorById('age')!;
  
  const [birthDate, setBirthDate] = useState('');
  const [targetDate, setTargetDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [result, setResult] = useState<{ years: number; months: number; days: number } | null>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    const birth = parseISO(birthDate);
    const target = parseISO(targetDate);

    if (!isValid(birth) || !isValid(target)) {
      setError('Please enter valid dates');
      setResult(null);
      return;
    }

    if (birth > target) {
      setError('Birth date cannot be after the target date');
      setResult(null);
      return;
    }

    setError('');

    const years = differenceInYears(target, birth);
    const monthsAfterYears = differenceInMonths(target, birth) % 12;
    
    // Calculate remaining days
    const dateAfterYearsMonths = new Date(birth);
    dateAfterYearsMonths.setFullYear(dateAfterYearsMonths.getFullYear() + years);
    dateAfterYearsMonths.setMonth(dateAfterYearsMonths.getMonth() + monthsAfterYears);
    const days = differenceInDays(target, dateAfterYearsMonths);

    setResult({ years, months: monthsAfterYears, days });
  };

  const reset = () => {
    setBirthDate('');
    setTargetDate(format(new Date(), 'yyyy-MM-dd'));
    setResult(null);
    setError('');
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      title="Age Calculator"
      description="Calculate your exact age in years, months, and days. Find out how old you are today or on any specific date."
      intro="Find your exact age down to the day with our free age calculator. Enter your birth date to see your age in years, months, and days."
      formula="Age = Target Date - Birth Date (calculated in years, months, and days)"
      example={`Birth Date: January 15, 1990
Today: December 23, 2025
Age: 35 years, 11 months, and 8 days`}
      faqs={[
        {
          question: 'How is age calculated in years, months, and days?',
          answer: 'We subtract your birth date from the target date, breaking down the difference into complete years, then remaining complete months, and finally remaining days.',
        },
        {
          question: 'Can I calculate my age on a future date?',
          answer: 'Yes! Enter your birth date and change the target date to any future date to see how old you will be.',
        },
        {
          question: 'Why is knowing exact age important?',
          answer: 'Exact age is needed for legal documents, insurance policies, pension calculations, and various government applications that require precise age verification.',
        },
      ]}
      contentSections={[
        {
          title: 'What is an Age Calculator?',
          content: 'An age calculator is a tool that computes your exact age from your date of birth to any specified date. Unlike simply knowing your birth year, this calculator provides your precise age in years, months, and days, accounting for varying month lengths and leap years.\n\nThis precision is important for legal documents, insurance applications, retirement planning, and many official purposes where exact age matters.',
        },
        {
          title: 'How to Use This Calculator',
          content: '1. Enter your date of birth using the date picker\n2. The "Calculate Age On" field defaults to today\'s date\n3. Change the target date if you want to calculate your age on a different day\n4. Click "Calculate Age" to see your exact age\n\nYou can use past or future dates to see how old you were or will be on any given day.',
        },
        {
          title: 'Common Uses for Age Calculation',
          content: '• Legal Requirements: Age verification for voting, driving, drinking, retirement\n• Insurance: Many policies require exact age for premium calculation\n• Employment: Some jobs have age requirements or retirement ages\n• Education: School enrollment cutoff dates\n• Medical: Age-specific health screenings and treatments\n• Sports: Age group competitions and eligibility\n• Immigration: Visa and citizenship requirements\n• Celebrations: Planning milestone birthdays and anniversaries',
        },
        {
          title: 'How Age Calculation Works',
          content: 'The calculator:\n\n1. First counts complete years between the dates\n2. Then counts remaining complete months\n3. Finally counts remaining days\n\nThis accounts for:\n• Varying month lengths (28-31 days)\n• Leap years (February 29th)\n• Different year lengths (365 or 366 days)\n\nThe result gives you the most accurate representation of the time elapsed.',
        },
      ]}
    >
      {/* Input Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <Label htmlFor="birthDate" className="mb-2 block">
            Date of Birth
          </Label>
          <Input
            id="birthDate"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="calc-input"
          />
        </div>
        <div>
          <Label htmlFor="targetDate" className="mb-2 block">
            Calculate Age On
          </Label>
          <Input
            id="targetDate"
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
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
          Calculate Age
        </Button>
        <Button onClick={reset} variant="outline" className="calc-btn-secondary">
          Reset
        </Button>
      </div>

      {/* Result */}
      {result && (
        <div className="calc-result animate-scale-in">
          <p className="text-sm text-muted-foreground mb-3">Your Age:</p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="calc-result-value">{result.years}</p>
              <p className="text-sm text-muted-foreground">Years</p>
            </div>
            <div>
              <p className="calc-result-value">{result.months}</p>
              <p className="text-sm text-muted-foreground">Months</p>
            </div>
            <div>
              <p className="calc-result-value">{result.days}</p>
              <p className="text-sm text-muted-foreground">Days</p>
            </div>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
};

export default AgeCalculator;
