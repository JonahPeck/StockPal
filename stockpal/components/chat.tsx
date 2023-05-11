import React, { useState } from "react";
import axios from "axios";

const ChatGPT = () => {
  const [article, setArticle] = useState("");
  const [title, setTitle] = useState("");
  const [numLines, setNumLines] = useState(1); // default number of lines
  const [showChat, setShowChat] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const chatResponse = async () => {
    try {
      const messages = chatHistory.map((msg, idx) => {
        const role = idx % 2 === 0 ? "user" : "assistant";
        return { role: role, content: msg };
      });
      // Add the user's current message
      messages.push({ role: "user", content: title });
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: messages,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          },
        }
      );
      const aiResponse = response.data.choices[0].message.content;
      setArticle(aiResponse);
      // Update the chat history
      setChatHistory([...chatHistory, title, aiResponse]);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    chatResponse();
    setTitle(''); // Clear the input after sending the message
  };
  const handleNumLinesChange = (e) => {
    const value = parseInt(e.target.value, 10); // Convert value to number
    setNumLines(value);
  };
  const handleToggleChat = () => {
    setShowChat(!showChat);
  };
  return (
    <div style={{
      paddingRight: "20vw",
      marginRight: "20vw",
    }}>
      <button
        onClick={handleToggleChat}
        style={{
          marginBottom: "10px",
          fontSize: "16px",
          padding: "8px 12px",
          borderRadius: "15px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          cursor: "pointer",
          transition: "all 0.5s ease",
          background: showChat ? "#4CAF50" : "#4CAF50",
          color: "#fff",
        }}
      >
        {showChat ? "Close Chat" : "Open Chat"}
      </button>
      {showChat && (
        <div
          style={{
            transition: "opacity 0.5s, transform 0.5s",
            opacity: showChat ? 1 : 0,
            transform: showChat ? "translateY(0)" : "translateY(20px)",
            boxShadow: "0px 3px 3px 0px rgba(0, 0, 0, .15)",
            width: "50vw",
            height: "25vh",
            overflow: "auto",
            padding: "10px",
            margin: "10px",
            marginBottom: "5vh",
            marginRight: "12vw",
            marginLeft: "6vw",
            paddingRight: "7vw",
            paddingLeft: "7vw",
            borderRadius: "20px",
            color: "#1E3A8A",
            background: "#F4F4F4",
            fontSize: "20px",
          }}
        >
          <div className="chat-messages-container mb-2">
            {chatHistory.map((msg, index) => {
              const role = index % 2 === 0 ? "user" : "assistant";
              const textAlign = role === "user" ? "right" : "left";
              const backgroundColor = role === "user" ? "#E6E6E6" : "#F4F4F4";
              const color = role === "user" ? "#1E3A8A" : "#333";
              return (
                <div
                  key={index}
                  style={{
                    paddingRight: "20vw",
                    paddingLeft: "20vw",
                    borderRadius: "15px",
                    padding: "8px",
                    margin: "6px 0",
                    textAlign,
                    color,
                    background: backgroundColor,
                    border: "1px solid #ccc",
                  }}
                >
                  <span style={{ color }}>
                    {msg}
                  </span>
                </div>
              );
            })}
          </div>
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="chatInput"
              style={{
                display: "block",
                marginBottom: "6px",
                fontWeight: "bold",
                color: "#4CAF50",
              }}
            >
              Type Anything Here
            </label>
            <textarea
              id="chatInput"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              rows={numLines}
              style={{
                width: "100%",
                marginBottom: "10px",
                padding: "8px",
                fontSize: "20px",
                resize: "none",
                border: "1px solid #ccc",
                borderRadius: "10px",
                color: "#1E3A8A",
                background: "#F4F4F4",
              }}
            />
            <button
              type="submit"
              style={{
                fontSize: "16px",
                padding: "8px 12px",
                borderRadius: "15px",
                border: "none",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                background: "#4CAF50",
                color: "#fff",
              }}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
export default ChatGPT;