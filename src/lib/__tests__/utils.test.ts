import { formatRelativeDate } from '../utils';

describe('utils', () => {
  describe('formatRelativeDate', () => {
    const mockDate = new Date(Date.UTC(2025, 2, 1));

    beforeAll(() => {
      vi.setSystemTime(mockDate);
    });

    afterAll(() => {
      vi.useRealTimers();
    });

    it.each([
      { date: new Date(Date.UTC(2025, 2, 1)), expected: 'now' },
      { date: new Date(Date.UTC(2025, 1, 28, 23, 59, 59)), expected: '1 second ago' },
      { date: new Date(Date.UTC(2025, 1, 28, 23, 59, 0)), expected: '1 minute ago' },
      { date: new Date(Date.UTC(2025, 1, 28, 23, 50, 0)), expected: '10 minutes ago' },
      { date: new Date(Date.UTC(2025, 0, 1)), expected: 'Jan 1, 2025' },
      { date: -1, expected: 'Invalid Date' }
    ])(`should correctly format relative date for input: $date and current date: ${mockDate.toISOString()}`, ({ date, expected }) => {
      expect(formatRelativeDate(date.valueOf())).toEqual(expected);
    });
  });
});
