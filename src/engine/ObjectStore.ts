export async function hashObject(type: string, content : string) : Promise<string>{
  const byteLength : number = new TextEncoder().encode(content).length;
  const str = `${type} ${byteLength}\0${content}`;
  console.log(JSON.stringify(str))
  const bytes = new TextEncoder().encode(str);

  const hashBuffer = await crypto.subtle.digest('SHA-1', bytes);

  const hashArray = Array.from(new Uint8Array(hashBuffer));

  const hex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  return hex;
}
const storage = new Map<string, object>;
export function store (sha: string, obj: object) {
  storage.set(sha, obj);
}

export function get(sha: string ){
  return storage.get(sha);
}
