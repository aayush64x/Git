import { get } from "../engine/ObjectStore";
import type { GitCommit } from "../engine/types";

interface InspectorProps {
  selectedSha: string;
}

const Inspector = ({ selectedSha }: InspectorProps) => {
  const commit = get(selectedSha) as GitCommit;

  if (!selectedSha || !commit) {
    return (
      <div className="flex h-[calc(100vh-3.5rem)] flex-col border border-zinc-700 bg-zinc-900 shadow-lg">
        {/* Header */}
        <div className="border-b border-zinc-700 bg-zinc-950 px-4 py-3">
          <h2 className="text-sm font-semibold text-zinc-200">
            Inspector
          </h2>
        </div>

        {/* Empty State */}
        <div className="flex flex-1 items-center justify-center">
          <p className="text-sm text-zinc-500">
            Select a commit to inspect
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col rounded-lg border border-zinc-700 bg-zinc-900 shadow-lg">
      {/* Header */}
      <div className="border-b border-zinc-700 bg-zinc-950 px-4 py-3">
        <h2 className="text-sm font-semibold text-zinc-200">
          Inspector
        </h2>
      </div>

      {/* Content */}
      <div className="flex-1 space-y-5 p-5 text-zinc-100">
        <div>
          <p className="text-xs uppercase tracking-wider text-zinc-400">
            Commit Message
          </p>
          <p className="mt-1 text-base font-medium">{commit.message}</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-zinc-400">
            Author
          </p>
          <p className="mt-1">{commit.author}</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-zinc-400">
            SHA
          </p>
          <code className="mt-1 block break-all rounded bg-zinc-800 p-2 text-sm text-green-400">
            {selectedSha}
          </code>
        </div>

        {commit.parentSha && (
          <div>
            <p className="text-xs uppercase tracking-wider text-zinc-400">
              Parent
            </p>
            <code className="mt-1 block break-all rounded bg-zinc-800 p-2 text-sm text-blue-400">
              {commit.parentSha}
            </code>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inspector;