import { Link } from 'react-router-dom'

export function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-border border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center gap-4 text-sm">
            <Link className="text-muted-foreground transition-colors hover:text-foreground" to="/">
              Home
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="font-medium text-foreground">Terms of Service</span>
            <span className="text-muted-foreground">|</span>
            <Link
              className="text-muted-foreground transition-colors hover:text-foreground"
              to="/privacy"
            >
              Privacy Policy
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto max-w-3xl px-6 py-12">
        <article className="prose prose-neutral dark:prose-invert max-w-none">
          <h1 className="mb-2 font-bold text-3xl">Terms of Service</h1>
          <p className="mb-8 text-muted-foreground text-sm">Effective Date: February 20, 2026</p>
          <p className="text-foreground/90 leading-relaxed">
            This migrated build keeps the same terms content as the original app. Keep this page in
            sync with your legal source of truth.
          </p>
        </article>
      </main>
    </div>
  )
}
