import { createBlob } from "./Blob";
import type { GitBlob } from "./types";

export async function hashObject(type: string, content : string) : Promise<string>{
  const byteLength : number = new TextEncoder().encode(content).length;
  const str = `${type} ${byteLength}\0${content}`;
  const bytes = new TextEncoder().encode(str);

  const hashBuffer = await crypto.subtle.digest('SHA-1', bytes);

  const hashArray = Array.from(new Uint8Array(hashBuffer));

  const hex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  return hex;
}


const objects = new Map<string, object>;
export function store (sha: string, obj: object) {
  objects.set(sha, obj);
}

export function get(sha: string ){
  return objects.get(sha);
}

export async function storeBlob(content: string) : Promise<string>{
  const blob : GitBlob = createBlob(content);
  const sha = await hashObject('blob', content);
  store(sha, blob);
  return sha; 
}