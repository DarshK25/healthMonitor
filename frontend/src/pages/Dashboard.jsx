import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Overview } from '../components/dashboard/Overview';
import { Metrics } from '../components/dashboard/Metrics';
import { Predictions } from '../components/dashboard/Predictions';
import { Alerts } from '../components/dashboard/Alerts';
import { ThemeProvider } from '../components/theme-provider';
import { ThemeToggle } from '../components/theme-toggle';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { NotificationCenter } from '../components/notifications/NotificationCenter';
import { FileText } from 'lucide-react';

// Mock Data
const mockHealthData = [
  { timestamp: '2024-01-01T00:00:00Z', heart_rate: 75, blood_pressure_systolic: 120, blood_pressure_diastolic: 80, blood_glucose: 95, oxygen_level: 98, respiration_rate: 16 },
  { timestamp: '2024-01-01T01:00:00Z', heart_rate: 80, blood_pressure_systolic: 122, blood_pressure_diastolic: 82, blood_glucose: 97, oxygen_level: 97, respiration_rate: 18 },
  { timestamp: '2024-01-01T02:00:00Z', heart_rate: 78, blood_pressure_systolic: 118, blood_pressure_diastolic: 79, blood_glucose: 94, oxygen_level: 99, respiration_rate: 15 },
  { timestamp: '2024-01-01T03:00:00Z', heart_rate: 82, blood_pressure_systolic: 125, blood_pressure_diastolic: 85, blood_glucose: 99, oxygen_level: 98, respiration_rate: 17 },
  { timestamp: '2024-01-01T04:00:00Z', heart_rate: 77, blood_pressure_systolic: 119, blood_pressure_diastolic: 81, blood_glucose: 96, oxygen_level: 97, respiration_rate: 16 },
];

const mockAlerts = [
  { id: 1, title: 'High Heart Rate Alert', description: 'Your heart rate has exceeded the normal range.', severity: 'high', timestamp: '2024-01-01T04:00:00Z' },
  { id: 2, title: 'Blood Pressure Warning', description: 'Your blood pressure is slightly elevated.', severity: 'medium', timestamp: '2024-01-01T03:00:00Z' },
  { id: 3, title: 'Blood Glucose Update', description: 'Your blood glucose levels are within normal range.', severity: 'low', timestamp: '2024-01-01T02:00:00Z' }
];

const mockUser = {
  name: 'John Doe',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
};

export function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'overview');
  const navigate = useNavigate();

  // Update URL when tab changes
  useEffect(() => {
    setSearchParams({ tab: activeTab });
  }, [activeTab, setSearchParams]);

  return (
    <ThemeProvider defaultTheme="light" storageKey="health-dashboard-theme">
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <div className="container py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Health Dashboard</h1>
            <div className="flex items-center gap-4">
              <Button 
                variant="outline"
                onClick={() => navigate('/report')}
              >
                <FileText className="h-4 w-4 mr-2" />
                View Monthly Report
              </Button>
              <NotificationCenter />
              <ThemeToggle />
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                  <AvatarFallback>{mockUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">{mockUser.name}</p>
                  <p className="text-xs text-muted-foreground">Patient ID: #12345</p>
                </div>
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="metrics">Health Metrics</TabsTrigger>
              <TabsTrigger value="predictions">Predictions</TabsTrigger>
              <TabsTrigger value="alerts">Alerts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <Overview healthData={mockHealthData} alerts={mockAlerts} />
            </TabsContent>

            <TabsContent value="metrics" className="space-y-6">
              <Metrics healthData={mockHealthData} />
            </TabsContent>

            <TabsContent value="predictions" className="space-y-6">
              <Predictions healthData={mockHealthData} />
            </TabsContent>

            <TabsContent value="alerts" className="space-y-6">
              <Alerts alerts={mockAlerts} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ThemeProvider>
  );
}
