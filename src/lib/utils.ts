import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatRelativeDate(timestamp: number) {
  if (timestamp < 0) {
    console.warn('formatRelativeDate should be called with a positive timestamp');
    return 'Invalid Date';
  }

  const now = Date.now();
  const diffInSeconds = Math.floor((now - timestamp) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInHours < 24) {
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

    if (diffInMinutes < 1) {
      return rtf.format(-diffInSeconds, 'second');
    } else if (diffInHours < 1) {
      return rtf.format(-diffInMinutes, 'minute');
    } else {
      return rtf.format(-diffInHours, 'hour');
    }
  }

  return new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(timestamp);
}

