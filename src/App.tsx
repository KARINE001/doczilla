import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FileText, PenLine } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Upload from './pages/Upload';
import Generate from './pages/Generate';

function HomePage() {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12">
      <div className="max-w-7xl w-full mx-auto grid md:grid-cols-2 gap-8">
        <a 
          href="/upload"
          className="bg-[#2a2a2a] rounded-xl p-8 flex flex-col items-center text-center card-hover"
        >
          <div className="h-16 w-16 bg-orange-600 rounded-full flex items-center justify-center mb-6">
            <FileText className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold mb-3">Upload Content</h2>
          <p className="text-gray-400">
            Upload existing .md, .txt, or .json files to convert into clean documentation
          </p>
        </a>

        <a 
          href="/generate"
          className="bg-[#2a2a2a] rounded-xl p-8 flex flex-col items-center text-center card-hover"
        >
          <div className="h-16 w-16 bg-orange-600 rounded-full flex items-center justify-center mb-6">
            <PenLine className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold mb-3">Generate from Scratch</h2>
          <p className="text-gray-400">
            Start with nothing — describe your project and let AI generate full docs
          </p>
        </a>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/generate" element={<Generate />} />
        </Routes>
        <Footer />
        <Toaster position="bottom-right" />
      </div>
    </Router>
  );
}

export default App;