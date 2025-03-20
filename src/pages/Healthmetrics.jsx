import React from 'react'
/*************  ✨ Codeium Command ⭐  *************/
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

// Mock Data
const mockHealthData = [
  { timestamp: 1699000000000, heart_rate: 75, blood_pressure_systolic: 120, blood_pressure_diastolic: 80, blood_glucose: 95 },
  { timestamp: 1699100000000, heart_rate: 80, blood_pressure_systolic: 122, blood_pressure_diastolic: 82, blood_glucose: 97 },
  { timestamp: 1699200000000, heart_rate: 78, blood_pressure_systolic: 118, blood_pressure_diastolic: 79, blood_glucose: 94 },
  { timestamp: 1699300000000, heart_rate: 82, blood_pressure_systolic: 125, blood_pressure_diastolic: 85, blood_glucose: 99 },
  { timestamp: 1699400000000, heart_rate: 77, blood_pressure_systolic: 119, blood_pressure_diastolic: 81, blood_glucose: 96 },
];

const Healthmetrics = () => {
  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Health Metrics Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={mockHealthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" tickFormatter={(time) => new Date(time).toLocaleDateString()} />
              <YAxis />
              <Tooltip labelFormatter={(time) => new Date(time).toLocaleDateString()} />
              <Line type="monotone" dataKey="heart_rate" stroke="#8884d8" name="Heart Rate" />
              <Line type="monotone" dataKey="blood_pressure_systolic" stroke="#82ca9d" name="Systolic BP" />
              <Line type="monotone" dataKey="blood_pressure_diastolic" stroke="#ffc658" name="Diastolic BP" />
              <Line type="monotone" dataKey="blood_glucose" stroke="#ff7300" name="Blood Glucose" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Healthmetrics;

/******  25ec2cd0-b368-4791-877b-0a6dd9ab166a  *******/