import React, { useState, useRef, useEffect } from 'react';
import { Input, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';

const ChatInterface = ({ chatData, onSendMessage }) => {
  const [message, setMessage] = useState('');
  const defaultMessage = "¡Hola!, pregúntame lo que quieras :)";

  const chatContainerRef = useRef(null);

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      onSendMessage(message);
      setMessage('');
    }
  };

  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [chatData]);

  return (
    <div className="chat-interface">
      <div className="chat-container" ref={chatContainerRef}>
        {chatData.length === 0 ? (
          <div className="chat-message chatbot">{defaultMessage}</div>
        ) : (
          chatData.map((item) => (
            <div key={item.key} className={`chat-message ${item.sender === 'user' ? 'user' : 'chatbot'}`}>
              {item.message}
            </div>
          ))
        )}
      </div>
      <div className="input-container">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onPressEnter={handleSendMessage}
          placeholder="Escribe un mensaje..."
          style={{ marginRight: '8px' }}
        />
        <Button onClick={handleSendMessage} icon={<SendOutlined />} type="primary">
          Enviar
        </Button>
      </div>
    </div>
  );
};

export default ChatInterface;