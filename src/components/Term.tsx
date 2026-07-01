import type { GitRepo } from "../engine/GitRepo"
import { useState } from "react"

interface TerminalProps {
  repo : GitRepo
  onCommand : () => void
  // two props
}

const Terminal = ({repo, onCommand}: TerminalProps) => {
  // two state variables
  const [history, setHistory] = useState<string[]>([]);
  const [command, setCommand] = useState("");

  const onKeyDown = async (e: React.KeyboardEvent) => {
    if (e.type !== "Enter") return; 


    if(e.type === "Enter"){

    }
    // check if Enter
    // parse command
    // run repo method
    // update history
    // call onCommand
    // clear input
  }


  return (
    // header
    <div className="w-1/3 h-screen bg-[#0d1117] border-l border-gray-800 flex flex-col shadow-2xl">
      <div>

      </div>
      <div>

      </div>
      <div className="flex items-center gap-2">
        <span>$</span>
        <input
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyDown={onKeyDown}
          className="flex-1 bg-transparent outline-none text-green-400"
          autoComplete="off"
          spellCheck={false}
          autoFocus
        />
      </div>
    </div>
    // scrollable history
    // input row
  )
}

export default Terminal