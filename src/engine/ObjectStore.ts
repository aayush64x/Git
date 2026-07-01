import { createBlob } from "./Blob";
import { createCommit } from "./Commit";
import { createTree } from "./Tree";
import type { GitBlob, GitTree, TreeEntry, GitCommit, GitEdge } from "./types";

export async function hashObject(type: string, content: string): Promise<string> {
  const byteLength: number = new TextEncoder().encode(content).length;
  const str = `${type} ${byteLength}\0${content}`;
  const bytes = new TextEncoder().encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-1', bytes);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

const objects = new Map<string, object>();

export function store(sha: string, obj: object) {
  objects.set(sha, obj);
}

export function get(sha: string) {
  return objects.get(sha);
}

export async function storeBlob(content: string): Promise<string> {
  const blob: GitBlob = createBlob(content);
  const sha = await hashObject('blob', content);
  store(sha, blob);
  return sha;
}

export async function storeTree(entries: TreeEntry[]): Promise<string> {
  const newArr = [];
  for (const entry of entries) {
    const shaBytes = hexToBytes(entry.sha);
    const str = `${entry.mode} ${entry.name}\0`;
    const strBytes = new TextEncoder().encode(str);
    const arr = concatBytes(strBytes, shaBytes);
    newArr.push(arr);
  }
  const contentBytes = mergeUint8Arrays(newArr);
  const header = `tree ${contentBytes.length}\0`;
  const headerBytes = new TextEncoder().encode(header);
  const fullBytes = concatBytes(headerBytes, contentBytes);
  const hashBuffer = await crypto.subtle.digest('SHA-1', fullBytes.buffer as ArrayBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  const tree: GitTree = createTree(entries);
  store(hex, tree);
  return hex;
}

function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
  }
  return bytes;
}

function concatBytes(a: Uint8Array, b: Uint8Array): Uint8Array {
  const result = new Uint8Array(a.length + b.length);
  result.set(a, 0);
  result.set(b, a.length);
  return result;
}

function mergeUint8Arrays(arrays: Uint8Array[]): Uint8Array {
  const totalLength = arrays.reduce((sum, a) => sum + a.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const arr of arrays) {
    result.set(arr, offset);
    offset += arr.length;
  }
  return result;
}


export async function storeCommit(
  treeSha: string,
  parentShas: string[],
  message: string,
  author: string
): Promise<string> {
  const timeStamp = Date.now();
  const parentLines = parentShas.map(sha => `parent ${sha}\n`).join('')
  const content = `tree ${treeSha}\n${parentLines}author ${author} ${timeStamp}\ncommitter ${author} ${timeStamp}\n\n${message}`
  const commit: GitCommit = createCommit(treeSha, parentShas, message, author, timeStamp);
  const commitHash = await hashObject('commit', content);
  store(commitHash, commit);
  return commitHash;
}

export function getDepth(sha : string, edges: GitEdge[]): number{
  let parent : string|null = sha; 
  let depth : number = 0; 
  while (parent !== null){
    for(const{from, to} of edges){
      if (from === parent){
        parent = to; 
        depth +=1 ; 
      }
      else{
        parent = null; 
      }
    }
  }
  return depth; 
}