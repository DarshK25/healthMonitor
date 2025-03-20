import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function Predictions({ healthData }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Health Predictions</CardTitle>
          <CardDescription>AI-powered health insights and predictions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 rounded-lg border bg-card">
              <h4 className="font-medium mb-2">Heart Health Risk Assessment</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Based on your recent metrics, your heart health risk is moderate.
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="warning">Moderate Risk</Badge>
                <span className="text-sm text-muted-foreground">Updated daily</span>
              </div>
            </div>

            <div className="p-4 rounded-lg border bg-card">
              <h4 className="font-medium mb-2">Blood Pressure Trend</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Your blood pressure is expected to remain stable over the next week.
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="success">Stable</Badge>
                <span className="text-sm text-muted-foreground">Weekly prediction</span>
              </div>
            </div>

            <div className="p-4 rounded-lg border bg-card">
              <h4 className="font-medium mb-2">Diabetes Risk Assessment</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Your blood glucose levels suggest a low risk of diabetes complications.
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="success">Low Risk</Badge>
                <span className="text-sm text-muted-foreground">Updated weekly</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Predictive Analytics</CardTitle>
          <CardDescription>Historical trends and future projections</CardDescription>
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
                  dataKey="heart_rate"
                  stroke="#8884d8"
                  name="Actual"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="heart_rate"
                  stroke="#82ca9d"
                  name="Predicted"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 