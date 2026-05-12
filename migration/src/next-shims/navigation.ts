import { useLocation, useNavigate } from 'react-router-dom'

export function useRouter() {
  const navigate = useNavigate()
  return {
    push: (to: string) => navigate(to),
    replace: (to: string) => navigate(to, { replace: true }),
    refresh: () => navigate(0),
    back: () => navigate(-1),
    forward: () => navigate(1),
  }
}

export function usePathname() {
  return useLocation().pathname
}
