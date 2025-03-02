'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function NavigationEvents() {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${pathName}?${searchParams.toString()}`;

    console.log(`Navigating to: ${url}`);

    return () => {
      window.localStorage.setItem('previousPage', url);
    };
  }, [pathName, searchParams]);

  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      window.localStorage.removeItem('previousPage');
    });
  }, []);

  return null;
}
