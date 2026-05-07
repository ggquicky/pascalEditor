type Router = {
  push: (href: string) => void
  replace: (href: string) => void
  back: () => void
}

const noop = () => {}

export function useRouter(): Router {
  return {
    push: noop,
    replace: noop,
    back: noop,
  }
}
