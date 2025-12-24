import { DollarSign, IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type Currency = 'USD' | 'INR';

interface CurrencySelectorProps {
  value: Currency;
  onChange: (currency: Currency) => void;
}

const CurrencySelector = ({ value, onChange }: CurrencySelectorProps) => {
  return (
    <div className="flex items-center gap-1 p-1 bg-secondary rounded-lg">
      <Button
        type="button"
        variant={value === 'USD' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onChange('USD')}
        className="h-8 px-3 gap-1"
      >
        <DollarSign className="h-4 w-4 pointer-events-none" />
        <span className="text-xs font-medium">USD</span>
      </Button>
      <Button
        type="button"
        variant={value === 'INR' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onChange('INR')}
        className="h-8 px-3 gap-1"
      >
        <IndianRupee className="h-4 w-4 pointer-events-none" />
        <span className="text-xs font-medium">INR</span>
      </Button>
    </div>
  );
};

export const formatCurrency = (amount: number, currency: Currency): string => {
  if (currency === 'INR') {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(amount);
};

export const getCurrencySymbol = (currency: Currency): string => {
  return currency === 'INR' ? '₹' : '$';
};

export default CurrencySelector;
