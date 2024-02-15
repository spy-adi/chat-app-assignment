export interface Message {
    room: string;
    author: string;
    message: string;
    time: string;
}
  
export interface JoinChatProps {
    onJoin: (username: string, room: string) => void;
}
  
export interface AppWrapperProps {
    children: React.ReactNode;
}
  
export interface Message {
    room: string;
    author: string;
    message: string;
    time: string;
}

import {Socket} from "socket.io-client"
  
export interface ChatProps {
    socket: Socket;
    username: string;
    room: string;
}