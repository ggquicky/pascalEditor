import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiFetch } from '@/app/api-client'
import { CreateSceneButton } from '@/components/save-button'
import type { SceneMeta } from '@/app/types'

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString()
  } catch {
    return iso
  }
}

export function ScenesPage() {
  const [scenes, setScenes] = useState<SceneMeta[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function run() {
      try {
        const response = await apiFetch('/api/scenes?limit=50', {
          cache: 'no-store',
        })
        if (!response.ok || cancelled) {
          return
        }
        const payload = (await response.json()) as { scenes?: SceneMeta[] } | SceneMeta[]
        const next = Array.isArray(payload) ? payload : payload.scenes ?? []
        if (!cancelled) {
          setScenes(next)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    void run()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-border border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between gap-4 px-6 py-4">
          <nav className="flex items-center gap-4 text-sm">
            <Link className="text-muted-foreground transition-colors hover:text-foreground" to="/">
              Home
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="font-medium text-foreground">Scenes</span>
          </nav>
          <CreateSceneButton />
        </div>
      </header>

      <main className="container mx-auto max-w-5xl px-6 py-12">
        <h1 className="mb-2 font-bold text-3xl">Your scenes</h1>
        <p className="mb-8 text-muted-foreground text-sm">
          {loading
            ? 'Loading scenes...'
            : scenes.length === 0
              ? 'No scenes yet. Create one to get started.'
              : `${scenes.length} scene${scenes.length === 1 ? '' : 's'}.`}
        </p>

        {!loading && scenes.length === 0 ? (
          <div className="rounded-xl border border-border/60 border-dashed bg-background p-12 text-center">
            <p className="text-muted-foreground text-sm">You haven&apos;t saved any scenes yet.</p>
            <div className="mt-4 flex justify-center">
              <CreateSceneButton />
            </div>
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {scenes.map((scene) => (
              <li key={scene.id}>
                <Link
                  className="group block rounded-xl border border-border/60 bg-background p-4 transition-colors hover:border-border hover:bg-accent/30"
                  to={`/scene/${scene.id}`}
                >
                  <div className="flex aspect-video items-center justify-center overflow-hidden rounded-lg bg-accent/30">
                    {scene.thumbnailUrl ? (
                      <img
                        alt={scene.name}
                        className="h-full w-full object-cover"
                        src={scene.thumbnailUrl}
                      />
                    ) : (
                      <span className="text-muted-foreground text-xs">No thumbnail</span>
                    )}
                  </div>
                  <div className="mt-3">
                    <h2 className="truncate font-semibold text-sm group-hover:text-foreground">
                      {scene.name}
                    </h2>
                    <div className="mt-1 flex items-center justify-between text-muted-foreground text-xs">
                      <span>{scene.nodeCount} nodes</span>
                      <time dateTime={scene.updatedAt}>{formatDate(scene.updatedAt)}</time>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}
