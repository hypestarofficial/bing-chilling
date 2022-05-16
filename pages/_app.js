import Loading from '../components/loading/loading';

import '../styles/globals.css';
import { magic } from '../lib/magic-client';

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState('true');

  useEffect(() => {
    const isLoggedIn = async () => {
      const loggedIn = await magic.user.isLoggedIn();
      if (loggedIn) {
        router.push('/');
      } else {
        router.push('/login');
      }
    };
    isLoggedIn();
  }, [magic]);

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    };

    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return isLoading ? <Loading /> : <Component {...pageProps} />;
}

export default MyApp;
