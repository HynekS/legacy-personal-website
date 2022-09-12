import type { ReadTimeResults } from "reading-time"

export type Meta = {
  title?: string
  author?: string
  type?: string
  dateCreated?: string
  dateLastModified?: string
  featuredImage?: string
  categories?: string[]
  keywords?: string[]
  description?: string
  timeToRead?: ReadTimeResults
  gihubFileLink?: string
}
