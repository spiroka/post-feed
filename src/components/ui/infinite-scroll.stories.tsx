import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import InfiniteScroll from './infinite-scroll';

function StoryComponent() {
  const [items, setItems] = useState<number[]>(Array(10).fill(null).map(() => Math.random()));
  function onResult(newItems: number[]) {
    setItems((prev) => [...prev, ...newItems]);
  }
  const { isLoading, next } = useDummyItems(onResult);

  return (
    <div className="h-screen w-md">
      {items.map((item) => (
        <p key={item}>{item}</p>
      ))}
      <InfiniteScroll
        isLoading={isLoading}
        hasMore={true}
        next={next}
        threshold={0}
      >
        <p>Loading...</p>
      </InfiniteScroll>
    </div>
  );
}

function useDummyItems(onResult: (items: number[]) => void) {
  const [isLoading, setIsLoading] = useState(false);

  function next() {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const items = Array(10).fill(null).map(() => Math.random());
      onResult(items);
    }, 2000);
  }

  return { isLoading, next };
}

const meta = {
  component: InfiniteScroll,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof InfiniteScroll>;

export default meta;

export const Default: StoryObj = {
  render: () => <StoryComponent />
};
