import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { 
  Loader2, 
  LogOut, 
  Users, 
  Eye, 
  TrendingUp, 
  Calendar,
  RefreshCw,
  ShieldAlert,
  Save,
  FileText,
  Settings,
  BarChart3
} from 'lucide-react';
import { format, subDays, startOfDay, endOfDay } from 'date-fns';
import { toast } from 'sonner';

interface PageVisit {
  id: string;
  page_path: string;
  visitor_id: string | null;
  user_agent: string | null;
  referrer: string | null;
  created_at: string;
}

interface AnalyticsData {
  date: string;
  visits: number;
}

interface TopPage {
  path: string;
  visits: number;
}

interface SiteContent {
  heroTitle: string;
  heroSubtitle: string;
  heroBadge: string;
  feature1Title: string;
  feature1Desc: string;
  feature2Title: string;
  feature2Desc: string;
  feature3Title: string;
  feature3Desc: string;
  ctaTitle: string;
  ctaDescription: string;
}

const defaultContent: SiteContent = {
  heroTitle: 'Free Online Calculators',
  heroSubtitle: 'Quick, accurate, and easy-to-use calculators for health, finance, education, and everyday needs.',
  heroBadge: '100% Free • No Sign-up Required',
  feature1Title: 'Instant Results',
  feature1Desc: 'Get answers in milliseconds with no page reloads',
  feature2Title: 'Privacy First',
  feature2Desc: 'All calculations happen in your browser',
  feature3Title: 'Always Free',
  feature3Desc: 'No sign-up, no limits, no hidden fees',
  ctaTitle: 'Ready to Calculate?',
  ctaDescription: 'Explore our complete collection of free calculators.',
};

