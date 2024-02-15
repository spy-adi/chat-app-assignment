// appUtilities.ts
import React from "react";
import io from "socket.io-client";
import LoginPage from "./components/LoginPage/LoginPage";
import { AppWrapperProps } from "./utility/utility";

const socket = io("http://localhost:8080");


export const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  return <div className="App">{children}</div>;
};

const App: React.FC = () => {
  const [showChat, setShowChat] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [room, setRoom] = React.useState("");

  const handleJoin = (enteredUsername: string, enteredRoom: string) => {
    setUsername(enteredUsername);
    setRoom(enteredRoom);
    setShowChat(true);
  };

  return (
    <AppWrapper>
      {!showChat ? (
        <LoginPage onJoin={handleJoin} />
      ) : (
        <></>
      )}
    </AppWrapper>
  );
};

export default App;