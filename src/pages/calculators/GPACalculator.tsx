import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import { getCalculatorById } from '@/lib/calculators';

interface Course {
  id: number;
  grade: string;
  credits: string;
}

const GPACalculator = () => {
  const calculator = getCalculatorById('gpa')!;
  
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, grade: '4.0', credits: '3' },
    { id: 2, grade: '3.7', credits: '3' },
    { id: 3, grade: '3.3', credits: '3' },
  ]);
  const [result, setResult] = useState<{ gpa: number; totalCredits: number; totalPoints: number } | null>(null);

  const gradePoints: Record<string, number> = {
    '4.0': 4.0, 'A+': 4.0, 'A': 4.0,
    '3.7': 3.7, 'A-': 3.7,
    '3.3': 3.3, 'B+': 3.3,
    '3.0': 3.0, 'B': 3.0,
    '2.7': 2.7, 'B-': 2.7,
    '2.3': 2.3, 'C+': 2.3,
    '2.0': 2.0, 'C': 2.0,
    '1.7': 1.7, 'C-': 1.7,
    '1.3': 1.3, 'D+': 1.3,
    '1.0': 1.0, 'D': 1.0,
    '0.7': 0.7, 'D-': 0.7,
    '0.0': 0.0, 'F': 0.0,
  };

  const calculate = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach(course => {
      const credits = parseFloat(course.credits) || 0;
      const points = gradePoints[course.grade] || 0;
      totalPoints += points * credits;
      totalCredits += credits;
    });

    const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
    setResult({ gpa, totalCredits, totalPoints });
  };

  const addCourse = () => {
    setCourses([...courses, { id: Date.now(), grade: '4.0', credits: '3' }]);
  };

  const removeCourse = (id: number) => {
    if (courses.length > 1) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  const updateCourse = (id: number, field: 'grade' | 'credits', value: string) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const reset = () => {
    setCourses([{ id: 1, grade: '4.0', credits: '3' }]);
    setResult(null);
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      title="GPA Calculator"
      description="Calculate your Grade Point Average (GPA) from course grades and credit hours."
      intro="Enter your courses, grades, and credit hours to calculate your cumulative GPA."
      formula="GPA = Σ(Grade Points × Credit Hours) / Σ(Credit Hours)"
      example="3 courses: A (3 credits), B+ (3 credits), A- (4 credits) = GPA 3.59"
      faqs={[
        { question: 'What GPA scale is used?', answer: 'This uses the standard 4.0 scale where A = 4.0, B = 3.0, C = 2.0, D = 1.0, F = 0.' },
        { question: 'What is a good GPA?', answer: 'Generally, 3.5+ is excellent, 3.0-3.5 is good, 2.5-3.0 is average, below 2.0 may require academic support.' },
        { question: 'How do credit hours work?', answer: 'Credit hours represent the weight of each course. More credits = more impact on GPA.' },
      ]}
    >
      <div className="space-y-3 mb-6">
        {courses.map((course, index) => (
          <div key={course.id} className="flex gap-2 items-end">
            <div className="flex-1">
              <Label className="mb-1 block text-sm">Course {index + 1} Grade</Label>
              <Select value={course.grade} onValueChange={(v) => updateCourse(course.id, 'grade', v)}>
                <SelectTrigger className="calc-input">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4.0">A (4.0)</SelectItem>
                  <SelectItem value="3.7">A- (3.7)</SelectItem>
                  <SelectItem value="3.3">B+ (3.3)</SelectItem>
                  <SelectItem value="3.0">B (3.0)</SelectItem>
                  <SelectItem value="2.7">B- (2.7)</SelectItem>
                  <SelectItem value="2.3">C+ (2.3)</SelectItem>
                  <SelectItem value="2.0">C (2.0)</SelectItem>
                  <SelectItem value="1.7">C- (1.7)</SelectItem>
                  <SelectItem value="1.3">D+ (1.3)</SelectItem>
                  <SelectItem value="1.0">D (1.0)</SelectItem>
                  <SelectItem value="0.0">F (0.0)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-24">
              <Label className="mb-1 block text-sm">Credits</Label>
              <Input
                type="number"
                value={course.credits}
                onChange={(e) => updateCourse(course.id, 'credits', e.target.value)}
                className="calc-input"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => removeCourse(course.id)}
              disabled={courses.length === 1}
              className="h-10 w-10"
            >
              ×
            </Button>
          </div>
        ))}
        <Button variant="outline" onClick={addCourse} className="w-full">
          + Add Course
        </Button>
      </div>

      <div className="flex gap-3 mb-6">
        <Button onClick={calculate} className="calc-btn flex-1">Calculate GPA</Button>
        <Button onClick={reset} variant="outline" className="calc-btn-secondary">Reset</Button>
      </div>

      {result && (
        <div className="calc-result animate-scale-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Your GPA</p>
              <p className="calc-result-value">{result.gpa.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Credits</p>
              <p className="text-2xl font-bold text-foreground">{result.totalCredits}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Quality Points</p>
              <p className="text-2xl font-bold text-foreground">{result.totalPoints.toFixed(1)}</p>
            </div>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
};

export default GPACalculator;
