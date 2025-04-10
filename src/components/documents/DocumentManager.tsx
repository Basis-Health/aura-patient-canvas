import React from 'react';
import { Filter, Plus, File, FileText, FileImage, Table, MoreVertical, Eye, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Document {
  id: string;
  name: string;
  type: 'PDF' | 'IMAGE' | 'SPREADSHEET' | 'DOC';
  category: 'labs' | 'imaging' | 'body' | 'other';
  size: string;
  date: string;
}

interface DocumentManagerProps {
  documents: Document[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  onUpload: () => void;
}

const DocumentManager = ({
  documents,
  activeCategory,
  onCategoryChange,
  onUpload,
}: DocumentManagerProps) => {
  const categories = ['All Files', 'Lab Results', 'Body Composition', 'Medical Imaging'];
  
  const getIconForType = (type: string) => {
    switch (type) {
      case 'PDF':
        return <FileText className="h-10 w-10 text-gray-400" />;
      case 'IMAGE':
        return <FileImage className="h-10 w-10 text-gray-400" />;
      case 'SPREADSHEET':
        return <Table className="h-10 w-10 text-gray-400" />;
      case 'DOC':
        return <File className="h-10 w-10 text-gray-400" />;
      default:
        return <File className="h-10 w-10 text-gray-400" />;
    }
  };
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'labs':
        return 'category-badge-labs';
      case 'imaging':
        return 'category-badge-imaging';
      case 'body':
        return 'category-badge-body';
      case 'other':
        return 'category-badge-other';
      default:
        return '';
    }
  };
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'labs':
        return <div className="mr-1">🧪</div>;
      case 'imaging':
        return <div className="mr-1">📷</div>;
      case 'body':
        return <div className="mr-1">💪</div>;
      case 'other':
        return <div className="mr-1">📄</div>;
      default:
        return null;
    }
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Your Documents</h2>
          <p className="text-gray-500">Manage your medical records and health documents</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" /> Filter
          </Button>
          <Button className="flex items-center gap-2" onClick={onUpload}>
            <Plus className="h-4 w-4" /> Upload
          </Button>
        </div>
      </div>
      
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map(category => (
          <button
            key={category}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap",
              activeCategory === category
                ? "bg-primary text-white"
                : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
            )}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {documents.map(doc => (
          <div 
            key={doc.id}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-sm transition-shadow"
          >
            <div className="p-4 flex flex-col items-center justify-center h-40">
              {getIconForType(doc.type)}
              <div className={cn("category-badge", getCategoryColor(doc.category))}>
                {getCategoryIcon(doc.category)}
                {doc.category}
              </div>
            </div>
            
            <div className="border-t border-gray-100 p-3">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium text-gray-800 mb-1 truncate w-48">
                    {doc.name}
                  </div>
                  <div className="flex gap-3 text-xs text-gray-500">
                    <span>{doc.date}</span>
                    <span>{doc.size}</span>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
              
              <div className="mt-3 flex justify-between text-sm">
                <Badge variant="outline" className="bg-gray-50 text-gray-700">
                  {doc.type}
                </Badge>
                <div className="flex gap-2">
                  <button className="text-gray-500 hover:text-gray-700">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="text-gray-500 hover:text-gray-700">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Size</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {documents.map(doc => (
              <tr key={doc.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 flex items-center gap-3">
                  {getIconForType(doc.type)}
                  <span>{doc.name}</span>
                </td>
                <td className="py-3 px-4 text-sm">{doc.type}</td>
                <td className="py-3 px-4">
                  <span className={cn("category-badge", getCategoryColor(doc.category))}>
                    {getCategoryIcon(doc.category)}
                    {doc.category}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm">{doc.size}</td>
                <td className="py-3 px-4 text-sm">{doc.date}</td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button className="text-gray-500 hover:text-gray-700">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      <Download className="h-4 w-4" />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DocumentManager;
