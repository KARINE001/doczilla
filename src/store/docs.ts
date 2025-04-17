import { create } from 'zustand';
import { marked } from 'marked';
import JSZip from 'jszip';

interface Section {
  id: string;
  title: string;
  content: string;
}

interface DocsState {
  sections: Section[];
  addSection: (section: Section) => void;
  updateSection: (id: string, updates: Partial<Section>) => void;
  removeSection: (id: string) => void;
  setSections: (sections: Section[]) => void;
  exportToZip: () => Promise<Blob>;
  exportToStackblitz: () => void;
  exportToDocusaurus: (theme: 'blue' | 'orange' | 'dark') => Promise<Blob>;
}

export const useDocsStore = create<DocsState>((set, get) => ({
  sections: [],
  
  addSection: (section) => {
    set((state) => ({
      sections: [...state.sections, section]
    }));
  },
  
  updateSection: (id, updates) => {
    set((state) => ({
      sections: state.sections.map((section) =>
        section.id === id ? { ...section, ...updates } : section
      )
    }));
  },
  
  removeSection: (id) => {
    set((state) => ({
      sections: state.sections.filter((section) => section.id !== id)
    }));
  },
  
  setSections: (sections) => {
    set({ sections });
  },
  
  exportToZip: async () => {
    const zip = new JSZip();
    const { sections } = get();
    
    sections.forEach((section) => {
      zip.file(`${section.title.toLowerCase().replace(/\s+/g, '-')}.md`, section.content);
    });
    
    return zip.generateAsync({ type: 'blob' });
  },
  
  exportToStackblitz: () => {
    const { sections } = get();
    const files = sections.reduce((acc, section) => ({
      ...acc,
      [`docs/${section.title.toLowerCase().replace(/\s+/g, '-')}.md`]: section.content
    }), {});
    
    // Implement Stackblitz SDK integration here
  },
  
  exportToDocusaurus: async (theme) => {
    const zip = new JSZip();
    const { sections } = get();
    
    // Add documentation files
    sections.forEach((section) => {
      zip.file(`docs/${section.title.toLowerCase().replace(/\s+/g, '-')}.md`, section.content);
    });
    
    // Add configuration files
    const themeConfig = {
      blue: {
        primary: '#3b82f6',
        secondary: '#1d4ed8',
        background: '#ffffff'
      },
      orange: {
        primary: '#f97316',
        secondary: '#ea580c',
        background: '#1f1f1f'
      },
      dark: {
        primary: '#10b981',
        secondary: '#6366f1',
        background: '#0f172a'
      }
    }[theme];
    
    const docusaurusConfig = `
module.exports = {
  title: 'Documentation',
  tagline: 'Generated with DocGen AI',
  url: 'https://your-docusaurus-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'your-org',
  projectName: 'your-project',
  themeConfig: {
    colorMode: {
      defaultMode: '${theme === 'orange' || theme === 'dark' ? 'dark' : 'light'}',
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'Documentation',
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Docs',
        },
      ],
    },
    prism: {
      theme: require('prism-react-renderer/themes/${theme === 'orange' || theme === 'dark' ? 'vsDark' : 'github'}'),
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};`;
    
    const customCss = `
:root {
  --ifm-color-primary: ${themeConfig.primary};
  --ifm-color-primary-dark: ${themeConfig.secondary};
  --ifm-background-color: ${themeConfig.background};
}`;
    
    zip.file('docusaurus.config.js', docusaurusConfig);
    zip.file('src/css/custom.css', customCss);
    
    return zip.generateAsync({ type: 'blob' });
  }
}));