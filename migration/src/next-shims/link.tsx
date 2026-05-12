import { type AnchorHTMLAttributes, type ReactNode } from 'react'
import { Link as RouterLink } from 'react-router-dom'

interface NextLikeLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: ReactNode
}

export default function Link({ href, children, ...rest }: NextLikeLinkProps) {
  if (href.startsWith('http://') || href.startsWith('https://')) {
    return (
      <a {...rest} href={href}>
        {children}
      </a>
    )
  }
  return (
    <RouterLink {...rest} to={href}>
      {children}
    </RouterLink>
  )
}
