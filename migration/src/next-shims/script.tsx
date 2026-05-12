import type { ScriptHTMLAttributes } from 'react'

type NextScriptProps = ScriptHTMLAttributes<HTMLScriptElement>

export default function Script(props: NextScriptProps) {
  return <script {...props} />
}
