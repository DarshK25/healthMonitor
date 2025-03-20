import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Download, FileText, Printer, Share2 } from 'lucide-react';
import { format } from 'date-fns';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Mock data for the report
const mockHealthData = {
  patientInfo: {
    name: 'John Doe',
    id: '12345',
    age: 35,
    gender: 'Male',
    bloodType: 'O+',
  },
  monthlyStats: {
    averageHeartRate: 75,
    averageBloodPressure: '120/80',
    averageBloodGlucose: 95,
    averageOxygenLevel: 98,
    totalSteps: 280000,
    caloriesBurned: 58000,
  },
  trends: [
    { date: '2024-02-01', heartRate: 72, bloodPressure: 118, glucose: 92 },
    { date: '2024-02-08', heartRate: 75, bloodPressure: 121, glucose: 95 },
    { date: '2024-02-15', heartRate: 73, bloodPressure: 119, glucose: 94 },
    { date: '2024-02-22', heartRate: 76, bloodPressure: 122, glucose: 96 },
    { date: '2024-02-29', heartRate: 74, bloodPressure: 120, glucose: 93 },
  ],
  recommendations: [
    'Maintain regular exercise routine of 30 minutes daily',
    'Continue balanced diet with reduced sodium intake',
    'Ensure 7-8 hours of quality sleep',
    'Stay hydrated with 2-3 liters of water daily',
  ],
  alerts: [
    {
      date: '2024-02-15',
      type: 'Blood Pressure',
      description: 'Slightly elevated readings - monitor closely',
      severity: 'medium',
    },
  ],
};

export function HealthReport() {
  const [isGenerating, setIsGenerating] = useState(false);
  const reportRef = useRef(null);

  const handleDownload = async () => {
    try {
      setIsGenerating(true);
      const reportElement = reportRef.current;
      
      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      // Convert the report to canvas
      const canvas = await html2canvas(reportElement, {
        scale: 2,
        useCORS: true,
        logging: false,
      });
      
      // Add the canvas as image to PDF
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;
      
      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      // Add subsequent pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      // Save the PDF
      pdf.save(`health-report-${format(new Date(), 'yyyy-MM-dd')}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Health Report',
          text: 'Check out my health report',
          url: window.location.href,
        });
      } else {
        // Fallback - copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="container mx-auto py-8 print:py-4">
      <div className="flex justify-between items-center mb-6 print:hidden">
        <h1 className="text-3xl font-bold">Monthly Health Report</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.print()}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button onClick={handleDownload} disabled={isGenerating}>
            <Download className="h-4 w-4 mr-2" />
            {isGenerating ? 'Generating...' : 'Download PDF'}
          </Button>
        </div>
      </div>

      <div ref={reportRef} className="space-y-6">
        {/* Header Section */}
        <Card className="border-t-4 border-t-primary">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">Health Summary Report</CardTitle>
                <CardDescription>
                  Period: {format(new Date('2024-02-01'), 'MMMM yyyy')}
                </CardDescription>
              </div>
              <FileText className="h-8 w-8 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Patient Name</p>
                <p className="font-medium">{mockHealthData.patientInfo.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Patient ID</p>
                <p className="font-medium">{mockHealthData.patientInfo.id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Age</p>
                <p className="font-medium">{mockHealthData.patientInfo.age}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Blood Type</p>
                <p className="font-medium">{mockHealthData.patientInfo.bloodType}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Average Heart Rate</p>
                <p className="text-2xl font-bold">{mockHealthData.monthlyStats.averageHeartRate} bpm</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Average Blood Pressure</p>
                <p className="text-2xl font-bold">{mockHealthData.monthlyStats.averageBloodPressure} mmHg</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Average Blood Glucose</p>
                <p className="text-2xl font-bold">{mockHealthData.monthlyStats.averageBloodGlucose} mg/dL</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Average Oxygen Level</p>
                <p className="text-2xl font-bold">{mockHealthData.monthlyStats.averageOxygenLevel}%</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Total Steps</p>
                <p className="text-2xl font-bold">{mockHealthData.monthlyStats.totalSteps.toLocaleString()}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Calories Burned</p>
                <p className="text-2xl font-bold">{mockHealthData.monthlyStats.caloriesBurned.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trends Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Health Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockHealthData.trends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(value) => format(new Date(value), 'MMM d')}
                  />
                  <YAxis />
                  <Tooltip
                    labelFormatter={(value) => format(new Date(value), 'MMM d, yyyy')}
                  />
                  <Line
                    type="monotone"
                    dataKey="heartRate"
                    stroke="#8884d8"
                    name="Heart Rate"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="bloodPressure"
                    stroke="#82ca9d"
                    name="Blood Pressure"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="glucose"
                    stroke="#ffc658"
                    name="Glucose"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 space-y-2">
              {mockHealthData.recommendations.map((rec, index) => (
                <li key={index} className="text-muted-foreground">
                  {rec}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Health Alerts */}
        {mockHealthData.alerts.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Health Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockHealthData.alerts.map((alert, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      alert.severity === 'high'
                        ? 'border-red-500 bg-red-50'
                        : alert.severity === 'medium'
                        ? 'border-yellow-500 bg-yellow-50'
                        : 'border-blue-500 bg-blue-50'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{alert.type}</h4>
                        <p className="text-sm text-muted-foreground">
                          {alert.description}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(alert.date), 'MMM d, yyyy')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground mt-8">
          <p>This report was generated on {format(new Date(), 'MMMM d, yyyy')}.</p>
          <p>For medical emergencies, please contact your healthcare provider immediately.</p>
        </div>
      </div>
    </div>
  );
} 