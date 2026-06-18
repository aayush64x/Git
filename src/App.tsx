import { storeBlob, get, storeTree } from './engine/ObjectStore';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
  async function test() {
    const sha1 = await storeBlob("hello")
    const sha2 = await storeBlob("world")
    const treeSha = await storeTree([
  { mode: '100644', name: 'hello.txt', sha: sha1 },
  { mode: '100644', name: 'world.txt', sha: sha2 }
])
  console.log(treeSha)
  }
  test();
  
}, [])
  return (
    <>
     <h1>Hello World</h1> 
    </>
  )
}

export default App
