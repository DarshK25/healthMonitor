import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { AlertCircle, AlertTriangle, CheckCircle2 } from 'lucide-react';

export function Alerts({ alerts }) {
  const getAlertIcon = (severity) => {
    switch (severity) {
      case 'high':
        return <AlertCircle className="h-4 w-4" />;
      case 'medium':
        return <AlertTriangle className="h-4 w-4" />;
      case 'low':
        return <CheckCircle2 className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getAlertVariant = (severity) => {
    switch (severity) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  // Mock alerts if none provided
  const mockAlerts = [
    {
      id: 1,
      title: 'High Heart Rate Alert',
      description: 'Your heart rate has exceeded the normal range. Please take a break and monitor your condition.',
      severity: 'high',
      timestamp: new Date().toISOString()
    },
    {
      id: 2,
      title: 'Blood Pressure Warning',
      description: 'Your blood pressure is slightly elevated. Consider reducing salt intake and increasing physical activity.',
      severity: 'medium',
      timestamp: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: 3,
      title: 'Blood Glucose Update',
      description: 'Your blood glucose levels are within normal range. Keep maintaining your healthy lifestyle.',
      severity: 'low',
      timestamp: new Date(Date.now() - 7200000).toISOString()
    }
  ];

  const displayAlerts = alerts?.length > 0 ? alerts : mockAlerts;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Health Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayAlerts.map((alert) => (
            <Alert key={alert.id} variant={getAlertVariant(alert.severity)}>
              {getAlertIcon(alert.severity)}
              <AlertTitle>{alert.title}</AlertTitle>
              <AlertDescription>
                <div className="flex justify-between items-center">
                  <span>{alert.description}</span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(alert.timestamp).toLocaleString()}
                  </span>
                </div>
              </AlertDescription>
            </Alert>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 