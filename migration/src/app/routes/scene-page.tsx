import type { SceneGraph } from '@pascal-app/editor'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { apiFetch } from '@/app/api-client'
import type { SceneMeta } from '@/app/types'
import { SceneLoader } from '@/components/scene-loader'

interface SceneWithGraph extends SceneMeta {
  graph: SceneGraph
}

export function ScenePage() {
  const { id = '' } = useParams<{ id: string }>()
  const [scene, setScene] = useState<SceneWithGraph | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function run() {
      try {
        const response = await apiFetch(`/api/scenes/${encodeURIComponent(id)}`, {
          cache: 'no-store',
        })
        if (!response.ok || cancelled) {
          return
        }
        const payload = (await response.json()) as SceneWithGraph
        if (!cancelled) {
          setScene(payload)
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
  }, [id])

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Loading scene...</div>
  }

  if (!scene) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-6">
        <div className="w-full max-w-md rounded-2xl border border-border/60 bg-background p-6 text-center shadow-xl">
          <p className="font-mono text-muted-foreground text-xs uppercase tracking-wide">404</p>
          <h1 className="mt-2 font-semibold text-lg">Scene not found</h1>
          <p className="mt-2 text-muted-foreground text-sm">
            We couldn&apos;t find a scene with id <code className="font-mono">{id}</code>.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <Link
              className="rounded-md border border-border bg-accent px-3 py-2 font-medium text-sm hover:bg-accent/80"
              to="/scenes"
            >
              Browse scenes
            </Link>
            <Link
              className="rounded-md border border-border bg-background px-3 py-2 font-medium text-sm hover:bg-accent/40"
              to="/"
            >
              Back to editor
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const { graph, ...meta } = scene
  return <SceneLoader initialScene={graph} meta={meta} />
}
