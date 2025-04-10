
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Clock, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';

interface Protocol {
  id: string;
  name: string;
  startDate: string;
  adherence: number;
  status: 'active' | 'completed' | 'pending';
  items: ProtocolItem[];
}

interface ProtocolItem {
  id: string;
  type: 'supplement' | 'exercise' | 'diet' | 'lifestyle';
  name: string;
  schedule: string;
  adherence: number;
  targetBiomarkers: string[];
  impact: 'positive' | 'neutral' | 'negative' | 'unknown';
}

interface PatientProtocolProps {
  protocol: Protocol;
}

const PatientProtocol = ({ protocol }: PatientProtocolProps) => {
  const getAdherenceColor = (adherence: number) => {
    if (adherence >= 80) return "bg-emerald-500";
    if (adherence >= 50) return "bg-amber-500";
    return "bg-red-500";
  };
  
  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case 'positive':
        return <Badge className="bg-emerald-500">Positive</Badge>;
      case 'negative':
        return <Badge className="bg-red-500">Negative</Badge>;
      case 'neutral':
        return <Badge className="bg-blue-500">Neutral</Badge>;
      default:
        return <Badge className="bg-gray-500">Unknown</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{protocol.name}</CardTitle>
            <CardDescription>Started {protocol.startDate} • {protocol.status === 'active' ? 'Active' : protocol.status}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={protocol.status === 'active' ? 'default' : 'outline'}>
              {protocol.status === 'active' && <span className="mr-1 inline-block w-2 h-2 rounded-full bg-white"></span>}
              {protocol.status === 'active' ? 'Active' : protocol.status === 'completed' ? 'Completed' : 'Pending'}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Overall Adherence</span>
            <span className="text-sm font-medium">{protocol.adherence}%</span>
          </div>
          <Progress value={protocol.adherence} className={`h-2 ${getAdherenceColor(protocol.adherence)}`} />
        </div>
        
        <h3 className="font-medium mb-2 text-sm">Protocol Items</h3>
        <div className="space-y-3">
          {protocol.items.map((item) => (
            <div key={item.id} className="border rounded-md p-3">
              <div className="flex justify-between">
                <div>
                  <div className="font-medium flex items-center">
                    {item.name}
                    {item.impact === 'positive' && <CheckCircle size={16} className="ml-1 text-emerald-500" />}
                    {item.impact === 'negative' && <AlertTriangle size={16} className="ml-1 text-red-500" />}
                  </div>
                  <div className="text-xs text-gray-500 flex items-center mt-1">
                    <Clock size={12} className="mr-1" /> {item.schedule}
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex justify-end mb-1">
                    {getImpactBadge(item.impact)}
                  </div>
                  <span className="text-xs">{item.adherence}% adherence</span>
                </div>
              </div>
              
              {item.targetBiomarkers.length > 0 && (
                <div className="mt-2">
                  <div className="text-xs text-gray-500 mb-1">Target Biomarkers:</div>
                  <div className="flex flex-wrap gap-1">
                    {item.targetBiomarkers.map((biomarker, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {biomarker}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-6 bg-blue-50 p-3 rounded-md text-sm">
          <h4 className="font-medium text-blue-700 mb-1">Recommendation</h4>
          <p className="text-blue-600">
            Based on the current adherence and biomarker changes, consider adding vitamin D supplementation and increasing resistance training frequency to 3x/week.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientProtocol;
