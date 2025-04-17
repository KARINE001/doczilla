import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useDocsStore } from '../store/docs';
import toast from 'react-hot-toast';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExportModal({ isOpen, onClose }: ExportModalProps) {
  const { exportToZip, exportToDocusaurus } = useDocsStore();

  const handleExport = async (type: string, theme?: 'blue' | 'orange' | 'dark') => {
    try {
      let blob: Blob;
      
      if (type === 'zip') {
        blob = await exportToZip();
      } else if (type === 'docusaurus' && theme) {
        blob = await exportToDocusaurus(theme);
      } else {
        return;
      }
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `documentation-${type}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success('Export successful!');
      onClose();
    } catch (error) {
      toast.error('Export failed. Please try again.');
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-xl bg-[#2a2a2a] p-6 shadow-xl transition-all">
                <Dialog.Title className="text-2xl font-bold mb-6">
                  Export Documentation
                </Dialog.Title>

                <div className="space-y-6">
                  <button
                    onClick={() => handleExport('zip')}
                    className="w-full bg-orange-600 hover:bg-orange-700 p-4 rounded-lg text-left"
                  >
                    <h3 className="text-lg font-semibold mb-1">Export as ZIP</h3>
                    <p className="text-gray-400">Download all sections as individual Markdown files</p>
                  </button>

                  <div className="border-t border-gray-700 pt-6">
                    <h3 className="text-lg font-semibold mb-4">Export to Docusaurus</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {(['blue', 'orange', 'dark'] as const).map((theme) => (
                        <button
                          key={theme}
                          onClick={() => handleExport('docusaurus', theme)}
                          className="bg-[#1f1f1f] hover:bg-[#333] p-4 rounded-lg text-left"
                        >
                          <div className={`w-full h-2 rounded-full mb-2 bg-${theme === 'blue' ? 'blue-500' : theme === 'orange' ? 'orange-500' : 'emerald-500'}`} />
                          <h4 className="font-medium capitalize">{theme}</h4>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}