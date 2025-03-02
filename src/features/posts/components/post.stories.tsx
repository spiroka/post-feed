import type { Meta, StoryObj } from '@storybook/react';

import { Id } from '@/convex/_generated/dataModel';

import { Post } from './post';

const meta = {
  component: Post,
  tags: ['autodocs']
} satisfies Meta<typeof Post>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    post: {
      _id: 'id' as Id<'posts'>,
      _creationTime: Date.UTC(2025, 2, 1),
      title: 'title',
      body: 'body'
    }
  }
};
