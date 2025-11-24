import { Slot } from 'expo-router';
import { useEffect } from 'react';
import { usePathname } from 'expo-router';

export default function RootLayout() {
  const pathname = usePathname();

  useEffect(() => {
    // Set base path for GitHub Pages deployment
    if (typeof window !== 'undefined') {
      // This ensures assets load from the correct base path
      const basePath = '/Community';
      document.documentElement.setAttribute('data-base-path', basePath);
    }
  }, []);

  return <Slot />;
}
