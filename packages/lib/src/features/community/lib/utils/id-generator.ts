import { nanoid } from 'nanoid'

export function createId(prefix?: string): string {
  if (prefix) {
    return `${prefix}_${nanoid(12)}`
  }
  return nanoid(12)
}
