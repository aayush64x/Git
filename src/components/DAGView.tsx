import { useState } from 'react';
import type { GitEdge, GitNode } from "../engine/types";

interface DagProps {
  nodes : GitNode[]
  edges : GitEdge[]
  onSelectNode : (sha : string) => void
}
const DagView = ({nodes, edges, onSelectNode} : DagProps) => {
  
  console.log(nodes, edges, onSelectNode);
  
  return (
    <div className="h-screen bg-[#e8dfdf] border-l border-gray-800 flex flex-col shadow-2xl">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800 bg-[#aeaaaa]">
        <span className="ml-3 text-sm text-black font-medium">
         DAG View 
        </span>
      </div>
      <div>

      </div>
    </div>
  )
}

export default DagView;