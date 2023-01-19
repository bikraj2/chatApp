import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import './index.css'
const Join = () => {
  const [name,setName] = useState('')
  const [room,setRoom] = useState('')
  const [username,setUsername] = useState('')
  return (
    <div className='joinOuterContainer'>
      <div className='joinInnerContainer'>
        <h1 className='heading'>Join</h1>
        <div>
          <input
            type='text'
            className='joinInput'
            placeholder='Name'
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </div>
        <div>
          <input
            type='text'
            className='joinInput mt-20'
            placeholder='Room'
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
        </div>
        <div>
          <input
            type='text'
            className='joinInput mt-20'
            placeholder='Username'
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </div>
        <Link
          to={`/chat?name=${name}&room=${room}&username=${username}`}
          onClick={(event) => (!name || !room || !username? event.preventDefault() : null)}
        >
          <button className='button mt-20' type='submit'>
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Join
