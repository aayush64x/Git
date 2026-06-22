export interface GitBlob {
  type: 'blob'
  content : string; 
}

export interface GitTree{
  type: 'tree'
  entries : TreeEntry[]
}

export interface TreeEntry{
  mode: '100644' | '040000'
  name: string
  sha: string
}

export interface GitCommit {
  type: 'commit'
  treeSha: string
  parentSha: string[]
  message: string 
  author: string 
  timestamp: number
}

export interface GitNode{
  sha: string
  branches: string[]
  parentSha: string[]
  treeSha: string 
  message: string 
  author : string 
  timestamp : number
}

export interface GitEdge{
  from: string
  to: string
}