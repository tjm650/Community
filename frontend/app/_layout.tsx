import { Slot } from 'expo-router';
import { useEffect } from 'react';

export default function RootLayout() {
  useEffect(() => {
    // Fix for GitHub Pages subdirectory deployment
    if (typeof window !== 'undefined') {
      // This script will run before the app loads to fix asset paths
      // const script = document.createElement('script');
      // // script.innerHTML = `
      // //   // Fix for GitHub Pages subdirectory
      // //   (function() {
      // //     const basePath = '/Community';
      // //     const originalCreateElement = document.createElement;
          
      // //     // Override script and link creation to fix paths
      // //     document.createElement = function(tagName) {
      // //       const element = originalCreateElement.call(this, tagName);
      // //       if (tagName === 'script' || tagName === 'link') {
      // //         const originalSetAttribute = element.setAttribute;
      // //         element.setAttribute = function(name, value) {
      // //           if (name === 'src' && value && !value.startsWith('http') && !value.startsWith('//') && !value.startsWith(basePath)) {
      // //             value = basePath + (value.startsWith('/') ? value : '/' + value);
      // //           }
      // //           if (name === 'href' && value && !value.startsWith('http') && !value.startsWith('//') && !value.startsWith(basePath) && value.includes('.') && !value.startsWith('#')) {
      // //             value = basePath + (value.startsWith('/') ? value : '/' + value);
      // //           }
      // //           return originalSetAttribute.call(this, name, value);
      // //         };
      // //       }
      // //       return element;
      // //     };
      // //   })();
      // // `;
      // document.head.appendChild(script);
    }
  }, []);

  return <Slot />;
}
