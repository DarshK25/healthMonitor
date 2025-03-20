import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Badge } from '../ui/badge';
import { Heart, Activity, TrendingUp, TrendingDown, Droplet } from 'lucide-react';
import { StatCard } from '../stat-card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088fe'];

const healthScoreData = [
  { name: 'Cardiovascular', value: 80 },
  { name: 'Metabolic', value: 65 },
  { name: 'Respiratory', value: 90 },
  { name: 'General', value: 75 }
];

export function Overview({ healthData, alerts }) {
  // Get latest metrics for stat cards
  const latestData = healthData?.[healthData.length - 1] || {};
  const previousData = healthData?.[healthData.length - 2] || {};
  
  // Calculate trends (percentage change)
  const calculateTrend = (current, previous, key) => {
    if (!previous || previous[key] === 0) return 0;
    return Math.round(((current[key] - previous[key]) / previous[key]) * 100);
  };

  // Mock alerts if none provided
  const mockAlerts = [
    {
      id: 1,
      title: 'High Heart Rate Alert',
      description: 'Your heart rate has exceeded the normal range.',
      severity: 'high',
      timestamp: new Date().toISOString()
    },
    {
      id: 2,
      title: 'Blood Pressure Warning',
      description: 'Your blood pressure is slightly elevated.',
      severity: 'medium',
      timestamp: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: 3,
      title: 'Blood Glucose Update',
      description: 'Your blood glucose levels are within normal range.',
      severity: 'low',
      timestamp: new Date(Date.now() - 7200000).toISOString()
    }
  ];

  const displayAlerts = alerts?.length > 0 ? alerts : mockAlerts;

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Heart Rate" 
          value={`${latestData.heart_rate || 0} bpm`} 
          icon={<Heart className="h-5 w-5" />}
          trend={calculateTrend(latestData, previousData, 'heart_rate')}
        />
        <StatCard 
          title="Blood Pressure" 
          value={`${latestData.blood_pressure_systolic || 0}/${latestData.blood_pressure_diastolic || 0}`} 
          icon={<Activity className="h-5 w-5" />}
          trend={calculateTrend(latestData, previousData, 'blood_pressure_systolic')}
        />
        <StatCard 
          title="Blood Glucose" 
          value={`${latestData.blood_glucose || 0} mg/dL`} 
          icon={<Droplet className="h-5 w-5" />}
          trend={calculateTrend(latestData, previousData, 'blood_glucose')}
        />
        <StatCard 
          title="Oxygen Level" 
          value={`${latestData.oxygen_level || 0}%`} 
          icon={<Activity className="h-5 w-5" />}
          trend={calculateTrend(latestData, previousData, 'oxygen_level')}
        />
      </div>

      {/* Alerts Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Recent Alerts <Badge variant="destructive">{displayAlerts.length}</Badge>
          </CardTitle>
          <CardDescription>Your most important health notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {displayAlerts.slice(0, 3).map((alert) => (
              <Alert key={alert.id} className={`border-l-4 ${
                alert.severity === 'high' ? 'border-l-red-500' :
                alert.severity === 'medium' ? 'border-l-yellow-500' :
                'border-l-blue-500'
              }`}>
                <div className="flex justify-between items-start">
                  <div>
                    <AlertTitle className="font-semibold">
                      {alert.title}
                    </AlertTitle>
                    <AlertDescription>{alert.description}</AlertDescription>
                  </div>
                  <Badge variant={
                    alert.severity === 'high' ? 'destructive' :
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
                <LineChart data={healthData || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="timestamp"
                    tickFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <YAxis />
                  <Tooltip content={({ active, payload }) => {
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
    </div>
  );
} 