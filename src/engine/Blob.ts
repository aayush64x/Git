import type { GitBlob } from "./types";

export function createBlob(content: string) : GitBlob{
  return {
    type: 'blob',
    content: content 
  }
}