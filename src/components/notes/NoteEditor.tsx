
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Note } from '@/types/notes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface NoteEditorProps {
  note: Note | null;
  onSave: (note: Note) => void;
  isNew?: boolean;
}

export const NoteEditor: React.FC<NoteEditorProps> = ({ note, onSave, isNew = false }) => {
  const [tags, setTags] = useState<string[]>(note?.tags || []);
  const [tagInput, setTagInput] = useState('');
  const [editorMode, setEditorMode] = useState<'standard' | 'soap'>('standard');

  const defaultValues: Partial<Note> = {
    id: note?.id || '',
    title: note?.title || '',
    content: note?.content || '',
    tags: note?.tags || [],
    followUp: note?.followUp || null,
    status: note?.status || 'active',
    subjective: note?.subjective || '',
    objective: note?.objective || '',
    assessment: note?.assessment || '',
    plan: note?.plan || ''
  };

  const form = useForm<Note>({
    defaultValues: defaultValues as Note,
  });

  const handleSubmit = (data: Note) => {
    const updatedNote = {
      ...data,
      tags,
      updatedAt: new Date().toISOString(),
    };
    onSave(updatedNote);
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput) {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-semibold mb-4">
        {isNew ? 'Create New Note' : 'Edit Note'}
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter note title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <label className="text-sm font-medium">Tags</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map(tag => (
                <Badge 
                  key={tag} 
                  variant="secondary" 
                  className="px-2 py-1"
                  onClick={() => removeTag(tag)}
                >
                  {tag} <span className="ml-1 cursor-pointer">×</span>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add a tag"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button type="button" onClick={addTag} size="sm">
                Add
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <FormLabel className="block">Note Format</FormLabel>
            <Tabs 
              defaultValue={editorMode}
              onValueChange={(value) => setEditorMode(value as 'standard' | 'soap')}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="standard">Standard</TabsTrigger>
                <TabsTrigger value="soap">SOAP</TabsTrigger>
              </TabsList>

              <TabsContent value="standard" className="pt-4">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter detailed notes here..." 
                          className="min-h-[200px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="soap" className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="subjective"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subjective</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Patient's statements, symptoms, concerns..." 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="objective"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Objective</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Measurable observations, test results, vital signs..." 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="assessment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assessment</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Diagnosis, analysis, clinical impressions..." 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="plan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Plan</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Treatment plans, next steps, recommendations..." 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <FormLabel className="text-sm font-medium mb-0">Follow-up Date</FormLabel>
                </div>
                
                <div className="mt-2">
                  <FormField
                    control={form.control}
                    name="followUp"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input 
                            type="date" 
                            {...field} 
                            value={field.value || ''}
                            onChange={(e) => field.onChange(e.target.value || null)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200">
              <CardContent className="p-4">
                <FormLabel className="text-sm font-medium">Note Status</FormLabel>
                <div className="mt-2 space-y-2">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="status-active" 
                              checked={field.value === 'active'}
                              onCheckedChange={() => field.onChange('active')}
                            />
                            <label htmlFor="status-active" className="text-sm cursor-pointer">Active</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="status-completed" 
                              checked={field.value === 'completed'}
                              onCheckedChange={() => field.onChange('completed')}
                            />
                            <label htmlFor="status-completed" className="text-sm cursor-pointer">Completed</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="status-archived" 
                              checked={field.value === 'archived'}
                              onCheckedChange={() => field.onChange('archived')}
                            />
                            <label htmlFor="status-archived" className="text-sm cursor-pointer">Archived</label>
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline">Cancel</Button>
            <Button type="submit">Save Note</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
