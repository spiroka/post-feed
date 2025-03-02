import { useRouter } from 'next/navigation';

import { PREVIOUS_PAGE_KEY } from '../constants';

export function useGoBackOrDefault(defaultUrl: string) {
  const router = useRouter();

  return () => {
    if (window.sessionStorage.getItem(PREVIOUS_PAGE_KEY)) {
      router.back();
    } else {
      router.push(defaultUrl);
    }
  };
}
