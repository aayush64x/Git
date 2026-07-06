import { get } from "../engine/ObjectStore";
import type { GitCommit } from "../engine/types";

interface InspectorProps {
  selectedSha: string;
}

const Inspector = ({ selectedSha }: InspectorProps) => {
  const commit = get(selectedSha) as GitCommit;

  if (!selectedSha || !commit) {
    return (
      <div className="flex h-[calc(100vh-3.5rem)] flex-col border-l border-zinc-800 bg-[#0f172a]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 bg-[#111827] px-5 py-3">
          <h2 className="text-sm font-semibold tracking-wide text-zinc-100">
            Inspector
          </h2>

          <span className="text-xs text-zinc-500">
            No Selection
          </span>
        </div>

        {/* Empty State */}
        <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-zinc-700 bg-[#111827]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-9 w-9 text-zinc-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.6}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-6 4h6M8 4h8a2 2 0 012 2v12a2 2 0 01-2 2H8a2 2 0 01-2-2V6a2 2 0 012-2z"
              />
            </svg>
          </div>

          <h3 className="text-lg font-semibold text-zinc-200">
            No Commit Selected
          </h3>

          <p className="mt-2 max-w-xs text-sm leading-6 text-zinc-500">
            Click any commit in the graph to inspect its metadata and object
            information.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col border-l border-zinc-800 bg-[#0f172a]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 bg-[#111827] px-5 py-3">
        <h2 className="text-sm font-semibold tracking-wide text-zinc-100">
          Inspector
        </h2>

        <span className="rounded bg-blue-600/20 px-2 py-1 text-xs font-medium text-blue-300">
          Commit
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5">

        {/* Commit Message */}
        <div className="mb-5 rounded-lg border border-zinc-800 bg-[#111827] p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Commit Message
          </p>

          <p className="text-base font-medium text-zinc-100">
            {commit.message}
          </p>
        </div>

        {/* Author */}
        <div className="mb-5 rounded-lg border border-zinc-800 bg-[#111827] p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Author
          </p>

          <p className="text-zinc-200">
            {commit.author}
          </p>
        </div>

        {/* SHA */}
        <div className="mb-5 rounded-lg border border-zinc-800 bg-[#111827] p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Commit SHA
          </p>

          <code className="block break-all rounded-md bg-[#0b1220] p-3 font-mono text-sm text-green-400">
            {commit.sha}
          </code>
        </div>

        {/* Parent */}
        {commit.parentSha && (
          <div className="rounded-lg border border-zinc-800 bg-[#111827] p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Parent Commit
            </p>

            <code className="block break-all rounded-md bg-[#0b1220] p-3 font-mono text-sm text-blue-300">
              {commit.parentSha}
            </code>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inspector;