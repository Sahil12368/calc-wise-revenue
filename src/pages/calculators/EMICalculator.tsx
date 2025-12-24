import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import CurrencySelector, { Currency, formatCurrency, getCurrencySymbol } from '@/components/calculator/CurrencySelector';
import { getCalculatorById } from '@/lib/calculators';

const EMICalculator = () => {
  const calculator = getCalculatorById('emi')!;
  
  const [currency, setCurrency] = useState<Currency>('INR');
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [result, setResult] = useState<{ emi: number; totalPayment: number; totalInterest: number } | null>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    const P = parseFloat(principal);
    const annualRate = parseFloat(rate);
    const months = parseFloat(tenure);

    if (isNaN(P) || isNaN(annualRate) || isNaN(months) || P <= 0 || annualRate <= 0 || months <= 0) {
      setError('Please enter valid positive numbers');
      setResult(null);
      return;
    }

    setError('');

    const r = annualRate / 12 / 100; // Monthly interest rate
    const emi = (P * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
    const totalPayment = emi * months;
    const totalInterest = totalPayment - P;

    setResult({ emi, totalPayment, totalInterest });
  };

  const reset = () => {
    setPrincipal('');
    setRate('');
    setTenure('');
    setResult(null);
    setError('');
  };

  const symbol = getCurrencySymbol(currency);

  return (
    <CalculatorLayout
      calculator={calculator}
      title="Loan EMI Calculator"
      description="Calculate your monthly EMI for home loan, car loan, or personal loan. Free EMI calculator with total interest and payment breakdown."
      intro="Plan your loan repayments with our free EMI calculator. Enter loan amount, interest rate, and tenure to see your monthly EMI instantly."
      formula="EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]
Where: P = Principal, R = Monthly interest rate, N = Number of months"
      example={`Loan Amount: ₹10,00,000
Interest Rate: 10% per annum
Tenure: 24 months

Monthly Interest Rate = 10/12/100 = 0.00833
EMI = [10,00,000 × 0.00833 × (1.00833)^24] / [(1.00833)^24 - 1]
EMI = ₹46,145

Total Payment: ₹11,07,480
Total Interest: ₹1,07,480`}
      faqs={[
        {
          question: 'What is EMI?',
          answer: 'EMI (Equated Monthly Installment) is a fixed payment amount made by a borrower to a lender on a specified date each month. It includes both principal and interest components.',
        },
        {
          question: 'How can I reduce my EMI?',
          answer: 'You can reduce EMI by: increasing the loan tenure, making a higher down payment, negotiating a lower interest rate, or choosing a lender with better rates.',
        },
        {
          question: 'Is prepayment of loan beneficial?',
          answer: 'Yes, prepayment can significantly reduce your total interest paid. Even small additional payments can save thousands in interest over the loan tenure.',
        },
        {
          question: 'What affects my loan interest rate?',
          answer: 'Your credit score, income, employment stability, loan amount, tenure, and the type of loan all affect the interest rate offered by lenders.',
        },
      ]}
    >
      {/* Currency Selector */}
      <div className="flex items-center justify-between mb-4">
        <Label className="text-sm text-muted-foreground">Select Currency:</Label>
        <CurrencySelector value={currency} onChange={setCurrency} />
      </div>

      {/* Input Fields */}
      <div className="space-y-4 mb-6">
        <div>
          <Label htmlFor="principal" className="mb-2 block">
            Loan Amount ({symbol})
          </Label>
          <Input
            id="principal"
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            placeholder="e.g., 1000000"
            className="calc-input"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="rate" className="mb-2 block">
              Interest Rate (% per year)
            </Label>
            <Input
              id="rate"
              type="number"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="e.g., 10.5"
              className="calc-input"
            />
          </div>
          <div>
            <Label htmlFor="tenure" className="mb-2 block">
              Loan Tenure (months)
            </Label>
            <Input
              id="tenure"
              type="number"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              placeholder="e.g., 36"
              className="calc-input"
            />
          </div>
        </div>
      </div>

      {error && (
        <p className="text-destructive text-sm mb-4">{error}</p>
      )}

      {/* Buttons */}
      <div className="flex gap-3 mb-6">
        <Button onClick={calculate} className="calc-btn flex-1">
          Calculate EMI
        </Button>
        <Button onClick={reset} variant="outline" className="calc-btn-secondary">
          Reset
        </Button>
      </div>

      {/* Result */}
      {result && (
        <div className="calc-result animate-scale-in">
          <div className="text-center mb-6">
            <p className="text-sm text-muted-foreground mb-2">Monthly EMI:</p>
            <p className="calc-result-value">{formatCurrency(result.emi, currency)}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Total Payment</p>
              <p className="text-xl font-semibold text-foreground">{formatCurrency(result.totalPayment, currency)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Total Interest</p>
              <p className="text-xl font-semibold text-warning">{formatCurrency(result.totalInterest, currency)}</p>
            </div>
          </div>
          
          {/* Visual breakdown */}
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground mb-2">Payment Breakdown</p>
            <div className="h-4 rounded-full overflow-hidden flex">
              <div 
                className="bg-primary" 
                style={{ width: `${(parseFloat(principal) / result.totalPayment) * 100}%` }}
              />
              <div 
                className="bg-warning" 
                style={{ width: `${(result.totalInterest / result.totalPayment) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span className="text-primary">Principal</span>
              <span className="text-warning">Interest</span>
            </div>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
};

export default EMICalculator;
