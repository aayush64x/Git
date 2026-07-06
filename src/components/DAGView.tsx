import type { GitEdge, GitNode } from "../engine/types";
import { getPosition } from "../engine/Layout";

interface DagProps {
  nodes: GitNode[];
  edges: GitEdge[];
  onSelectNode: (sha: string) => void;
}

const DagView = ({ nodes, edges, onSelectNode }: DagProps) => {
  const positions = getPosition(nodes, edges);

  return (
    <div className="h-[calc(100vh-3.5rem)] bg-[#0f172a] border-l border-zinc-800 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 bg-[#111827] px-5 py-3">
        <h2 className="text-sm font-semibold tracking-wide text-zinc-100">
          Commit DAG
        </h2>

        <span className="text-xs text-zinc-400">
          {nodes.length} commit{nodes.length !== 1 && "s"}
        </span>
      </div>

      {/* Graph */}
      <div className="flex-1 overflow-auto">
        <svg width="100%" height="100%">
          {/* Edges */}
          {edges.map((edge, i) => {
            const from = positions.get(edge.from);
            const to = positions.get(edge.to);

            if (!from || !to) return null;

            return (
              <line
                key={i}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="#475569"
                strokeWidth={3}
                strokeLinecap="round"
              />
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            const pos = positions.get(node.sha);

            if (!pos) return null;

            return (
              <g
                key={node.sha}
                onClick={() => onSelectNode(node.sha)}
                className="cursor-pointer transition-all duration-150"
              >
                {/* Branch */}
                {node.branches.length > 0 && (
                  <>
                    <rect
                      x={pos.x - 28}
                      y={pos.y - 55}
                      width={56}
                      height={20}
                      rx={6}
                      fill="#166534"
                    />

                    <text
                      x={pos.x}
                      y={pos.y - 41}
                      textAnchor="middle"
                      fill="white"
                      fontSize="10"
                      fontWeight="600"
                    >
                      {node.branches[0]}
                    </text>
                  </>
                )}

                {/* Outer ring */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={29}
                  fill="#1d4ed8"
                  stroke="#93c5fd"
                  strokeWidth={3}
                />

                {/* Inner circle */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={18}
                  fill="#2563eb"
                />

                {/* SHA */}
                <text
                  x={pos.x}
                  y={pos.y + 1}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontSize="9"
                  fontWeight="700"
                >
                  {node.sha.slice(0, 7)}
                </text>

                {/* Commit message */}
                <text
                  x={pos.x}
                  y={pos.y + 42}
                  textAnchor="middle"
                  fill="#d4d4d8"
                  fontSize="11"
                  fontWeight="500"
                >
                  {node.message.length > 24
                    ? node.message.slice(0, 24) + "..."
                    : node.message}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default DagView;