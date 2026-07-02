import type { GitNode, GitEdge } from './types';
export function getDepth(sha: string, edges: GitEdge[]): number {
  let parent: string | null = sha;
  let depth: number = 0;
  while (parent !== null) {
    let found = false;
    for (const { from, to } of edges) {
      if (from === parent) {
        parent = to;
        depth += 1;
        found = true;
      }
    }
    if (!found) parent = null;
  }
  return depth;
}

export function getPosition(
  nodes: GitNode[],
  edges: GitEdge[],
): Map<string, { x: number; y: number }> {
  const map = new Map();
  const countAtDepth = new Map<number, number>();
  for (const node of nodes) {
    const depth = getDepth(node.sha, edges);
    const y = depth * 120 + 60;
    const index = countAtDepth.get(depth) ?? 0;
    const x = index * 150 + 75;
    countAtDepth.set(depth, index + 1);
    map.set(node.sha, { x, y });
  }

  return map;
}
