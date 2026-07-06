import type { GitNode, GitEdge } from "./types";

export function getDepth(sha: string, edges: GitEdge[]): number {
  let parent: string | null = sha;
  let depth = 0;

  while (parent !== null) {
    let found = false;

    for (const { from, to } of edges) {
      if (from === parent) {
        parent = to;
        depth++;
        found = true;
        break;
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
  const positions = new Map<string, { x: number; y: number }>();
  const countAtDepth = new Map<number, number>();

  const HORIZONTAL_SPACING = 220;
  const VERTICAL_SPACING = 140;

  const START_X = 120;
  const START_Y = 80;

  for (const node of nodes) {
    const depth = getDepth(node.sha, edges);

    const column = countAtDepth.get(depth) ?? 0;

    positions.set(node.sha, {
      x: START_X + column * HORIZONTAL_SPACING,
      y: START_Y + depth * VERTICAL_SPACING,
    });

    countAtDepth.set(depth, column + 1);
  }

  return positions;
}