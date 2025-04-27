
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { DatePicker } from '@/components/form/DatePicker';
import { TimePicker } from '@/components/form/TimePicker';
import { DateTimePicker } from '@/components/form/DateTimePicker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FormComponents = () => {
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string>();
  const [dateTime, setDateTime] = useState<Date>();

  return (
    <DashboardLayout title="Form Components">
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Date Picker</CardTitle>
          </CardHeader>
          <CardContent>
            <DatePicker 
              date={date} 
              onSelect={setDate} 
              placeholder="Select a date" 
            />
            {date && <p className="mt-2 text-sm">Selected: {date.toLocaleDateString()}</p>}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Time Picker</CardTitle>
          </CardHeader>
          <CardContent>
            <TimePicker 
              value={time} 
              onChange={setTime} 
              className="w-full" 
            />
            {time && <p className="mt-2 text-sm">Selected: {time}</p>}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Date Time Picker</CardTitle>
          </CardHeader>
          <CardContent>
            <DateTimePicker 
              value={dateTime} 
              onChange={setDateTime} 
            />
            {dateTime && <p className="mt-2 text-sm">Selected: {dateTime.toLocaleString()}</p>}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default FormComponents;
