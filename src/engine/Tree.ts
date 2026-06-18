import type { GitTree, TreeEntry } from "./types";

export function createTree(entries: TreeEntry[]): GitTree{
  return {
    type : 'tree',
    entries : entries
  }

}