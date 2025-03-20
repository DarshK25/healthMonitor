import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  LineChart,  
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { StatCard } from '../components/stat-card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { ThemeProvider } from '../components/theme-provider';
import { ThemeToggle } from '../components/theme-toggle';
import { Heart, Activity, TrendingUp, TrendingDown, Droplet, Bell, Calendar, User } from 'lucide-react';
// import { useAuth } from '../hooks/useAuth';

// Mock Data
const mockHealthData = [
  { timestamp: 1699000000000, heart_rate: 75, blood_pressure_systolic: 120, blood_pressure_diastolic: 80, blood_glucose: 95, oxygen_level: 98, respiration_rate: 16 },
  { timestamp: 1699100000000, heart_rate: 80, blood_pressure_systolic: 122, blood_pressure_diastolic: 82, blood_glucose: 97, oxygen_level: 97, respiration_rate: 18 },
  { timestamp: 1699200000000, heart_rate: 78, blood_pressure_systolic: 118, blood_pressure_diastolic: 79, blood_glucose: 94, oxygen_level: 99, respiration_rate: 15 },
  { timestamp: 1699300000000, heart_rate: 82, blood_pressure_systolic: 125, blood_pressure_diastolic: 85, blood_glucose: 99, oxygen_level: 98, respiration_rate: 17 },
  { timestamp: 1699400000000, heart_rate: 77, blood_pressure_systolic: 119, blood_pressure_diastolic: 81, blood_glucose: 96, oxygen_level: 97, respiration_rate: 16 },
];

const mockAlerts = [
  { id: 1, alert_type: 'high_heart_rate', severity: 'high', message: 'Heart rate exceeded safe limits!', timestamp: 1699400000000 },
  { id: 2, alert_type: 'low_blood_pressure', severity: 'medium', message: 'Blood pressure is slightly low.', timestamp: 1699350000000 },
  { id: 3, alert_type: 'high_blood_glucose', severity: 'high', message: 'Blood glucose level is above normal.', timestamp: 1699300000000 },
  { id: 4, alert_type: 'low_oxygen_level', severity: 'medium', message: 'Oxygen level dropped below normal range.', timestamp: 1699250000000 }
];

const mockUser = {
  name: 'Jane Doe',
  age: 42,
  gender: 'Male',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
  medicalConditions: ['Hypertension', 'Type 2 Diabetes'],
  lastCheckup: '2023-11-15'
};

// Color constants
const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088fe'];

// Pie chart data
const healthScoreData = [
  { name: 'Cardiovascular', value: 80 },
  { name: 'Metabolic', value: 65 },
  { name: 'Respiratory', value: 90 },
  { name: 'General', value: 75 }
];

