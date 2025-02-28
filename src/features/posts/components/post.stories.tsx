import type { Meta, StoryObj } from '@storybook/react';

import { Post } from './post';

const meta = {
  component: Post,
  tags: ['autodocs']
} satisfies Meta<typeof Post>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    title: "title",
    body: "body"
  }
};
