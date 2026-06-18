import { storeBlob, get, storeTree, storeCommit } from './engine/ObjectStore';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    async function test() {
      const blobSha = await storeBlob("hello world")
      const treeSha = await storeTree([
        { mode: '100644', name: 'hello.txt', sha: blobSha }
      ])
      const commitSha = await storeCommit(treeSha, [], 'initial commit', 'Aayush')
      console.log('commit sha:', commitSha)
      console.log('commit object:', get(commitSha))
    }
    test()
  }, [])

  return (
    <>
      <h1>Hello World</h1>
    </>
  )
}

export default App