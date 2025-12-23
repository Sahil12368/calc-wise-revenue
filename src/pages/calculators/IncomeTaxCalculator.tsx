import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import { getCalculatorById } from '@/lib/calculators';

const IncomeTaxCalculator = () => {
  const calculator = getCalculatorById('income-tax')!;
  
  const [income, setIncome] = useState('');
  const [filingStatus, setFilingStatus] = useState('single');
  const [deductions, setDeductions] = useState('');
  const [result, setResult] = useState<{ taxableIncome: number; tax: number; effectiveRate: number; afterTax: number } | null>(null);

  // 2024 US Federal Tax Brackets (simplified)
  const taxBrackets = {
    single: [
      { min: 0, max: 11600, rate: 0.10 },
      { min: 11600, max: 47150, rate: 0.12 },
      { min: 47150, max: 100525, rate: 0.22 },
      { min: 100525, max: 191950, rate: 0.24 },
      { min: 191950, max: 243725, rate: 0.32 },
      { min: 243725, max: 609350, rate: 0.35 },
      { min: 609350, max: Infinity, rate: 0.37 },
    ],
    married: [
      { min: 0, max: 23200, rate: 0.10 },
      { min: 23200, max: 94300, rate: 0.12 },
      { min: 94300, max: 201050, rate: 0.22 },
      { min: 201050, max: 383900, rate: 0.24 },
      { min: 383900, max: 487450, rate: 0.32 },
      { min: 487450, max: 731200, rate: 0.35 },
      { min: 731200, max: Infinity, rate: 0.37 },
    ],
  };

  const standardDeduction = {
    single: 14600,
    married: 29200,
  };

  const calculate = () => {
    const grossIncome = parseFloat(income);
    if (isNaN(grossIncome) || grossIncome < 0) return;

    const itemizedDeductions = parseFloat(deductions) || 0;
    const status = filingStatus as 'single' | 'married';
    const deduction = Math.max(standardDeduction[status], itemizedDeductions);
    const taxableIncome = Math.max(0, grossIncome - deduction);

    let tax = 0;
    const brackets = taxBrackets[status];

    for (const bracket of brackets) {
      if (taxableIncome > bracket.min) {
        const taxableInBracket = Math.min(taxableIncome, bracket.max) - bracket.min;
        tax += taxableInBracket * bracket.rate;
      }
    }

    const effectiveRate = taxableIncome > 0 ? (tax / taxableIncome) * 100 : 0;
    const afterTax = grossIncome - tax;

    setResult({ taxableIncome, tax, effectiveRate, afterTax });
  };

  const reset = () => {
    setIncome('');
    setFilingStatus('single');
    setDeductions('');
    setResult(null);
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      title="Income Tax Calculator"
      description="Estimate your federal income tax based on 2024 tax brackets."
      intro="Calculate your estimated federal income tax using current tax brackets. This is an estimate for educational purposes."
      formula="Tax is calculated progressively through each tax bracket"
      example="Single filer with $75,000 income: Taxable income after standard deduction = $60,400, Estimated tax = $8,476"
      faqs={[
        { question: 'What is a tax bracket?', answer: 'Tax brackets are income ranges taxed at different rates. Only income within each bracket is taxed at that rate.' },
        { question: 'Standard vs itemized deductions?', answer: 'You can take the higher of the standard deduction or your itemized deductions (mortgage interest, state taxes, etc.).' },
        { question: 'Is this my actual tax bill?', answer: 'This is an estimate. Actual taxes depend on many factors including credits, other income, and state taxes.' },
      ]}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <Label htmlFor="income" className="mb-2 block">Annual Income ($)</Label>
          <Input id="income" type="number" value={income} onChange={(e) => setIncome(e.target.value)} placeholder="75000" className="calc-input" />
        </div>
        <div>
          <Label className="mb-2 block">Filing Status</Label>
          <Select value={filingStatus} onValueChange={setFilingStatus}>
            <SelectTrigger className="calc-input">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">Single</SelectItem>
              <SelectItem value="married">Married Filing Jointly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="deductions" className="mb-2 block">Itemized Deductions ($)</Label>
          <Input id="deductions" type="number" value={deductions} onChange={(e) => setDeductions(e.target.value)} placeholder="0" className="calc-input" />
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <Button onClick={calculate} className="calc-btn flex-1">Calculate</Button>
        <Button onClick={reset} variant="outline" className="calc-btn-secondary">Reset</Button>
      </div>

      {result && (
        <div className="calc-result animate-scale-in">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Taxable Income</p>
              <p className="text-xl font-bold text-foreground">${result.taxableIncome.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Estimated Tax</p>
              <p className="calc-result-value text-2xl">${result.tax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Effective Rate</p>
              <p className="text-xl font-bold text-foreground">{result.effectiveRate.toFixed(1)}%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">After-Tax Income</p>
              <p className="text-xl font-bold text-foreground">${result.afterTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
            </div>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
};

export default IncomeTaxCalculator;