export function Dashboard() {
  const [ws, setWs] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Fetch health metrics (Mocked)
  const { data: healthData = mockHealthData } = useQuery({
    queryKey: ['healthMetrics'],
    queryFn: async () => {
      try {
        const response = await axios.get('/api/health-metrics');
        return response.data;
      } catch (error) {
        return mockHealthData; // Use mock data if API fails
      }
    },
    staleTime: Infinity, // Prevent unnecessary refetch
  });

  // Fetch alerts (Mocked)
  const { data: alerts = mockAlerts } = useQuery({
    queryKey: ['alerts'],
    queryFn: async () => {
      try {
        const response = await axios.get('/api/alerts');
        return response.data;
      } catch (error) {
        return mockAlerts; // Use mock data if API fails
      }
    },
    staleTime: Infinity,
  });

  // Get latest metrics for stat cards
  const latestData = healthData[healthData.length - 1] || {};
  const previousData = healthData[healthData.length - 2] || {};
  
  // Calculate trends (percentage change)
  const calculateTrend = (current, previous, key) => {
    if (!previous || previous[key] === 0) return 0;
    return Math.round(((current[key] - previous[key]) / previous[key]) * 100);
  };

  return (
    <ThemeProvider defaultTheme="light" storageKey="health-dashboard-theme">
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <div className="container py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Health Dashboard</h1>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" /> Notifications
              </Button>
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

          <Tabs defaultValue="overview" className="mb-8" onValueChange={setActiveTab}>
            <TabsList className="w-full md:w-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="metrics">Detailed Metrics</TabsTrigger>
              <TabsTrigger value="alerts">Alerts</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard 
                  title="Heart Rate" 
                  value={`${latestData.heart_rate} bpm`} 
                  icon={<Heart className="h-5 w-5" />}
                  trend={calculateTrend(latestData, previousData, 'heart_rate')}
                />
                <StatCard 
                  title="Blood Pressure" 
                  value={`${latestData.blood_pressure_systolic}/${latestData.blood_pressure_diastolic}`} 
                  icon={<Activity className="h-5 w-5" />}
                  trend={calculateTrend(latestData, previousData, 'blood_pressure_systolic')}
                />
                <StatCard 
                  title="Blood Glucose" 
                  value={`${latestData.blood_glucose} mg/dL`} 
                  icon={<Droplet className="h-5 w-5" />}
                  trend={calculateTrend(latestData, previousData, 'blood_glucose')}
                />
                <StatCard 
                  title="Oxygen Level" 
                  value={`${latestData.oxygen_level}%`} 
                  icon={<Activity className="h-5 w-5" />}
                  trend={calculateTrend(latestData, previousData, 'oxygen_level')}
                />
              </div>

              {/* Alerts Summary */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Recent Alerts <Badge variant="danger">{alerts.length}</Badge>
                  </CardTitle>
                  <CardDescription>Your most important health notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {alerts?.slice(0, 3).map((alert) => (
                      <Alert key={alert.id} className={`border-l-4 ${
                        alert.severity === 'high' ? 'border-l-red-500' :
                        alert.severity === 'medium' ? 'border-l-yellow-500' :
                        'border-l-blue-500'
                      }`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <AlertTitle className="font-semibold">
                              {alert.alert_type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </AlertTitle>
                            <AlertDescription>{alert.message}</AlertDescription>
                          </div>
                          <Badge variant={
                            alert.severity === 'high' ? 'danger' :
                            alert.severity === 'medium' ? 'warning' :
                            'success'
                          }>
                            {alert.severity}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date(alert.timestamp).toLocaleString()}
                        </p>
                      </Alert>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Chart Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Heart Rate Chart */}
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Heart Rate Trend</CardTitle>
                    <CardDescription>Last 5 readings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={healthData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            dataKey="timestamp"
                            tickFormatter={(value) => new Date(value).toLocaleDateString()}
                          />
                          <YAxis />
                          <Tooltip content={({ active, payload }) => {// 
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-background border border-border p-2 rounded shadow-sm">
                                  <p className="font-medium">{new Date(payload[0].payload.timestamp).toLocaleString()}</p>
                                  <p className="text-[#8884d8]">Heart Rate: {payload[0].value} bpm</p>
                                </div>
                              );
                            }
                            return null;
                          }} />
                          <Line
                            type="monotone"
                            dataKey="heart_rate"
                            stroke="#8884d8"
                            strokeWidth={2}
                            activeDot={{ r: 8 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Health Score Pie Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Health Score</CardTitle>
                    <CardDescription>Score breakdown by category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={healthScoreData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {healthScoreData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="metrics" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Blood Pressure Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Blood Pressure</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={healthData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            dataKey="timestamp"
                            tickFormatter={(value) => new Date(value).toLocaleDateString()}
                          />
                          <YAxis />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="blood_pressure_systolic"
                            stroke="#82ca9d"
                            name="Systolic"
                            strokeWidth={2}
                          />
                          <Line
                            type="monotone"
                            dataKey="blood_pressure_diastolic"
                            stroke="#ffc658"
                            name="Diastolic"
                            strokeWidth={2}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Blood Glucose Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Blood Glucose</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={healthData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            dataKey="timestamp"
                            tickFormatter={(value) => new Date(value).toLocaleDateString()}
                          />
                          <YAxis />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="blood_glucose"
                            stroke="#ff7300"
                            strokeWidth={2}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Oxygen Level Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Oxygen Level</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={healthData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            dataKey="timestamp"
                            tickFormatter={(value) => new Date(value).toLocaleDateString()}
                          />
                          <YAxis />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="oxygen_level"
                            stroke="#0088fe"
                            strokeWidth={2}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Respiration Rate Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Respiration Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={healthData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            dataKey="timestamp"
                            tickFormatter={(value) => new Date(value).toLocaleDateString()}
                          />
                          <YAxis />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="respiration_rate"
                            stroke="#8884d8"
                            strokeWidth={2}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="alerts" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>All Health Alerts</CardTitle>
                  <CardDescription>List of recent health alerts and notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {alerts?.map((alert) => (
                      <Alert key={alert.id} className={`border-l-4 ${
                        alert.severity === 'high' ? 'border-l-red-500' :
                        alert.severity === 'medium' ? 'border-l-yellow-500' :
                        'border-l-blue-500'
                      }`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <AlertTitle className="font-semibold">
                              {alert.alert_type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </AlertTitle>
                            <AlertDescription>{alert.message}</AlertDescription>
                          </div>
                          <Badge variant={
                            alert.severity === 'high' ? 'danger' :
                            alert.severity === 'medium' ? 'warning' :
                            'success'
                          }>
                            {alert.severity}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date(alert.timestamp).toLocaleString()}
                        </p>
                      </Alert>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-1">
                  <CardHeader>
                    <CardTitle>Personal Info</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center mb-6">
                      <Avatar className="h-24 w-24 mb-4">
                        <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                        <AvatarFallback className="text-xl">{mockUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <h3 className="text-xl font-semibold">{mockUser.name}</h3>
                      <p className="text-muted-foreground">Patient ID: #12345</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Age</span>
                        <span className="font-medium">{mockUser.age}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Gender</span>
                        <span className="font-medium">{mockUser.gender}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Last Checkup</span>
                        <span className="font-medium">{mockUser.lastCheckup}</span>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="text-sm font-semibold mb-2">Medical Conditions</h4>
                      <div className="flex flex-wrap gap-2">
                        {mockUser.medicalConditions.map((condition, i) => (
                          <Badge key={i} variant="outline">{condition}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Upcoming Appointments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center p-3 rounded-lg border">
                        <div className="mr-4 p-2 bg-primary/10 rounded-full">
                          <Calendar className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">Regular Checkup</h4>
                          <p className="text-sm text-muted-foreground">Dr. Smith, Cardiology</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">Dec 15, 2023</p>
                          <p className="text-sm text-muted-foreground">9:30 AM</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center p-3 rounded-lg border">
                        <div className="mr-4 p-2 bg-primary/10 rounded-full">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">Diabetes Consultation</h4>
                          <p className="text-sm text-muted-foreground">Dr. Johnson, Endocrinology</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">Dec 22, 2023</p>
                          <p className="text-sm text-muted-foreground">11:00 AM</p>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="w-full mt-4">Schedule New Appointment</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ThemeProvider>
  );
}
