import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import queryString from 'query-string';
import "./index.css"
import { useLocation } from 'react-router-dom';
import InfoBar from '../infoBar';
import Input from '../input'
import Message from '../message';
let socket;
const Chat = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [username, setUsername] = useState('');
  const [message,setMessage] = useState('')
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'localhost:4000';
  const location = useLocation();
  useEffect(() => {
    const { room, name,username } = queryString.parse(location.search);
    socket = io(ENDPOINT);
    setName(name);
    setRoom(room);
    console.log(socket);
    socket.emit('join', { name, room ,username}, () => {
      return () => {
        socket.emit('disconnect');
        socket.off();
      };
    });
  }, [ENDPOINT, location.search]);

  useEffect(()=>{
    socket.on('message',(message)=>{
      setMessages([...messages,message])
    })
  },[messages]);
const sendMessage = (event)=>{
  event.preventDefault()
  if(message){
    console.log(message)
    socket.emit('sendMessage',message,()=>setMessage())
  }
  console.log(message,messages)
}
  return <>
    <div className="outerContainer">
      <div className="container">
      <InfoBar room={room}/>
      <Message messages = {messages}/>
        <Input props = {{message,sendMessage,setMessage}}/>
      </div>
    </div>
  </>
};

export default Chat;
