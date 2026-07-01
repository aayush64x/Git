import { useEffect, useState } from "react";
import { GitRepo } from "./engine/GitRepo";
import Terminal from "./components/Terminal";
import DagView from "./components/DAGView";

function App() {
  const [repo] = useState(() => new GitRepo());
  const [selectedSha, setSelectedSha] = useState("");
  const [graph, setGraph] = useState({nodes : [], edges : []});
  const onCommand = () => {};
  return (
    <div className="grid grid-cols-3 gap-0">
      <div>
        <Terminal repo={repo}  onCommand={onCommand} />
      </div>
      <div>
        <DagView />
      </div>
      <div className="object-inspector"></div>
    </div>
  );
}

export default App;
