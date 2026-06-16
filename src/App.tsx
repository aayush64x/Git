import { hashObject, storeBlob, get } from './engine/ObjectStore';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
  async function test() {
    const sha = await storeBlob("hello world")
    console.log(sha)
    console.log(get(sha))
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
