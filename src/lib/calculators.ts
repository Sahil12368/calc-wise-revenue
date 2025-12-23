export interface Calculator {
  id: string;
  name: string;
  description: string;
  category: CalculatorCategory;
  icon: string;
  path: string;
  keywords: string[];
}

export type CalculatorCategory = 'finance' | 'health' | 'math' | 'other';

export const categoryInfo: Record<CalculatorCategory, { name: string; description: string; icon: string; color: string }> = {
  finance: {
    name: 'Financial Calculators',
    description: 'Plan your finances with precision',
    icon: 'DollarSign',
    color: 'primary',
  },
  health: {
    name: 'Fitness & Health Calculators',
    description: 'Track your health metrics and fitness goals',
    icon: 'Heart',
    color: 'success',
  },
  math: {
    name: 'Math Calculators',
    description: 'Solve mathematical problems easily',
    icon: 'Calculator',
    color: 'info',
  },
  other: {
    name: 'Other Calculators',
    description: 'Useful tools for everyday calculations',
    icon: 'Wrench',
    color: 'accent',
  },
};

export const calculators: Calculator[] = [
  // Financial Calculators
  {
    id: 'mortgage',
    name: 'Mortgage Calculator',
    description: 'Calculate monthly mortgage payments and total interest',
    category: 'finance',
    icon: 'Home',
    path: '/calculator/mortgage',
    keywords: ['mortgage', 'home loan', 'house payment', 'property'],
  },
  {
    id: 'loan',
    name: 'Loan Calculator',
    description: 'Calculate loan payments and amortization schedule',
    category: 'finance',
    icon: 'Banknote',
    path: '/calculator/loan',
    keywords: ['loan', 'payment', 'borrow', 'lending'],
  },
  {
    id: 'auto-loan',
    name: 'Auto Loan Calculator',
    description: 'Calculate car loan payments and total cost',
    category: 'finance',
    icon: 'Car',
    path: '/calculator/auto-loan',
    keywords: ['auto loan', 'car loan', 'vehicle financing'],
  },
  {
    id: 'interest',
    name: 'Interest Calculator',
    description: 'Calculate interest earned or paid on any amount',
    category: 'finance',
    icon: 'TrendingUp',
    path: '/calculator/interest',
    keywords: ['interest', 'rate', 'earnings'],
  },
  {
    id: 'payment',
    name: 'Payment Calculator',
    description: 'Calculate monthly payment for any loan',
    category: 'finance',
    icon: 'CreditCard',
    path: '/calculator/payment',
    keywords: ['payment', 'monthly', 'loan payment'],
  },
  {
    id: 'retirement',
    name: 'Retirement Calculator',
    description: 'Plan your retirement savings and income',
    category: 'finance',
    icon: 'Armchair',
    path: '/calculator/retirement',
    keywords: ['retirement', 'pension', 'savings', '401k'],
  },
  {
    id: 'amortization',
    name: 'Amortization Calculator',
    description: 'Generate loan amortization schedule',
    category: 'finance',
    icon: 'FileSpreadsheet',
    path: '/calculator/amortization',
    keywords: ['amortization', 'schedule', 'loan breakdown'],
  },
  {
    id: 'investment',
    name: 'Investment Calculator',
    description: 'Calculate investment returns and growth',
    category: 'finance',
    icon: 'LineChart',
    path: '/calculator/investment',
    keywords: ['investment', 'returns', 'portfolio', 'growth'],
  },
  {
    id: 'inflation',
    name: 'Inflation Calculator',
    description: 'Calculate the effect of inflation on money',
    category: 'finance',
    icon: 'TrendingDown',
    path: '/calculator/inflation',
    keywords: ['inflation', 'purchasing power', 'cpi'],
  },
  {
    id: 'finance',
    name: 'Finance Calculator',
    description: 'General purpose financial calculator',
    category: 'finance',
    icon: 'Calculator',
    path: '/calculator/finance',
    keywords: ['finance', 'money', 'calculation'],
  },
  {
    id: 'income-tax',
    name: 'Income Tax Calculator',
    description: 'Estimate your income tax liability',
    category: 'finance',
    icon: 'Receipt',
    path: '/calculator/income-tax',
    keywords: ['income tax', 'tax', 'federal tax', 'tax bracket'],
  },
  {
    id: 'compound-interest',
    name: 'Compound Interest Calculator',
    description: 'Calculate compound interest with different frequencies',
    category: 'finance',
    icon: 'Percent',
    path: '/calculator/compound-interest',
    keywords: ['compound interest', 'compound', 'investment', 'growth'],
  },
  {
    id: 'salary',
    name: 'Salary Calculator',
    description: 'Convert salary between hourly, weekly, monthly, yearly',
    category: 'finance',
    icon: 'Wallet',
    path: '/calculator/salary',
    keywords: ['salary', 'wage', 'hourly', 'income'],
  },
  {
    id: 'interest-rate',
    name: 'Interest Rate Calculator',
    description: 'Calculate the interest rate on loans or investments',
    category: 'finance',
    icon: 'Percent',
    path: '/calculator/interest-rate',
    keywords: ['interest rate', 'apr', 'rate calculation'],
  },
  {
    id: 'sales-tax',
    name: 'Sales Tax Calculator',
    description: 'Calculate sales tax and final price',
    category: 'finance',
    icon: 'ShoppingCart',
    path: '/calculator/sales-tax',
    keywords: ['sales tax', 'tax', 'vat', 'purchase'],
  },
  {
    id: 'simple-interest',
    name: 'Simple Interest Calculator',
    description: 'Calculate simple interest on investments',
    category: 'finance',
    icon: 'DollarSign',
    path: '/calculator/simple-interest',
    keywords: ['simple interest', 'interest', 'investment'],
  },
  {
    id: 'emi',
    name: 'Loan EMI Calculator',
    description: 'Calculate monthly EMI for loans',
    category: 'finance',
    icon: 'CreditCard',
    path: '/calculator/emi',
    keywords: ['emi', 'loan', 'monthly payment', 'mortgage'],
  },
  {
    id: 'savings-goal',
    name: 'Savings Goal Calculator',
    description: 'Plan monthly savings to reach your goal',
    category: 'finance',
    icon: 'PiggyBank',
    path: '/calculator/savings-goal',
    keywords: ['savings', 'goal', 'save money', 'target'],
  },

  // Fitness & Health Calculators
  {
    id: 'bmi',
    name: 'BMI Calculator',
    description: 'Calculate Body Mass Index and weight category',
    category: 'health',
    icon: 'Activity',
    path: '/calculator/bmi',
    keywords: ['bmi', 'body mass index', 'weight', 'height', 'obesity'],
  },
  {
    id: 'calorie',
    name: 'Calorie Calculator',
    description: 'Calculate daily calorie requirements',
    category: 'health',
    icon: 'Utensils',
    path: '/calculator/calorie',
    keywords: ['calorie', 'daily calories', 'tdee', 'calorie intake'],
  },
  {
    id: 'body-fat',
    name: 'Body Fat Calculator',
    description: 'Estimate body fat percentage using measurements',
    category: 'health',
    icon: 'Scale',
    path: '/calculator/body-fat',
    keywords: ['body fat', 'fat percentage', 'body composition'],
  },
  {
    id: 'bmr',
    name: 'BMR Calculator',
    description: 'Calculate Basal Metabolic Rate',
    category: 'health',
    icon: 'Flame',
    path: '/calculator/bmr',
    keywords: ['bmr', 'basal metabolic rate', 'metabolism', 'calories'],
  },
  {
    id: 'ideal-weight',
    name: 'Ideal Weight Calculator',
    description: 'Find your ideal body weight range',
    category: 'health',
    icon: 'Target',
    path: '/calculator/ideal-weight',
    keywords: ['ideal weight', 'healthy weight', 'target weight'],
  },
  {
    id: 'pace',
    name: 'Pace Calculator',
    description: 'Calculate running or walking pace',
    category: 'health',
    icon: 'Timer',
    path: '/calculator/pace',
    keywords: ['pace', 'running', 'walking', 'speed'],
  },
  {
    id: 'pregnancy',
    name: 'Pregnancy Calculator',
    description: 'Track pregnancy weeks and milestones',
    category: 'health',
    icon: 'Baby',
    path: '/calculator/pregnancy',
    keywords: ['pregnancy', 'weeks', 'trimester', 'baby'],
  },
  {
    id: 'pregnancy-conception',
    name: 'Pregnancy Conception Calculator',
    description: 'Estimate conception date based on due date',
    category: 'health',
    icon: 'Heart',
    path: '/calculator/pregnancy-conception',
    keywords: ['conception', 'pregnancy', 'ovulation'],
  },
  {
    id: 'due-date',
    name: 'Due Date Calculator',
    description: 'Calculate expected due date for pregnancy',
    category: 'health',
    icon: 'Calendar',
    path: '/calculator/due-date',
    keywords: ['due date', 'pregnancy', 'delivery date'],
  },

  // Math Calculators
  {
    id: 'scientific',
    name: 'Scientific Calculator',
    description: 'Advanced scientific calculations with functions',
    category: 'math',
    icon: 'Calculator',
    path: '/calculator/scientific',
    keywords: ['scientific', 'advanced', 'math', 'functions'],
  },
  {
    id: 'fraction',
    name: 'Fraction Calculator',
    description: 'Add, subtract, multiply, and divide fractions',
    category: 'math',
    icon: 'Divide',
    path: '/calculator/fraction',
    keywords: ['fraction', 'numerator', 'denominator'],
  },
  {
    id: 'percentage',
    name: 'Percentage Calculator',
    description: 'Calculate percentages, percentage increase/decrease',
    category: 'math',
    icon: 'Percent',
    path: '/calculator/percentage',
    keywords: ['percentage', 'percent', 'calculate percentage'],
  },
  {
    id: 'random-number',
    name: 'Random Number Generator',
    description: 'Generate random numbers within a range',
    category: 'math',
    icon: 'Shuffle',
    path: '/calculator/random-number',
    keywords: ['random', 'number', 'generator', 'dice'],
  },
  {
    id: 'triangle',
    name: 'Triangle Calculator',
    description: 'Calculate triangle area, perimeter, and angles',
    category: 'math',
    icon: 'Triangle',
    path: '/calculator/triangle',
    keywords: ['triangle', 'area', 'perimeter', 'pythagorean'],
  },
  {
    id: 'standard-deviation',
    name: 'Standard Deviation Calculator',
    description: 'Calculate standard deviation and variance',
    category: 'math',
    icon: 'BarChart3',
    path: '/calculator/standard-deviation',
    keywords: ['standard deviation', 'variance', 'statistics'],
  },
  {
    id: 'average',
    name: 'Average Calculator',
    description: 'Calculate mean, median, and mode of numbers',
    category: 'math',
    icon: 'BarChart3',
    path: '/calculator/average',
    keywords: ['average', 'mean', 'median', 'mode'],
  },
  {
    id: 'ratio',
    name: 'Ratio Calculator',
    description: 'Calculate and simplify ratios between numbers',
    category: 'math',
    icon: 'Scale',
    path: '/calculator/ratio',
    keywords: ['ratio', 'proportion', 'simplify ratio'],
  },

  // Other Calculators
  {
    id: 'age',
    name: 'Age Calculator',
    description: 'Calculate exact age in years, months, and days',
    category: 'other',
    icon: 'Cake',
    path: '/calculator/age',
    keywords: ['age', 'birthday', 'date of birth', 'how old'],
  },
  {
    id: 'date',
    name: 'Date Calculator',
    description: 'Add or subtract days from a date',
    category: 'other',
    icon: 'Calendar',
    path: '/calculator/date',
    keywords: ['date', 'add days', 'subtract days'],
  },
  {
    id: 'time',
    name: 'Time Calculator',
    description: 'Add and subtract time durations',
    category: 'other',
    icon: 'Clock',
    path: '/calculator/time',
    keywords: ['time', 'hours', 'minutes', 'duration'],
  },
  {
    id: 'hours',
    name: 'Hours Calculator',
    description: 'Calculate work hours and time between times',
    category: 'other',
    icon: 'Clock',
    path: '/calculator/hours',
    keywords: ['hours', 'work hours', 'timesheet'],
  },
  {
    id: 'gpa',
    name: 'GPA Calculator',
    description: 'Calculate Grade Point Average',
    category: 'other',
    icon: 'GraduationCap',
    path: '/calculator/gpa',
    keywords: ['gpa', 'grade point', 'academic', 'college'],
  },
  {
    id: 'grade',
    name: 'Grade Calculator',
    description: 'Calculate final grade and what you need',
    category: 'other',
    icon: 'Award',
    path: '/calculator/grade',
    keywords: ['grade', 'final grade', 'score', 'exam'],
  },
  {
    id: 'concrete',
    name: 'Concrete Calculator',
    description: 'Calculate concrete volume for projects',
    category: 'other',
    icon: 'Box',
    path: '/calculator/concrete',
    keywords: ['concrete', 'cement', 'volume', 'construction'],
  },
  {
    id: 'subnet',
    name: 'Subnet Calculator',
    description: 'Calculate IP subnet masks and ranges',
    category: 'other',
    icon: 'Network',
    path: '/calculator/subnet',
    keywords: ['subnet', 'ip', 'network', 'cidr'],
  },
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Generate secure random passwords',
    category: 'other',
    icon: 'Lock',
    path: '/calculator/password-generator',
    keywords: ['password', 'generator', 'security', 'random'],
  },
  {
    id: 'conversion',
    name: 'Conversion Calculator',
    description: 'Convert between units of measurement',
    category: 'other',
    icon: 'ArrowLeftRight',
    path: '/calculator/conversion',
    keywords: ['conversion', 'convert', 'units', 'measurement'],
  },
  {
    id: 'date-difference',
    name: 'Date Difference Calculator',
    description: 'Find the difference between two dates',
    category: 'other',
    icon: 'CalendarDays',
    path: '/calculator/date-difference',
    keywords: ['date difference', 'days between', 'date calculator'],
  },
  {
    id: 'percentage-to-cgpa',
    name: 'Percentage to CGPA',
    description: 'Convert percentage to CGPA',
    category: 'other',
    icon: 'Award',
    path: '/calculator/percentage-to-cgpa',
    keywords: ['cgpa', 'percentage', 'grade', 'convert'],
  },
  {
    id: 'cgpa-to-percentage',
    name: 'CGPA to Percentage',
    description: 'Convert CGPA to percentage',
    category: 'other',
    icon: 'FileText',
    path: '/calculator/cgpa-to-percentage',
    keywords: ['cgpa', 'percentage', 'grade', 'convert'],
  },
  {
    id: 'marks',
    name: 'Marks Calculator',
    description: 'Calculate total marks and percentage',
    category: 'other',
    icon: 'ClipboardList',
    path: '/calculator/marks',
    keywords: ['marks', 'score', 'total', 'percentage'],
  },
  {
    id: 'attendance',
    name: 'Attendance Calculator',
    description: 'Calculate attendance percentage',
    category: 'other',
    icon: 'UserCheck',
    path: '/calculator/attendance',
    keywords: ['attendance', 'present', 'absent', 'percentage'],
  },
];

export const getCalculatorsByCategory = (category: CalculatorCategory): Calculator[] => {
  return calculators.filter((calc) => calc.category === category);
};

export const getCalculatorById = (id: string): Calculator | undefined => {
  return calculators.find((calc) => calc.id === id);
};

export const searchCalculators = (query: string): Calculator[] => {
  const lowerQuery = query.toLowerCase();
  return calculators.filter(
    (calc) =>
      calc.name.toLowerCase().includes(lowerQuery) ||
      calc.description.toLowerCase().includes(lowerQuery) ||
      calc.keywords.some((kw) => kw.includes(lowerQuery))
  );
};

export const getFeaturedCalculators = (): Calculator[] => {
  return [
    calculators.find((c) => c.id === 'mortgage')!,
    calculators.find((c) => c.id === 'bmi')!,
    calculators.find((c) => c.id === 'percentage')!,
    calculators.find((c) => c.id === 'age')!,
  ];
};

export const getRelatedCalculators = (id: string, limit = 4): Calculator[] => {
  const current = getCalculatorById(id);
  if (!current) return [];
  
  return calculators
    .filter((calc) => calc.id !== id && calc.category === current.category)
    .slice(0, limit);
};
