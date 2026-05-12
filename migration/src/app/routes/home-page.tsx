import { Editor } from '@pascal-app/editor'
import { Link } from 'react-router-dom'

const PROJECT_ID = 'migration-editor'

export function HomePage() {
  return (
    <div className="relative h-screen w-screen">
      <div className="pointer-events-none absolute top-3 left-1/2 z-40 -translate-x-1/2">
        <div className="pointer-events-auto flex items-center gap-3 rounded-full border border-border/60 bg-background/90 px-4 py-1.5 text-xs shadow-sm backdrop-blur">
          <span className="text-muted-foreground">Migration editor running on Vite.</span>
          <Link className="font-medium text-foreground hover:underline" to="/scenes">
            Open recent scenes
          </Link>
        </div>
      </div>
      <Editor layoutVersion="v2" projectId={PROJECT_ID} />
    </div>
  )
}
