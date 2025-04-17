import React from 'react';
import { Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">© 2025 DocGen AI</span>
          </div>
          <a
            href="https://github.com/docgen-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            <Github className="h-6 w-6" />
          </a>
        </div>
      </div>
    </footer>
  );
}