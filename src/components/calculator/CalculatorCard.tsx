import { Link } from 'react-router-dom';
import { Calculator } from '@/lib/calculators';
import { Card, CardContent } from '@/components/ui/card';
import {
  Calculator as CalculatorIcon,
  Percent,
  Calendar,
  CalendarDays,
  BarChart3,
  Scale,
  Activity,
  Flame,
  Utensils,
  Target,
  CreditCard,
  TrendingUp,
  LineChart,
  PiggyBank,
  Award,
  FileText,
  ClipboardList,
  UserCheck,
  Heart,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Calculator: CalculatorIcon,
  Percent,
  Calendar,
  CalendarDays,
  BarChart3,
  Scale,
  Activity,
  Flame,
  Utensils,
  Target,
  CreditCard,
  TrendingUp,
  LineChart,
  PiggyBank,
  Award,
  FileText,
  ClipboardList,
  UserCheck,
  Heart,
};

interface CalculatorCardProps {
  calculator: Calculator;
}

const CalculatorCard = ({ calculator }: CalculatorCardProps) => {
  const Icon = iconMap[calculator.icon] || CalculatorIcon;

  return (
    <Link to={calculator.path}>
      <Card className="h-full card-interactive group cursor-pointer">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors pointer-events-none">
              <Icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors pointer-events-none" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                {calculator.name}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {calculator.description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CalculatorCard;
