
import React from 'react';
import { format, parse } from 'date-fns';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine,
  Rectangle,
  ReferenceArea
} from 'recharts';
import { 
  Apple, 
  Moon, 
  Dumbbell, 
  Pill,
  Heart,
  Droplet
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DataPoint {
  time: string;
  value: number;
}

interface Event {
  time: string;
  type: string;
  label: string;
  details?: string;
  duration?: string;
}

interface DayViewGraphProps {
  data: {
    heartRate: DataPoint[];
    glucose: DataPoint[];
    circadianRhythm: DataPoint[];
    events: Event[];
  };
}

const DayViewGraph: React.FC<DayViewGraphProps> = ({ data }) => {
  const timePoints = [
    "03:00 AM", "06:00 AM", "09:00 AM", "12:00 PM", 
    "03:00 PM", "06:00 PM", "09:00 PM", "12:00 AM"
  ];

  // Convert data to a unified format for recharts
  const combinedData = timePoints.map((time) => {
    const heartRatePoint = data.heartRate.find(item => item.time === time);
    const glucosePoint = data.glucose.find(item => item.time === time);
    const circadianPoint = data.circadianRhythm.find(item => item.time === time);

    return {
      time,
      heartRate: heartRatePoint?.value || null,
      glucose: glucosePoint?.value || null,
      circadian: circadianPoint?.value || null,
    };
  });

  // Handle event markers
  const getEventIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'meal':
        return <Apple className="h-5 w-5 text-emerald-600" />;
      case 'sleep':
        return <Moon className="h-5 w-5 text-indigo-600" />;
      case 'workout':
        return <Dumbbell className="h-5 w-5 text-red-600" />;
      case 'supplement':
        return <Pill className="h-5 w-5 text-amber-600" />;
      default:
        return null;
    }
  };

  const calculateEventPosition = (time: string) => {
    const hours = parseInt(time.split(':')[0]);
    const minutes = parseInt(time.split(':')[1].split(' ')[0]);
    const amPm = time.split(' ')[1];
    
    let totalHours = hours;
    if (amPm === 'PM' && hours !== 12) {
      totalHours += 12;
    } else if (amPm === 'AM' && hours === 12) {
      totalHours = 0;
    }
    
    // 24 hours = 100% width, so calculate percentage
    const percentage = ((totalHours + minutes / 60) / 24) * 100;
    return `${percentage}%`;
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-md shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((p: any, idx: number) => (
            <div key={idx} className="flex items-center gap-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: p.color }}
              />
              <span>{p.name}: {p.value} {p.name === 'Heart Rate' ? 'bpm' : p.name === 'Glucose' ? 'mg/dL' : ''}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-1">
        <div className="flex justify-between">
          <CardTitle className="text-lg">Daily Overview</CardTitle>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>Heart Rate</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span>Glucose</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Circadian Rhythm</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={combinedData} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                <XAxis 
                  dataKey="time" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#94A3B8' }}
                />
                <YAxis 
                  yAxisId="heartRate"
                  domain={[50, 120]}
                  orientation="left"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#94A3B8' }}
                  label={{ value: 'bpm', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#94A3B8', fontSize: 12 } }}
                />
                <YAxis 
                  yAxisId="glucose"
                  domain={[70, 150]}
                  orientation="right"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#94A3B8' }}
                  label={{ value: 'mg/dL', angle: 90, position: 'insideRight', style: { textAnchor: 'middle', fill: '#94A3B8', fontSize: 12 } }}
                />
                <Tooltip content={<CustomTooltip />} />
                
                {/* Nighttime area (3am-6am & 9pm-12am) */}
                <ReferenceArea x1="03:00 AM" x2="06:00 AM" y1={0} y2={200} fill="#F8FAFC" fillOpacity={0.6} />
                <ReferenceArea x1="09:00 PM" x2="12:00 AM" y1={0} y2={200} fill="#F8FAFC" fillOpacity={0.6} />
                
                <Line 
                  yAxisId="heartRate"
                  type="monotone" 
                  dataKey="heartRate" 
                  stroke="#EF4444" 
                  strokeWidth={2}
                  name="Heart Rate"
                  dot={{ fill: '#EF4444', r: 3 }}
                  activeDot={{ r: 5, strokeWidth: 0 }}
                />
                
                <Line 
                  yAxisId="glucose"
                  type="monotone" 
                  dataKey="glucose" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  name="Glucose"
                  dot={{ fill: '#3B82F6', r: 3 }}
                  activeDot={{ r: 5, strokeWidth: 0 }}
                />
                
                <Line 
                  yAxisId="heartRate"
                  type="monotone" 
                  dataKey="circadian" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  name="Circadian Rhythm"
                  dot={false}
                  activeDot={false}
                  // Scale to fit the chart
                  connectNulls
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          {/* Event markers */}
          <div className="relative h-10 mt-2 border-t border-gray-100">
            {data.events.map((event, idx) => (
              <div 
                key={idx}
                className="absolute top-0 transform -translate-y-1/2"
                style={{ left: calculateEventPosition(event.time) }}
              >
                <div className="flex flex-col items-center">
                  <div className={cn(
                    "p-1 rounded-full",
                    event.type === 'meal' ? 'bg-emerald-100' :
                    event.type === 'sleep' ? 'bg-indigo-100' :
                    event.type === 'workout' ? 'bg-red-100' :
                    'bg-amber-100'
                  )}>
                    {getEventIcon(event.type)}
                  </div>
                  <div className="text-xs font-medium mt-1">{event.label}</div>
                  <div className="text-xs text-gray-500">{event.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DayViewGraph;
