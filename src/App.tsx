import { useEffect, useState } from "react";
import { GitRepo } from "./engine/GitRepo";
import Terminal from "./components/Terminal";

function App() {
  const [repo] = useState(() => new GitRepo());
  const [selectedSha, setSelectedSha] = useState("");
  const [graph, setGraph] = useState({nodes : [], edges : []});
  const onCommand = () => {};
  return (
    <>
      <div className="terminal">
       <Terminal repo={repo}  onCommand={onCommand} />
       <h1>Terminal</h1>
      </div>
      <div className="graph"></div>
      <div className="object-inspector"></div>
    </>
  );
}

export default App;
