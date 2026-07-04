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
    <div className="h-[calc(100vh-3.5rem)] bg-[#1e2633] border-l border-gray-800 flex flex-col shadow-2xl">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800">
        <span className="ml-3 text-sm text-white font-medium">DAG View</span>
      </div>
      <svg width="100%" height="100%">
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
              stroke="#888"
              strokeWidth="1.5"
            />
          );
        })}
        {nodes.map((node) => {
          const pos = positions.get(node.sha);
          if (!pos) return null;
          return (
            <g
              key={node.sha}
              onClick={() => onSelectNode(node.sha)}
              className="cursor-pointer"
            >
              <text
                x={pos.x}
                y={pos.y - 50}
                textAnchor="middle"
                fill="#4ADE80"
                fontSize="11"
                fontWeight="500"
              >
                {node.branches.join(", ")}
              </text>
              <circle cx={pos.x} cy={pos.y} r={40} fill="blue" />
              <text
                x={pos.x}
                y={pos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize="10"
              >
                {node.sha.slice(0, 7)}
              </text>
              <text
                x={pos.x}
                y={pos.y + 55}
                textAnchor="middle"
                fill="#4ADE80"
                fontSize="11"
                fontWeight="500"
              >
                {node.message}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
export default DagView;
