import { RefStore } from './RefStore';
import { storeBlob, storeTree, storeCommit, get } from './ObjectStore';
import type { TreeEntry } from './types';

export class GitRepo {
  private refs: RefStore
  private index: TreeEntry[]  // staging area for now, just a list of entries

  constructor() {
    this.refs = new RefStore()
    this.index = []
  }

  async init(): Promise<void>{
    

  }
  async add(name: string, content: string): Promise<void>{
    const sha = await storeBlob(content);
    this.index.push({mode: '100644', name , sha});
    

  }
  async commit(message: string, author: string): Promise<string>{
    const treeSha = await storeTree(this.index)
  const headSha = this.refs.getHeadSha()
  const parents = headSha ? [headSha] : []
  const commitSha = await storeCommit(treeSha, parents, message, author)
  this.refs.updateBranch(this.refs.getCurrentBranch(), commitSha)
  return commitSha;
  }
}