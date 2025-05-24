import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { LoadingOverlay } from '@/components/ui/loading-overlay';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true);
      document.body.setAttribute('loading', 'true');
    };

    const handleComplete = () => {
      setIsLoading(false);
      document.body.removeAttribute('loading');
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router.events]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {isLoading && <LoadingOverlay />}
        <div className="page-transition-enter">
          <Component {...pageProps} />
        </div>
        <Footer />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default MyApp; 