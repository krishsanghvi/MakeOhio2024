import React, { useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';

const API_KEY = ""; // Replace with your actual API key

const MyChatbot = ({ isVisible }) => {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I am your safety assistant: notifI",
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);

  const handleSendRequest = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user",
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setIsTyping(true);

    try {
      const response = await processMessageToChatGPT([...messages, newMessage]);
      const content = response.choices[0]?.message?.content;
      if (content) {
        const chatGPTResponse = {
          message: content,
          sender: "ChatGPT",
        };
        setMessages((prevMessages) => [...prevMessages, chatGPTResponse]);
      }
    } catch (error) {
      console.error("Error processing message:", error);
    } finally {
      setIsTyping(false);
    }
  };

  async function processMessageToChatGPT(chatMessages) {
    const apiMessages = chatMessages.map((messageObject) => {
      const role = messageObject.sender === "Notif" ? "assistant" : "user";
      return { role, content: messageObject.message };
    });

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: "I'm a Student using ChatGPT for learning" }, ...apiMessages],
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    });

    return response.json();
  }

  if (!isVisible) {
    return null; // Do not render anything if not visible
  }

  return (
    <div className="fixed bottom-[80px] left-2 md:left-2 lg:left-2 xl:left-2 2xl:left-2 w-60 z-50 bg-white shadow-lg rounded-lg p-4">
      <MainContainer className="flex flex-col h-[80vh] md:h-[75vh] lg:h-[70vh] max-h-[500px] overflow-hidden">
        <ChatContainer className="flex flex-col w-full h-full">
          <MessageList
            className="flex-grow overflow-y-auto"
            scrollBehavior="smooth"
            typingIndicator={isTyping ? <TypingIndicator content="notifI is typing" /> : null}
          >
            {messages.map((message, i) => (
              <Message key={i} model={{
                message: message.message,
                direction: message.direction === 'outgoing' ? 'outgoing' : 'incoming',
                position: message.sender === "ChatGPT" ? 'single' : 'normal'
              }}
                className={`p-3 my-2 rounded-lg max-w-xs mx-3 ${message.direction === 'outgoing' ? 'message-outgoing' : 'message-incoming'}`}
              />
            ))}
          </MessageList>
          <MessageInput placeholder="Send a Message" onSend={handleSendRequest} className="mt-auto" />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default MyChatbot;
