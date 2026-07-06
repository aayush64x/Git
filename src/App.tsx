import { useState } from "react";
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

  const onClicked = async () => {
    await repo.add("README.md", "# My Project");
    await repo.commit("initial commit", "User");
    await repo.branch("feature");
    await repo.checkout("feature");
    await repo.add("login.ts", "export function login() {}");
    await repo.commit("add login feature", "User");
    await repo.add("auth.ts", "export function auth() {}");
    await repo.commit("add auth", "User");
    await repo.checkout("main");
    await repo.add("hotfix.ts", "export function fix() {}");
    await repo.commit("hotfix", "User");
    onCommand();
  };
  return (
    <>
      <Navbar onClicked={onClicked} />
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
