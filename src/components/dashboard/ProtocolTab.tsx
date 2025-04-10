
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, ExternalLink } from 'lucide-react';

const ProtocolTab: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Current Protocol</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="p-4 rounded-lg border border-blue-100 bg-blue-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500 rounded p-2">
                      <FileText className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">Metabolic Health Protocol</div>
                      <div className="text-sm text-gray-500">Updated 3 weeks ago</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    <span>Download PDF</span>
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Protocol Description</h3>
                <p className="text-gray-600">
                  This protocol is designed to address metabolic imbalances and support overall health through nutrition, 
                  supplementation, and lifestyle modifications. The plan emphasizes blood sugar regulation, hormone balance,
                  and reducing inflammation.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Key Focus Areas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 border rounded-lg">
                    <div className="font-medium text-blue-700">Blood Sugar Management</div>
                    <div className="text-sm text-gray-600">Stabilizing glucose levels throughout the day</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="font-medium text-blue-700">Inflammation Reduction</div>
                    <div className="text-sm text-gray-600">Lowering systemic inflammation markers</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="font-medium text-blue-700">Gut Health Optimization</div>
                    <div className="text-sm text-gray-600">Improving microbiome diversity and function</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="font-medium text-blue-700">Stress Management</div>
                    <div className="text-sm text-gray-600">Reducing cortisol and stress hormones</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="md:col-span-1">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Protocol Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 border rounded-lg flex items-start gap-3">
                <div className="bg-gray-100 p-2 rounded">
                  <FileText className="h-4 w-4 text-gray-600" />
                </div>
                <div>
                  <div className="font-medium">Food List Guide</div>
                  <div className="text-sm text-gray-600">Complete guide to metabolic-friendly foods</div>
                  <Button variant="link" size="sm" className="h-6 p-0 text-blue-600">
                    View <ExternalLink className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
              
              <div className="p-3 border rounded-lg flex items-start gap-3">
                <div className="bg-gray-100 p-2 rounded">
                  <FileText className="h-4 w-4 text-gray-600" />
                </div>
                <div>
                  <div className="font-medium">Supplement Schedule</div>
                  <div className="text-sm text-gray-600">Timing and dosage for recommended supplements</div>
                  <Button variant="link" size="sm" className="h-6 p-0 text-blue-600">
                    View <ExternalLink className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
              
              <div className="p-3 border rounded-lg flex items-start gap-3">
                <div className="bg-gray-100 p-2 rounded">
                  <FileText className="h-4 w-4 text-gray-600" />
                </div>
                <div>
                  <div className="font-medium">Exercise Guidelines</div>
                  <div className="text-sm text-gray-600">Recommended activity types and frequency</div>
                  <Button variant="link" size="sm" className="h-6 p-0 text-blue-600">
                    View <ExternalLink className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProtocolTab;
