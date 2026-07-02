import { useEffect, useState } from "react";
import { GitRepo } from "./engine/GitRepo";
import type { GitNode, GitEdge } from "./engine/types";
import Terminal from "./components/Terminal";
import DagView from "./components/DAGView";
import Navbar from "./components/NavBar";
import Inspector from "./components/Inspector";

function App() {
  const [repo] = useState(() => new GitRepo());
  const [selectedSha, setSelectedSha] = useState("");
  const [graph, setGraph] = useState<{ nodes: GitNode[]; edges: GitEdge[] }>({
    nodes: [],
    edges: [],
  });
  const onCommand = () => {
    setGraph(repo.getGraph());
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-0">
        <div>
          <Terminal repo={repo} onCommand={onCommand} />
        </div>
        <div>
          <DagView
            nodes={graph.nodes}
            edges={graph.edges}
            onSelectNode={setSelectedSha}
          />
        </div>
        <div className="object-inspector">
          <Inspector selectedSha={selectedSha} />
        </div>
      </div>
    </>
  );
}

export default App;
