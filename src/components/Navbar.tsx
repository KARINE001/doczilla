import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <BookOpen className="h-8 w-8 text-orange-500" />
            <span className="text-xl font-bold">DocGen AI</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link 
              to="/upload" 
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Upload
            </Link>
            <Link 
              to="/generate"
              className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-md text-sm font-medium"
            >
              Generate Docs
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}