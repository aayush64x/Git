import { RefStore } from "./RefStore";
import { storeBlob, storeTree, storeCommit, get } from "./ObjectStore";
import type { GitCommit, TreeEntry, GitNode, GitEdge } from "./types";

export class GitRepo {
  private refs: RefStore;
  private index: TreeEntry[]; // staging area for now, just a list of entries

  constructor() {
    this.refs = new RefStore();
    this.index = [];
  }

  async init(): Promise<void> {}
  async add(name: string, content: string): Promise<void> {
    const sha = await storeBlob(content);
    this.index.push({ mode: "100644", name, sha });
  }

  async commit(message: string, author: string): Promise<string> {
    const treeSha = await storeTree(this.index);
    const headSha = this.refs.getHeadSha();
    const parents = headSha ? [headSha] : [];
    const commitSha = await storeCommit(treeSha, parents, message, author);
    this.refs.updateBranch(this.refs.getCurrentBranch(), commitSha);
    return commitSha;
  }

  async branch(name: string): Promise<void> {
    const sha = this.refs.getHeadSha();
    if (!sha) throw new Error("Cannot create branch without a commit");
    this.refs.createBranch(name, sha);
  }
  async checkout(branchName: string): Promise<void> {
    this.refs.moveHead(branchName);
  }
  async log(): Promise<GitCommit[]> {
    const commits: GitCommit[] = [];
    let sha = this.refs.getHeadSha();
    while (sha) {
      const commit = get(sha) as GitCommit;
      commits.push(commit);
      sha = commit.parentSha[0] ?? null;
    }
    return commits;
  }

  getGraph(): { nodes: GitNode[]; edges: GitEdge[] } {
    const nodes: GitNode[] = [];
    const edges: GitEdge[] = [];
    const allBranches: Map<string, string> = this.refs.getAllBranches();
    const visited = new Set<string>();
    for (const [branchName, headSha] of allBranches) {
      const stack: string[] = [headSha];
      while (stack.length > 0) {
        const sha = stack.pop()!;
        if (visited.has(sha)) continue;
        visited.add(sha);
        const commit = get(sha) as GitCommit;
        const node: GitNode = {
          sha,
          branches: [],
          parentSha: commit.parentSha,
          treeSha: commit.treeSha,
          message: commit.message,
          author: commit.author,
          timestamp: commit.timestamp,
        };
        nodes.push(node);
        for (const parentSha of commit.parentSha) {
          edges.push({
            from: sha,
            to: parentSha,
          });
          if (!visited.has(parentSha)) {
            stack.push(parentSha);
          }
        }
      }
    }
    // Add branch names to their corresponding head nodes
    for (const [branchName, headSha] of allBranches) {
      const node = nodes.find((n) => n.sha === headSha);
      if (node) {
        node.branches.push(branchName);
      }
    }
    return { nodes, edges };
  }
}
