import { GitRepo } from "../engine/GitRepo";
import { useState } from "react";

interface TerminalProps {
  repo: GitRepo;
  onCommand: () => void;
}

const Terminal = ({ repo, onCommand }: TerminalProps) => {
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  const onKeyDown = async (e: React.KeyboardEvent) => {

    const matches = command.match(/"([^"]*)"|\S+/g);

    if(! matches){
      return;
    }

    const str = matches.map(token =>
    token.replace(/^"|"$/g, "")
);

    if (e.key === "Enter") {
      setHistory([...history, "$ " + command]);

      if (str[1]=== "init") {
        await repo.init();
      } else if (str[1] === "add") {
        await repo.add(str[2], str[3]);
      
      } else if (str[1] === "commit") {
        await repo.commit(str[3], "user");
      } else if (str[1] === "log") {

      }
      else if(str[1] === "branch") {
        await repo.branch(str[2]);
      }
      else if(str[1] === "checkout"){
        await repo.checkout(str[2]);
      }
      onCommand();
      setCommand("");
    }
    
  };

  return (
    <div className="w-1/3 h-screen bg-[#0d1117] border-l border-gray-800 flex flex-col shadow-2xl">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800 bg-[#161b22]">

        <span className="ml-3 text-sm text-gray-400 font-medium">
          Git Terminal
        </span>
      </div>

      <div className="terminal-body flex-1 overflow-y-auto p-4 font-mono text-sm text-green-400">
        {history.map((hist, index) => (
          <div key={index} className="mb-1">
            {hist}
          </div>
        ))}
      </div>

      <div className="input border-t border-gray-800 bg-[#161b22] p-4 font-mono text-green-400">
        <div className="flex items-center gap-2">
          <span>$</span>

          <input
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={onKeyDown}
            className="flex-1 bg-transparent outline-none text-green-400 placeholder-gray-600"
            autoComplete="off"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Terminal;