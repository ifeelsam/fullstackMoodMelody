import { useState } from 'react'
import './App.css'

function App() {
  const [mood, setMood] = useState("how're you feeling?")

  return (
    <>
      <h1 className='text-3xl'>Mood Melody</h1>
      <div className=' mx-3 px-3 rounded-full my-6'>
        <input type="text" id="search" placeholder={mood} className='px-3 rounded-2xl bg-transparent'></input> 
        <button id="render" className='bg-green-600 px-4 mx-3 rounded-2xl '>Search</button>
      </div>
      <div id="output"></div>
    </>
  )
}

export default App