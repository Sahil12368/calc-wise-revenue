import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/common/SEO';
import CalculatorCard from '@/components/calculator/CalculatorCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { calculators, categoryInfo, CalculatorCategory, searchCalculators, getCalculatorsByCategory } from '@/lib/calculators';
import { Search } from 'lucide-react';

const AllCalculators = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const activeCategory = searchParams.get('category') as CalculatorCategory | null;

  const filteredCalculators = useMemo(() => {
    if (query) return searchCalculators(query);
    if (activeCategory) return getCalculatorsByCategory(activeCategory);
    return calculators;
  }, [query, activeCategory]);

  const setCategory = (cat: CalculatorCategory | null) => {
    if (cat) {
      setSearchParams({ category: cat });
    } else {
      setSearchParams({});
    }
    setQuery('');
  };

  return (
    <Layout>
      <SEO title="All Calculators" description="Browse all free online calculators - health, finance, education, and daily calculators." />
      <div className="content-container py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">All Calculators</h1>
        <p className="text-muted-foreground mb-6">Browse our complete collection of free online calculators.</p>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search calculators..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSearchParams({}); }}
            className="pl-10 calc-input"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button variant={!activeCategory ? 'default' : 'outline'} onClick={() => setCategory(null)} size="sm">All</Button>
          {Object.entries(categoryInfo).map(([key, info]) => (
            <Button key={key} variant={activeCategory === key ? 'default' : 'outline'} onClick={() => setCategory(key as CalculatorCategory)} size="sm">
              {info.name}
            </Button>
          ))}
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCalculators.map((calc) => (
            <CalculatorCard key={calc.id} calculator={calc} />
          ))}
        </div>

        {filteredCalculators.length === 0 && (
          <p className="text-center text-muted-foreground py-12">No calculators found. Try a different search.</p>
        )}
      </div>
    </Layout>
  );
};

export default AllCalculators;
