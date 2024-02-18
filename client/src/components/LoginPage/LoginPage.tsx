import React, { useState } from 'react';
import "./LoginPage.css";
import io from "socket.io-client";
import ChatPage from '../ChatPage/ChatPage';

const socket = io("http://localhost:8080");

const LoginPage: React.FC = () => {
  const [userName,setUserName] = useState<string>("");
  const [room,setRoom] = useState<string>("");
  const [showChat, setShowChat] = useState<boolean>(false);

   // Function to handle form submission
   const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:');
    console.log(userName);
    console.log(room);
    if (userName !== "" && room !== "") {
      socket.emit("join_room",{ room, username:userName});
      setShowChat(true);
    }else{
      alert("Please provide a valid username or room name");
    }
  };

  return (
    <>
    {!showChat?
      (<div className="container">
      <h2 className='text-center'>Join/Create Room</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          
          <input 
            type="text" 
            className="form-control" 
            id="room" 
            placeholder="Enter a user name" 
            onChange={(e:any) => setUserName(e.target.value)}
            />
        </div>

        <div className="form-group">
          <label htmlFor="room">Room</label>
          <input 
            type="text" 
            className="form-control" 
            id="room" 
            placeholder="Enter a chat room name" 
            onChange={(e:any) => setRoom(e.target.value)}
            />
        </div>

        <button 
          type="submit"
          className="btn btn-success"
        >
          Join Room
        </button>
      </form>
    </div>):(
      <ChatPage socket={socket} username={userName} room={room} />
    )}
</>
  );
};

export default LoginPage;