const Admin = () => {
  const navigate = useNavigate();
  const { user, loading, isAdmin, signOut } = useAuth();
  const [visits, setVisits] = useState<PageVisit[]>([]);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData[]>([]);
  const [topPages, setTopPages] = useState<TopPage[]>([]);
  const [totalVisits, setTotalVisits] = useState(0);
  const [todayVisits, setTodayVisits] = useState(0);
  const [uniqueVisitors, setUniqueVisitors] = useState(0);
  const [loadingData, setLoadingData] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [savingContent, setSavingContent] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchAnalytics();
      fetchSiteContent();
    }
  }, [user, isAdmin]);

  const fetchSiteContent = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('key, value');

      if (error) throw error;

      if (data && data.length > 0) {
        const contentFromDb: Partial<SiteContent> = {};
        data.forEach(item => {
          if (item.key in defaultContent) {
            contentFromDb[item.key as keyof SiteContent] = item.value || '';
          }
        });
        setContent({ ...defaultContent, ...contentFromDb });
      }
    } catch (error) {
      console.error('Error fetching site content:', error);
    }
  };

  const saveSiteContent = async () => {
    setSavingContent(true);
    try {
      const entries = Object.entries(content);
      
      for (const [key, value] of entries) {
        const { error } = await supabase
          .from('site_settings')
          .upsert(
            { key, value, updated_by: user?.id },
            { onConflict: 'key' }
          );
        
        if (error) throw error;
      }
      
      toast.success('Content saved successfully!');
    } catch (error) {
      console.error('Error saving content:', error);
      toast.error('Failed to save content');
    } finally {
      setSavingContent(false);
    }
  };

  const fetchAnalytics = async () => {
    setLoadingData(true);
    try {
      const { data: visitsData, error } = await supabase
        .from('page_visits')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1000);

      if (error) throw error;

      const allVisits = visitsData || [];
      setVisits(allVisits.slice(0, 50));
      setTotalVisits(allVisits.length);

      const today = startOfDay(new Date());
      const todayCount = allVisits.filter(v => 
        new Date(v.created_at) >= today
      ).length;
      setTodayVisits(todayCount);

      const uniqueIds = new Set(allVisits.map(v => v.visitor_id).filter(Boolean));
      setUniqueVisitors(uniqueIds.size);

      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = subDays(new Date(), 6 - i);
        return {
          date: format(date, 'MMM dd'),
          fullDate: date,
          visits: 0
        };
      });

      allVisits.forEach(visit => {
        const visitDate = new Date(visit.created_at);
        last7Days.forEach(day => {
          if (visitDate >= startOfDay(day.fullDate) && visitDate <= endOfDay(day.fullDate)) {
            day.visits++;
          }
        });
      });

      setAnalyticsData(last7Days.map(({ date, visits }) => ({ date, visits })));

      const pageCount: Record<string, number> = {};
      allVisits.forEach(visit => {
        pageCount[visit.page_path] = (pageCount[visit.page_path] || 0) + 1;
      });

      const sortedPages = Object.entries(pageCount)
        .map(([path, visits]) => ({ path, visits }))
        .sort((a, b) => b.visits - a.visits)
        .slice(0, 10);

      setTopPages(sortedPages);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchAnalytics();
    setRefreshing(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const updateContent = (key: keyof SiteContent, value: string) => {
    setContent(prev => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
              <ShieldAlert className="h-8 w-8 text-destructive" />
            </div>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              You don&apos;t have admin privileges. Contact the administrator to request access.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Logged in as: {user.email}
            </p>
            <Button variant="destructive" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="content-container py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              {user.email}
            </span>
            <Button variant="outline" size="sm" onClick={handleRefresh} disabled={refreshing}>
              <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            </Button>
            <Button variant="destructive" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="content-container py-8">
        {loadingData ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <Tabs defaultValue="analytics" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:inline-grid">
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="content" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Content
              </TabsTrigger>
            </TabsList>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Total Page Views</CardDescription>
                    <CardTitle className="text-3xl flex items-center gap-2">
                      <Eye className="h-6 w-6 text-primary" />
                      {totalVisits.toLocaleString()}
                    </CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Today&apos;s Views</CardDescription>
                    <CardTitle className="text-3xl flex items-center gap-2">
                      <Calendar className="h-6 w-6 text-primary" />
                      {todayVisits.toLocaleString()}
                    </CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Unique Visitors</CardDescription>
                    <CardTitle className="text-3xl flex items-center gap-2">
                      <Users className="h-6 w-6 text-primary" />
                      {uniqueVisitors.toLocaleString()}
                    </CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Top Pages</CardDescription>
                    <CardTitle className="text-3xl flex items-center gap-2">
                      <TrendingUp className="h-6 w-6 text-primary" />
                      {topPages.length}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Page Views (Last 7 Days)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={analyticsData}>
                          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                          <XAxis dataKey="date" className="text-xs" />
                          <YAxis className="text-xs" />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'hsl(var(--card))',
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px'
                            }}
                          />
                          <Bar dataKey="visits" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={analyticsData}>
                          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                          <XAxis dataKey="date" className="text-xs" />
                          <YAxis className="text-xs" />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'hsl(var(--card))',
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px'
                            }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="visits" 
                            stroke="hsl(var(--primary))" 
                            strokeWidth={2}
                            dot={{ fill: 'hsl(var(--primary))' }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Data Tables */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Most Visited Pages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Page Path</TableHead>
                          <TableHead className="text-right">Views</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {topPages.map((page, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{page.path}</TableCell>
                            <TableCell className="text-right">{page.visits.toLocaleString()}</TableCell>
                          </TableRow>
                        ))}
                        {topPages.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={2} className="text-center text-muted-foreground py-8">
                              No page visits recorded yet
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Page Visits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="max-h-[300px] overflow-y-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Page</TableHead>
                            <TableHead>Time</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {visits.slice(0, 10).map((visit) => (
                            <TableRow key={visit.id}>
                              <TableCell className="font-medium max-w-[150px] truncate">
                                {visit.page_path}
                              </TableCell>
                              <TableCell className="whitespace-nowrap text-muted-foreground">
                                {format(new Date(visit.created_at), 'MMM dd, HH:mm')}
                              </TableCell>
                            </TableRow>
                          ))}
                          {visits.length === 0 && (
                            <TableRow>
                              <TableCell colSpan={2} className="text-center text-muted-foreground py-8">
                                No page visits recorded yet
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Content Management Tab */}
            <TabsContent value="content" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Homepage Content
                  </CardTitle>
                  <CardDescription>
                    Edit the content displayed on your homepage
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Hero Section */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg border-b pb-2">Hero Section</h3>
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="heroBadge">Badge Text</Label>
                        <Input
                          id="heroBadge"
                          value={content.heroBadge}
                          onChange={(e) => updateContent('heroBadge', e.target.value)}
                          placeholder="100% Free • No Sign-up Required"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="heroTitle">Hero Title</Label>
                        <Input
                          id="heroTitle"
                          value={content.heroTitle}
                          onChange={(e) => updateContent('heroTitle', e.target.value)}
                          placeholder="Free Online Calculators"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
                        <Textarea
                          id="heroSubtitle"
                          value={content.heroSubtitle}
                          onChange={(e) => updateContent('heroSubtitle', e.target.value)}
                          placeholder="Quick, accurate, and easy-to-use calculators..."
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Features Section */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg border-b pb-2">Features Section</h3>
                    <div className="grid gap-6 md:grid-cols-3">
                      <div className="space-y-3">
                        <Label>Feature 1</Label>
                        <Input
                          value={content.feature1Title}
                          onChange={(e) => updateContent('feature1Title', e.target.value)}
                          placeholder="Title"
                        />
                        <Textarea
                          value={content.feature1Desc}
                          onChange={(e) => updateContent('feature1Desc', e.target.value)}
                          placeholder="Description"
                          rows={2}
                        />
                      </div>
                      <div className="space-y-3">
                        <Label>Feature 2</Label>
                        <Input
                          value={content.feature2Title}
                          onChange={(e) => updateContent('feature2Title', e.target.value)}
                          placeholder="Title"
                        />
                        <Textarea
                          value={content.feature2Desc}
                          onChange={(e) => updateContent('feature2Desc', e.target.value)}
                          placeholder="Description"
                          rows={2}
                        />
                      </div>
                      <div className="space-y-3">
                        <Label>Feature 3</Label>
                        <Input
                          value={content.feature3Title}
                          onChange={(e) => updateContent('feature3Title', e.target.value)}
                          placeholder="Title"
                        />
                        <Textarea
                          value={content.feature3Desc}
                          onChange={(e) => updateContent('feature3Desc', e.target.value)}
                          placeholder="Description"
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>

                  {/* CTA Section */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg border-b pb-2">Call to Action Section</h3>
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="ctaTitle">CTA Title</Label>
                        <Input
                          id="ctaTitle"
                          value={content.ctaTitle}
                          onChange={(e) => updateContent('ctaTitle', e.target.value)}
                          placeholder="Ready to Calculate?"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ctaDescription">CTA Description</Label>
                        <Textarea
                          id="ctaDescription"
                          value={content.ctaDescription}
                          onChange={(e) => updateContent('ctaDescription', e.target.value)}
                          placeholder="Explore our complete collection..."
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4 border-t">
                    <Button onClick={saveSiteContent} disabled={savingContent} className="calc-btn">
                      {savingContent ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <Save className="h-4 w-4 mr-2" />
                      )}
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  );
};

export default Admin;
