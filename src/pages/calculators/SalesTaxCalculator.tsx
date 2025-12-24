import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import { getCalculatorById } from '@/lib/calculators';
import CurrencySelector, { Currency, formatCurrency, getCurrencySymbol } from '@/components/calculator/CurrencySelector';

const SalesTaxCalculator = () => {
  const calculator = getCalculatorById('sales-tax')!;
  
  const [currency, setCurrency] = useState<Currency>('USD');
  const [price, setPrice] = useState('');
  const [taxRate, setTaxRate] = useState('');
  const [mode, setMode] = useState<'add' | 'extract'>('add');
  const [result, setResult] = useState<{ beforeTax: number; tax: number; total: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(price);
    const r = parseFloat(taxRate) / 100;

    if (isNaN(p) || isNaN(r) || p <= 0 || r < 0) return;

    if (mode === 'add') {
      const tax = p * r;
      const total = p + tax;
      setResult({ beforeTax: p, tax, total });
    } else {
      const beforeTax = p / (1 + r);
      const tax = p - beforeTax;
      setResult({ beforeTax, tax, total: p });
    }
  };

  const reset = () => {
    setPrice('');
    setTaxRate('');
    setResult(null);
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      title="Sales Tax Calculator"
      description="Calculate sales tax, add tax to a price, or extract tax from a total."
      intro="Easily calculate sales tax for any purchase. Add tax to a price or find out how much tax is included in a total."
      formula="Tax = Price × Tax Rate | Total = Price + Tax | Price Before Tax = Total / (1 + Tax Rate)"
      example="$100 item at 8.5% sales tax: Tax = $8.50, Total = $108.50"
      faqs={[
        { question: 'What is the average sales tax in the US?', answer: 'Sales tax varies by state and locality, ranging from 0% to over 10%. The average combined rate is about 7%.' },
        { question: 'Is sales tax the same as VAT?', answer: 'No, sales tax is applied at the final sale, while VAT (Value Added Tax) is applied at each stage of production and distribution.' },
        { question: 'Are all items taxable?', answer: 'No, many states exempt groceries, medicine, and clothing from sales tax. Rules vary by location.' },
      ]}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={mode === 'add' ? 'default' : 'outline'}
            onClick={() => { setMode('add'); reset(); }}
          >
            Add Tax to Price
          </Button>
          <Button
            variant={mode === 'extract' ? 'default' : 'outline'}
            onClick={() => { setMode('extract'); reset(); }}
          >
            Extract Tax from Total
          </Button>
        </div>
        <CurrencySelector value={currency} onChange={setCurrency} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <Label htmlFor="price" className="mb-2 block">
            {mode === 'add' ? `Price Before Tax (${getCurrencySymbol(currency)})` : `Total Price (${getCurrencySymbol(currency)})`}
          </Label>
          <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="100" className="calc-input" />
        </div>
        <div>
          <Label htmlFor="taxRate" className="mb-2 block">Tax Rate (%)</Label>
          <Input id="taxRate" type="number" step="0.01" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} placeholder="8.5" className="calc-input" />
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <Button onClick={calculate} className="calc-btn flex-1">Calculate</Button>
        <Button onClick={reset} variant="outline" className="calc-btn-secondary">Reset</Button>
      </div>

      {result && (
        <div className="calc-result animate-scale-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Price Before Tax</p>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(result.beforeTax, currency)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Sales Tax</p>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(result.tax, currency)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total</p>
              <p className="calc-result-value">{formatCurrency(result.total, currency)}</p>
            </div>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
};

export default SalesTaxCalculator;
