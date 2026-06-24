import { GitRepo } from "../engine/GitRepo";
import { useState } from "react";

interface TerminalProps {
  repo: GitRepo;
  onCommand: () => void;
}

const Terminal = ({ repo, onCommand }: TerminalProps) => {
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const a = repo; 
  const b = onCommand;

  const onKeyDown = (e : React.KeyboardEvent) => {
    if(e.key !== "Enter"){
      setHistory([...history, "$" + command]);
    }
  }


  return (
    <>
      <div className="terminal-head">
        
      </div>
      <div className="terminal-body">
        {history.map(hist => (
          <div>{hist}</div>
        ))}
      </div>
      <div className="input">
        <span>$<input value ={command} onChange={e => setCommand(e.target.value)} onKeyDown={onKeyDown}></input></span>
      </div>
    </>
  );
};

export default Terminal;
