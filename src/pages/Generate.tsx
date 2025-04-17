import React, { useState } from 'react';
import { Wand2, Download } from 'lucide-react';
import { useDocsStore } from '../store/docs';
import Editor from '../components/Editor';
import ExportModal from '../components/ExportModal';
import toast from 'react-hot-toast';

// Simulated AI response
const generateDocs = async (prompt: string) => {
  // In a real implementation, this would call OpenAI's API
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
  
  return [
    {
      id: crypto.randomUUID(),
      title: 'Introduction',
      content: '# Introduction\n\nThis is an AI-generated introduction based on your prompt...'
    },
    {
      id: crypto.randomUUID(),
      title: 'Getting Started',
      content: '# Getting Started\n\nFollow these steps to get started with the project...'
    },
    {
      id: crypto.randomUUID(),
      title: 'Features',
      content: '# Features\n\nHere are the main features of the project...'
    }
  ];
};

export default function Generate() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const { sections, setSections, updateSection, removeSection } = useDocsStore();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt first');
      return;
    }

    setIsGenerating(true);
    try {
      const generatedSections = await generateDocs(prompt);
      setSections(generatedSections);
      toast.success('Documentation generated successfully!');
    } catch (error) {
      toast.error('Failed to generate documentation');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Generate Documentation</h1>
        
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
      
      <div className="bg-[#2a2a2a] rounded-xl p-8 mb-8">
        <textarea
          className="w-full h-40 bg-[#1f1f1f] border border-gray-700 rounded-lg p-4 text-white resize-none focus:outline-none focus:border-orange-500"
          placeholder="Describe your product, audience and what kind of docs you need..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        
        <button
          className="mt-4 bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded-lg flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleGenerate}
          disabled={isGenerating}
        >
          <Wand2 className="h-5 w-5" />
          <span>{isGenerating ? 'Generating...' : 'Let AI Build It'}</span>
        </button>
      </div>

      {sections.length > 0 && (
        <div className="space-y-6">
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
        </div>
      )}
      
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
}