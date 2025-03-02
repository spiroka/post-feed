import { useRouter } from 'next/navigation';

export function useGoBackOrDefault(defaultUrl: string) {
  const router = useRouter();

  return () => {
    if (window.localStorage.getItem('previousPage')) {
      router.back();
    } else {
      router.push(defaultUrl);
    }
  };
}
