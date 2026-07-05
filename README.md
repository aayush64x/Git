# Git Internals Visualizer

A browser-based Git internals visualizer that implements Git's complete object model from scratch in TypeScript. Type real Git commands in a terminal and watch a live commit DAG animate in real time.

🔗 **[Live Demo](https://git-nu-two.vercel.app)**

## What makes this different

Most Git visualizers are animations on top of fake data. This one implements the actual Git object model:

- **SHA-1 content addressing** — every blob, tree, and commit is hashed using the same format as real Git. The SHA output matches `git hash-object` byte-for-byte.
- **Binary tree serialization** — tree objects are serialized in Git's binary format (mode + name + null byte + 20 raw SHA bytes), not a simplified string representation.
- **DAG traversal** — `getGraph()` uses a stack-based traversal with a visited Set to collect all commits reachable from any branch tip, handling diverged histories correctly.
- **Full ref system** — branches and HEAD are tracked in a RefStore, exactly mirroring Git's `.git/refs/` structure.

## Commands
git init
git add <filename> <content>
git commit -m "<message>"
git branch <name>
git checkout <name>
git log

## Tech Stack

- **TypeScript** — Git engine with zero dependencies
- **React + Vite** — UI
- **Tailwind v4** — styling
- **crypto.subtle** — browser-native SHA-1

## Architecture
src/
engine/          # Pure TypeScript Git implementation
ObjectStore.ts # Content-addressed storage, SHA-1 hashing
GitRepo.ts     # High-level Git operations
RefStore.ts    # Branches and HEAD
Layout.ts      # DAG layout algorithm
components/
Terminal.tsx   # Command input and history
DAGView.tsx    # SVG commit graph
Inspector.tsx  # Raw object viewer

## How it works

1. User types a command in the Terminal
2. Command parser calls the engine method on `GitRepo`
3. Engine hashes and stores objects in the ObjectStore
4. `getGraph()` traverses all branch tips via BFS, producing nodes and edges
5. DAGView renders the graph as SVG
6. Clicking a node shows raw object data in the Inspector

## Running locally

```bash
npm install
npm run dev
```

## Author

Aayush Nakarmi — [github.com/aayush64x](https://github.com/aayush64x)
