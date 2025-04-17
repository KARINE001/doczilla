import React from 'react';
import { X } from 'lucide-react';
import { marked } from 'marked';

interface EditorProps {
  title: string;
  content: string;
  onTitleChange: (title: string) => void;
  onContentChange: (content: string) => void;
  onRemove: () => void;
}

export default function Editor({
  title,
  content,
  onTitleChange,
  onContentChange,
  onRemove
}: EditorProps) {
  return (
    <div className="bg-[#2a2a2a] rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="bg-transparent text-xl font-bold focus:outline-none focus:border-b-2 focus:border-orange-500"
          placeholder="Section Title"
        />
        <button
          onClick={onRemove}
          className="text-gray-400 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <div>
          <textarea
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            className="w-full h-[300px] bg-[#1f1f1f] border border-gray-700 rounded-lg p-4 text-white resize-none focus:outline-none focus:border-orange-500 font-mono"
            placeholder="Write your markdown content here..."
          />
        </div>
        
        <div
          className="prose prose-invert max-w-none h-[300px] overflow-y-auto bg-[#1f1f1f] border border-gray-700 rounded-lg p-4"
          dangerouslySetInnerHTML={{ __html: marked(content) }}
        />
      </div>
    </div>
  );
}