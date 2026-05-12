import type { Meta, StoryObj } from '@storybook/react'
import { Editor, ItemsPanel } from '@pascal-app/editor'
import { Layers, Package, Settings } from 'lucide-react'

const meta = {
  title: 'Pascal/Editor',
  component: Editor,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Editor>

export default meta
type Story = StoryObj<typeof meta>

const sidebarTabs = [
  {
    id: 'site',
    label: 'Scene',
    component: () => null,
    mobileDefaultSnap: 0.5,
    mobileIcon: <Layers className="h-5 w-5" />,
  },
  {
    id: 'items',
    label: 'Items',
    component: ItemsPanel,
    mobileDefaultSnap: 0.5,
    mobileIcon: <Package className="h-5 w-5" />,
  },
  {
    id: 'settings',
    label: 'Settings',
    component: () => null,
    mobileDefaultSnap: 0.5,
    mobileIcon: <Settings className="h-5 w-5" />,
  },
]

export const Default: Story = {
  render: () => (
    <div className="h-screen w-screen">
      <Editor projectId="storybook-editor" />
    </div>
  ),
}

export const LayoutV2: Story = {
  render: () => (
    <div className="h-screen w-screen">
      <Editor layoutVersion="v2" projectId="storybook-editor-v2" sidebarTabs={sidebarTabs} />
    </div>
  ),
}
