import React, { useState } from "react";
import { styled} from '@mui/material'
import axios from 'axios';
import ChatInterface from "./ChatInterface";

const FloatingButtonWrapper = styled('button')(() => ({
    ":hover": {color: '#fff', background: '#0069d9'},
    transition: 'all 0.3s ease-in-out',
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    background: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    cursor: 'pointer',
    zIndex: 999,
}));

const ChatContainer = styled('div')(({ theme, isOpen }) => ({
    border: '1px solid #ccc',
    borderRadius: '16px',
    position: 'fixed',
    bottom: '85px',
    right: '40px', 
    width: '400px',
    height: isOpen ? '704px' : '80px',
    backgroundColor: '#fff',
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 5px 40px',
    zIndex: 1001,
    display: 'flex',
    flexDirection: 'column',
    opacity: isOpen ? 1 : 0,
    maxHeight: isOpen ? '700px' : '80px',
    transform: isOpen ? 'scale(1)' : 'scale(0.8)',
    transformOrigin: 'right bottom',
    transition: `width 200ms ease, height 300ms ease, max-height 300ms ease, transform 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 83ms ease-out`,
}));

const ChatHeader = styled('div')(() => ({
    padding: '10px',
    borderBottom: '1px solid #ccc',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));

const FloatingButton = ({ onClick }) => {
    const [isChatVisible, setChatVisible] = useState(false);
    const [chatData, setChatData] = useState([]);
    const toggleChatVisibility = () => {
    setChatVisible((prevState) => !prevState);

    const handleSendMessage = async (message) => {
        if (message.trim() !== '') {
        // Agregar el mensaje del usuario a la lista de mensajes antes de enviar la solicitud -- Esto es para que el usuario pueda ver su mensaje en la interfaz de chat >:D
        const newMessage = {
            key: Date.now(),
            sender: 'user',
            message: message,
        };
        setChatData((prevData) => [...prevData, newMessage]);
    
        const url = process.env.REACT_APP_FILES_GENERAL_DOMAIN+'query';
        const token = localStorage.getItem('token');
        const secretToken = process.env.REACT_APP_CREATE_SECRET_TOKEN;
    
        const headers = {
            Authorization: `Bearer ${token}`,
            token: secretToken,
        };
    
        const params = {
            chatbot_id: 'EtHMe8Z4APPMoObxvleV',
            query: message, // El mensaje del usuario se pasa como query XD
        };
    
        try {
            const response = await axios.get(url, { headers, params });
            if (response.status === 200) {
            // Agregar la respuesta del chatbot a la lista de mensajes
            const botResponse = response.data.response;
            const newBotMessage = {
                key: Date.now(),
                sender: 'chatbot',
                message: botResponse,
            };
            setChatData((prevData) => [...prevData, newBotMessage]);
            } else {
            // Manejar el error en caso de que la solicitud no sea exitosa
            console.error('Error:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
        }
    };
};
    return (
        <div>
            <FloatingButtonWrapper onClick={toggleChatVisibility}>
                +
            </FloatingButtonWrapper>
            <ChatContainer isOpen={isChatVisible}>
                {isChatVisible ? (
                <>
                    <ChatHeader>
                    <h2>AI-CHAIN</h2> 
                    </ChatHeader>
                    <ChatInterface chatData={chatData} onSendMessage={handleSendMessage} />
                </>
                ) : (                
                <div>¿En qué te podemos ayudar? :)</div>
                )}
            </ChatContainer>
        </div>
    );
};

export default FloatingButton;
