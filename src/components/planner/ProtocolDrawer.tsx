
import React, { useState } from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Plus, 
  Pill, 
  Dumbbell, 
  Apple, 
  Heart,
  Brain,
  Clock,
  BarChart
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';

interface Protocol {
  id: string;
  name: string;
  description: string;
  objective: string;
  duration: string;
  targetBiomarkers: string[];
}

interface ProtocolDrawerProps {
  onAddProtocol?: (protocolId: string) => void;
  onAddHabit?: (habitType: string, habitName: string) => void;
}

const ProtocolDrawer: React.FC<ProtocolDrawerProps> = ({ onAddProtocol, onAddHabit }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock protocols by objective
  const protocols: Record<string, Protocol[]> = {
    metabolic: [
      {
        id: '1',
        name: 'Metabolic Reset',
        description: 'Optimize insulin sensitivity and glucose metabolism',
        objective: 'metabolic',
        duration: '12 weeks',
        targetBiomarkers: ['HbA1c', 'Fasting Glucose', 'Insulin', 'HOMA-IR'],
      },
      {
        id: '2',
        name: 'Cholesterol Management',
        description: 'Improve lipid profile through targeted interventions',
        objective: 'metabolic',
        duration: '16 weeks',
        targetBiomarkers: ['Total Cholesterol', 'LDL', 'HDL', 'Triglycerides'],
      },
    ],
    cardiovascular: [
      {
        id: '3',
        name: 'Heart Health Optimization',
        description: 'Comprehensive approach to cardiovascular health',
        objective: 'cardiovascular',
        duration: '12 weeks',
        targetBiomarkers: ['Blood Pressure', 'CRP', 'Homocysteine', 'Lp(a)'],
      },
    ],
    cognitive: [
      {
        id: '4',
        name: 'Cognitive Enhancement',
        description: 'Support brain health and cognitive performance',
        objective: 'cognitive',
        duration: '8 weeks',
        targetBiomarkers: ['BDNF', 'Homocysteine', 'Omega-3 Index'],
      },
    ],
    sleep: [
      {
        id: '5',
        name: 'Sleep Optimization',
        description: 'Improve sleep quality and duration',
        objective: 'sleep',
        duration: '4 weeks',
        targetBiomarkers: ['Cortisol', 'Melatonin', 'HRV'],
      },
    ],
    longevity: [
      {
        id: '6',
        name: 'Cellular Rejuvenation',
        description: 'Target key biomarkers associated with longevity',
        objective: 'longevity',
        duration: '12 weeks',
        targetBiomarkers: ['NAD+', 'Telomere Length', 'GlycanAge', 'DNA Methylation'],
      },
    ],
  };

  // Habit categories
  const habitTypes = [
    { id: 'supplement', name: 'Supplement', icon: <Pill className="h-5 w-5" /> },
    { id: 'exercise', name: 'Exercise', icon: <Dumbbell className="h-5 w-5" /> },
    { id: 'nutrition', name: 'Meal', icon: <Apple className="h-5 w-5" /> },
  ];

  // Filter protocols based on search
  const filteredProtocols = Object.values(protocols)
    .flat()
    .filter(
      protocol =>
        protocol.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        protocol.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        protocol.targetBiomarkers.some(biomarker =>
          biomarker.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

  const handleAddProtocol = (protocolId: string) => {
    if (onAddProtocol) {
      onAddProtocol(protocolId);
    }
  };

  const handleAddHabit = (habitType: string) => {
    if (onAddHabit) {
      onAddHabit(habitType, '');
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="ml-2">
          <Plus className="h-4 w-4 mr-1" /> Add
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Add to Protocol</SheetTitle>
          <SheetDescription>
            Add a new protocol or individual habit to the client's plan
          </SheetDescription>
        </SheetHeader>

        <Tabs defaultValue="protocols" className="mt-6">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="protocols">Protocols</TabsTrigger>
            <TabsTrigger value="habits">Individual Habits</TabsTrigger>
          </TabsList>

          <TabsContent value="protocols" className="space-y-4">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search protocols or functions..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={() => setSearchTerm('')}
              >
                <Heart className="h-3.5 w-3.5 text-red-500" />
                <span>Cardiovascular</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={() => setSearchTerm('metabolic')}
              >
                <BarChart className="h-3.5 w-3.5 text-blue-500" />
                <span>Metabolic</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={() => setSearchTerm('cognitive')}
              >
                <Brain className="h-3.5 w-3.5 text-purple-500" />
                <span>Cognitive</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={() => setSearchTerm('sleep')}
              >
                <Moon className="h-3.5 w-3.5 text-indigo-500" />
                <span>Sleep</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={() => setSearchTerm('longevity')}
              >
                <Clock className="h-3.5 w-3.5 text-emerald-500" />
                <span>Longevity</span>
              </Button>
            </div>

            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
              {filteredProtocols.length > 0 ? (
                filteredProtocols.map((protocol) => (
                  <Card key={protocol.id} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-base font-medium">{protocol.name}</CardTitle>
                          <CardDescription className="text-sm mt-1">
                            {protocol.description}
                          </CardDescription>
                          <div className="mt-2 flex flex-wrap gap-1">
                            {protocol.targetBiomarkers.map((biomarker) => (
                              <span
                                key={biomarker}
                                className="text-xs px-2 py-0.5 bg-gray-100 rounded-full"
                              >
                                {biomarker}
                              </span>
                            ))}
                          </div>
                          <div className="mt-2 text-xs text-gray-500">
                            Duration: {protocol.duration}
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleAddProtocol(protocol.id)}
                        >
                          <Plus className="h-4 w-4 mr-1" /> Add
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500">
                  No protocols found matching "{searchTerm}"
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="habits" className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Add individual habit</h3>
            <div className="grid grid-cols-3 gap-3">
              {habitTypes.map((habit) => (
                <Button
                  key={habit.id}
                  variant="outline"
                  className="h-24 flex flex-col justify-center"
                  onClick={() => handleAddHabit(habit.id)}
                >
                  <div className="mb-2">{habit.icon}</div>
                  <div className="text-sm">{habit.name}</div>
                </Button>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <SheetFooter className="mt-6">
          <Button variant="outline">Cancel</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ProtocolDrawer;
