import type { ImgHTMLAttributes } from 'react'

interface NextLikeImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  width?: number
  height?: number
}

export default function Image({ src, alt, ...rest }: NextLikeImageProps) {
  return <img alt={alt} src={src} {...rest} />
}
