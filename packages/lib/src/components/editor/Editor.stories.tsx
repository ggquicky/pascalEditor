import type { Meta, StoryObj } from '@storybook/react';
import Editor from './index';

const meta: Meta<typeof Editor> = {
  title: 'Editor/MainEditor',
  component: Editor,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Editor>;

export const Default: Story = {
  args: {
    projectId: 'local_demo',
    baseUrl: 'https://api.pascal.app',
    token: 'mock-token',
  },
};
