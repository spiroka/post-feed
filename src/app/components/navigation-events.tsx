'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

import { PREVIOUS_PAGE_KEY } from '@/lib/constants';

export default function NavigationEvents() {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${pathName}?${searchParams.toString()}`;

    console.log(`Navigating to: ${url}`);

    return () => {
      // used by the useGoBackOrDefault hook
      window.sessionStorage.setItem(PREVIOUS_PAGE_KEY, url);
    };
  }, [pathName, searchParams]);

  // not written as hook so that this can be rendered on the server
  return null;
}
