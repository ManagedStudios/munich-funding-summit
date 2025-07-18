import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';
import { Download, Search, Users, Mail, Calendar, TrendingUp } from 'lucide-react';

interface WaitlistEntry {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  company?: string;
  role?: string;
  stage: string;
  motivation: string;
  interests: string[];
  newsletter: boolean;
  created_at: string;
}

const WaitlistAdmin: React.FC = () => {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    withDetails: 0,
    newsletterOnly: 0,
    byStage: {} as Record<string, number>,
  });

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const { data, error } = await supabase
        .from('waitlist')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching entries:', error);
        return;
      }

      setEntries(data || []);
      calculateStats(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data: WaitlistEntry[]) => {
    const total = data.length;
    const withDetails = data.filter(entry => 
      entry.first_name && entry.last_name && entry.motivation !== 'Newsletter signup'
    ).length;
    const newsletterOnly = total - withDetails;
    
    const byStage = data.reduce((acc, entry) => {
      acc[entry.stage] = (acc[entry.stage] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    setStats({ total, withDetails, newsletterOnly, byStage });
  };

  const exportToCSV = () => {
    const headers = [
      'Email', 'First Name', 'Last Name', 'Company', 'Role', 
      'Stage', 'Motivation', 'Interests', 'Newsletter', 'Created At'
    ];
    
    const csvContent = [
      headers.join(','),
      ...entries.map(entry => [
        entry.email,
        entry.first_name,
        entry.last_name,
        entry.company || '',
        entry.role || '',
        entry.stage,
        `"${entry.motivation.replace(/"/g, '""')}"`,
        `"${entry.interests.join(', ')}"`,
        entry.newsletter ? 'Yes' : 'No',
        new Date(entry.created_at).toLocaleDateString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `waitlist-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredEntries = entries.filter(entry => 
    entry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (entry.company && entry.company.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading waitlist data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-black font-inter mb-2">Waitlist Administration</h1>
          <p className="text-gray-600">Munich Funding Summit 2025</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Registrations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Detailed Signups</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.withDetails}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Newsletter Only</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.newsletterOnly}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Conversion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {stats.total > 0 ? Math.round((stats.withDetails / stats.total) * 100) : 0}%
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stage Distribution */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Stage Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {Object.entries(stats.byStage).map(([stage, count]) => (
                <Badge key={stage} variant="outline" className="text-sm">
                  {stage}: {count}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Input
            placeholder="Search by email, name, or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Button onClick={exportToCSV} className="bg-primary hover:bg-primary/90 text-black">
            Export CSV
          </Button>
          <Button onClick={fetchEntries} variant="outline">
            Refresh
          </Button>
        </div>

        {/* Entries Table */}
        <Card>
          <CardHeader>
            <CardTitle>Waitlist Entries ({filteredEntries.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead>Interests</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">{entry.email}</TableCell>
                      <TableCell>
                        {entry.first_name && entry.last_name 
                          ? `${entry.first_name} ${entry.last_name}`
                          : '-'
                        }
                      </TableCell>
                      <TableCell>{entry.company || '-'}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{entry.stage}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {entry.interests.slice(0, 2).map((interest) => (
                            <Badge key={interest} variant="secondary" className="text-xs">
                              {interest}
                            </Badge>
                          ))}
                          {entry.interests.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{entry.interests.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {new Date(entry.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={entry.motivation === 'Newsletter signup' ? 'outline' : 'default'}
                          className="text-xs"
                        >
                          {entry.motivation === 'Newsletter signup' ? 'Newsletter' : 'Full'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WaitlistAdmin;
