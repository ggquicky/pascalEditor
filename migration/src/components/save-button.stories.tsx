import type { Meta, StoryObj } from '@storybook/react'
import { CreateSceneButton, SaveButton } from './save-button'

const meta = {
  title: 'Migration/SceneActions',
  component: CreateSceneButton,
} satisfies Meta<typeof CreateSceneButton>

export default meta
type Story = StoryObj<typeof meta>

export const CreateScene: Story = {
  args: {
    label: 'Create new scene',
  },
}

export const SaveControls: StoryObj<typeof SaveButton> = {
  render: () => (
    <SaveButton
      getGraph={() => ({
        nodes: {},
        rootNodeIds: [],
      })}
      name="Story Scene"
      sceneId="story-scene"
      version={1}
    />
  ),
}
