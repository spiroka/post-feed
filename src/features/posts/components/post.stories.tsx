import type { Meta, StoryObj } from '@storybook/react';

import { Id } from '@/convex/_generated/dataModel';

import { Post } from './post';
import { faker } from '@faker-js/faker';

const meta = {
  component: Post,
  tags: ['autodocs']
} satisfies Meta<typeof Post>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  parameters: {
    nextjs: {
      appDirectory: true
    }
  },
  args: {
    post: {
      _id: 'id' as Id<'posts'>,
      _creationTime: Date.UTC(2025, 2, 1),
      title: 'The post title',
      body: faker.lorem.paragraph(),
      author: {
        name: 'John Doe',
        avatarUrl: 'https://placecats.com/100/100'
      }
    }
  }
};
