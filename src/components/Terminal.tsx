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
    if (e.key !== "Enter") return;

    const matches = command.match(/"([^"]*)"|\S+/g);
    if (!matches) return;

    const str = matches.map((token) => token.replace(/^"|"$/g, ""));

    let response = "unknown command";

    if (str[1] === "init") {
      await repo.init();
      response = "Initialized empty repository";
    } else if (str[1] === "add") {
      await repo.add(str[2], str[3]);
      response = `staged ${str[2]}`;
    } else if (str[1] === "commit") {
      const sha = await repo.commit(str[3], "Aayush");
      response = `[main] ${sha.slice(0, 7)} ${str[3]}`;
    } else if (str[1] === "branch") {
      await repo.branch(str[2]);
      response = `created branch ${str[2]}`;
    } else if (str[1] === "checkout") {
      repo.checkout(str[2]);
      response = `switched to branch ${str[2]}`;
    } else if (str[1] === "log") {
      const commits = await repo.log();

      response = commits
        .map((c) => `${c.treeSha.slice(0, 7)}  ${c.message}`)
        .join("\n");
    }

    setHistory((h) => [...h, "$ " + command, response]);
    onCommand();
    setCommand("");
  };

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col border-r border-zinc-800 bg-[#0f172a]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 bg-[#111827] px-5 py-3">
        <h2 className="text-sm font-semibold tracking-wide text-zinc-100">
          Git Terminal
        </h2>

        <div className="flex items-center gap-1">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
        </div>
      </div>

      {/* Terminal Output */}
      <div className="flex-1 overflow-y-auto bg-[#0b1220] px-5 py-4 font-mono text-[14px] leading-7">
        {history.length === 0 && (
          <div className="mb-3 text-zinc-500">
            Type <span className="text-blue-400">git init</span> to begin.
          </div>
        )}

        {history.map((line, index) => {
          const isCommand = line.startsWith("$");

          return (
            <div
              key={index}
              className={`whitespace-pre-wrap wrap-break-words ${
                isCommand ? "text-white" : "text-green-400"
              }`}
            >
              {isCommand ? (
                <>
                  <span className="mr-2 text-blue-400">$</span>
                  {line.slice(2)}
                </>
              ) : (
                line
              )}
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="border-t border-zinc-800 bg-[#111827] px-5 py-4">
        <div className="flex items-center gap-3 font-mono text-sm">
          <span className="text-blue-400">$</span>

          <input
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={onKeyDown}
            className="flex-1 bg-transparent text-white outline-none placeholder:text-zinc-500"
            placeholder="git commit -m &quot;Initial commit&quot;"
            autoComplete="off"
            spellCheck={false}
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};

export default Terminal;