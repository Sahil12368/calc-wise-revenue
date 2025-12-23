export interface Calculator {
  id: string;
  name: string;
  description: string;
  category: CalculatorCategory;
  icon: string;
  path: string;
  keywords: string[];
}

export type CalculatorCategory = 'basic' | 'health' | 'finance' | 'education';

export const categoryInfo: Record<CalculatorCategory, { name: string; description: string; icon: string; color: string }> = {
  basic: {
    name: 'Basic & Daily',
    description: 'Essential calculators for everyday calculations',
    icon: 'Calculator',
    color: 'primary',
  },
  health: {
    name: 'Health & Fitness',
    description: 'Track your health metrics and fitness goals',
    icon: 'Heart',
    color: 'success',
  },
  finance: {
    name: 'Finance',
    description: 'Plan your finances with precision',
    icon: 'DollarSign',
    color: 'accent',
  },
  education: {
    name: 'Education',
    description: 'Academic calculators for students',
    icon: 'GraduationCap',
    color: 'info',
  },
};

export const calculators: Calculator[] = [
  // Basic & Daily
  {
    id: 'percentage',
    name: 'Percentage Calculator',
    description: 'Calculate percentages, percentage increase/decrease, and more',
    category: 'basic',
    icon: 'Percent',
    path: '/calculator/percentage',
    keywords: ['percentage', 'percent', 'calculate percentage', 'percentage of number'],
  },
  {
    id: 'age',
    name: 'Age Calculator',
    description: 'Calculate exact age in years, months, and days',
    category: 'basic',
    icon: 'Calendar',
    path: '/calculator/age',
    keywords: ['age', 'birthday', 'date of birth', 'how old'],
  },
  {
    id: 'date-difference',
    name: 'Date Difference Calculator',
    description: 'Find the difference between two dates',
    category: 'basic',
    icon: 'CalendarDays',
    path: '/calculator/date-difference',
    keywords: ['date difference', 'days between', 'date calculator'],
  },
  {
    id: 'average',
    name: 'Average Calculator',
    description: 'Calculate mean, median, and mode of numbers',
    category: 'basic',
    icon: 'BarChart3',
    path: '/calculator/average',
    keywords: ['average', 'mean', 'median', 'mode'],
  },
  {
    id: 'ratio',
    name: 'Ratio Calculator',
    description: 'Calculate and simplify ratios between numbers',
    category: 'basic',
    icon: 'Scale',
    path: '/calculator/ratio',
    keywords: ['ratio', 'proportion', 'simplify ratio'],
  },
  
  // Health & Fitness
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
    id: 'bmr',
    name: 'BMR Calculator',
    description: 'Calculate Basal Metabolic Rate',
    category: 'health',
    icon: 'Flame',
    path: '/calculator/bmr',
    keywords: ['bmr', 'basal metabolic rate', 'metabolism', 'calories'],
  },
  {
    id: 'calorie',
    name: 'Daily Calorie Calculator',
    description: 'Calculate daily calorie requirements',
    category: 'health',
    icon: 'Utensils',
    path: '/calculator/calorie',
    keywords: ['calorie', 'daily calories', 'tdee', 'calorie intake'],
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
  
  // Finance
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
    id: 'simple-interest',
    name: 'Simple Interest Calculator',
    description: 'Calculate simple interest on investments',
    category: 'finance',
    icon: 'TrendingUp',
    path: '/calculator/simple-interest',
    keywords: ['simple interest', 'interest', 'investment'],
  },
  {
    id: 'compound-interest',
    name: 'Compound Interest Calculator',
    description: 'Calculate compound interest with different frequencies',
    category: 'finance',
    icon: 'LineChart',
    path: '/calculator/compound-interest',
    keywords: ['compound interest', 'compound', 'investment', 'growth'],
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
  
  // Education
  {
    id: 'percentage-to-cgpa',
    name: 'Percentage to CGPA',
    description: 'Convert percentage to CGPA',
    category: 'education',
    icon: 'Award',
    path: '/calculator/percentage-to-cgpa',
    keywords: ['cgpa', 'percentage', 'grade', 'convert'],
  },
  {
    id: 'cgpa-to-percentage',
    name: 'CGPA to Percentage',
    description: 'Convert CGPA to percentage',
    category: 'education',
    icon: 'FileText',
    path: '/calculator/cgpa-to-percentage',
    keywords: ['cgpa', 'percentage', 'grade', 'convert'],
  },
  {
    id: 'marks',
    name: 'Marks Calculator',
    description: 'Calculate total marks and percentage',
    category: 'education',
    icon: 'ClipboardList',
    path: '/calculator/marks',
    keywords: ['marks', 'score', 'total', 'percentage'],
  },
  {
    id: 'attendance',
    name: 'Attendance Calculator',
    description: 'Calculate attendance percentage',
    category: 'education',
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
    calculators.find((c) => c.id === 'percentage')!,
    calculators.find((c) => c.id === 'bmi')!,
    calculators.find((c) => c.id === 'emi')!,
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
