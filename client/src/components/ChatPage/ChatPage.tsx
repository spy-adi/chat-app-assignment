// MessageArea.tsx
import React from 'react';

const ChatPage: React.FC = () => {
  return (
    <div className="row" id="message-area">
      <div className="large-8 columns small-centered">
        <h2>Socket.io Chat App</h2>
        <div className="chat-wrap">
          <div className="top">
            <h5 className="room-title"></h5>
          </div>
          <div id="messages"></div>
          <form id="message-form">
            <div className="input-group">
              <input type="text" placeholder="Type message here" className="input-group-field" name="message" />
              <div className="input-group-button">
                <input type="submit" value="Send" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
