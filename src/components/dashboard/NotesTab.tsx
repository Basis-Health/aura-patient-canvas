
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const NotesTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Client Notes</h2>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Note
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Health History Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>Notes content will go here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotesTab;
