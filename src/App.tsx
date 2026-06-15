import { hashObject } from './engine/ObjectStore';
import { useEffect } from 'react';

function App() {
  useEffect(() =>{
    console.log(hashObject('blob', 'hello'));
  }, []);
  return (
    <>
     <h1>Hello World</h1> 
    </>
  )
}

export default App
