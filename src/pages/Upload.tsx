import React, { useState, useCallback } from 'react';
import { Upload as UploadIcon, Plus, Download } from 'lucide-react';
import { useDocsStore } from '../store/docs';
import Editor from '../components/Editor';
import ExportModal from '../components/ExportModal';
import toast from 'react-hot-toast';

export default function Upload() {
  const [isDragging, setIsDragging] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const { sections, setSections, addSection, updateSection, removeSection } = useDocsStore();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    await processFiles(files);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      await processFiles(files);
    }
  };

  const processFiles = async (files: File[]) => {
    try {
      const newSections = await Promise.all(
        files.map(async (file) => {
          const content = await file.text();
          return {
            id: crypto.randomUUID(),
            title: file.name.replace(/\.[^/.]+$/, ''),
            content
          };
        })
      );
      
      setSections([...sections, ...newSections]);
      toast.success('Files uploaded successfully!');
    } catch (error) {
      toast.error('Error processing files. Please try again.');
    }
  };

  const handleAddSection = () => {
    addSection({
      id: crypto.randomUUID(),
      title: 'New Section',
      content: ''
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Upload Documentation</h1>
        
        {sections.length > 0 && (
          <button
            onClick={() => setIsExportModalOpen(true)}
            className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Download className="h-5 w-5" />
            <span>Export</span>
          </button>
        )}
      </div>
      
      {sections.length === 0 ? (
        <div
          className={`border-2 border-dashed rounded-xl p-12 text-center ${
            isDragging ? 'border-orange-500 bg-orange-500/10' : 'border-gray-700'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <UploadIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <h2 className="text-xl font-semibold mb-2">
            Drag and drop your files here
          </h2>
          <p className="text-gray-400 mb-4">
            Support for .md, .txt, and .json files
          </p>
          <label className="bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded-lg cursor-pointer">
            Choose File
            <input
              type="file"
              className="hidden"
              accept=".md,.txt,.json"
              onChange={handleFileSelect}
              multiple
            />
          </label>
        </div>
      ) : (
        <div>
          {sections.map((section) => (
            <Editor
              key={section.id}
              title={section.title}
              content={section.content}
              onTitleChange={(title) => updateSection(section.id, { title })}
              onContentChange={(content) => updateSection(section.id, { content })}
              onRemove={() => removeSection(section.id)}
            />
          ))}
          
          <button
            onClick={handleAddSection}
            className="w-full border-2 border-dashed border-gray-700 rounded-xl p-4 text-gray-400 hover:text-white hover:border-orange-500 flex items-center justify-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Section</span>
          </button>
        </div>
      )}
      
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
}