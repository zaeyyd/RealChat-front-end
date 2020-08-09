import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./Chat.css";
import InfoBar from "../../components/InfoBar/InfoBar";
import Input from "../../components/Input/Input";
import Messages from "../../components/Messages/Messages";

let socket;

let currentMessages = [];

let messageIndex;

let open = {};

let userName;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const ENDPOINT = "https://realchat-0.herokuapp.com";
  //const ENDPOINT = 'http://localhost:5000'

  // logic when user joins a chat room
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    userName = name;

    socket.emit("join", { name, room }, () => {});

    return () => {
      socket.emit("disconnect", name);

      socket.off();
    };
  }, [ENDPOINT, location.search]);


  // logic when a user presses "Send"
  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      console.log(message);
      socket.emit("sendMessage", message, () => {
        setMessage("");
      });
    }
  };

  // !! logic that renders letters that are being typed in real-time !!
  const updateMessages = (message) => {
    if (message.text.length >= 1 && !open[message.user]) {

      messageIndex = currentMessages.length;
      console.log(messageIndex);
      setMessages([...currentMessages, message]);
      open[message.user] = true;
    } 
    
    else if (message.text.length < 1 && open[message.user]) {
      message.text.trim();
      currentMessages.pop();
      setMessages([...currentMessages]);
      open[message.user] = false;
    } 

    else if (open[message.user]) {
      message.text.trim();

      currentMessages.reverse();

      let msg = currentMessages.find((msg) => {
        console.log(msg);
        console.log(userName);
        if (msg.user === message.user) return msg;
      });

      currentMessages[currentMessages.indexOf(msg)] = message;

      currentMessages.reverse();

      console.log(currentMessages);
      setMessages([...currentMessages]);
    }
  };

  // web-socket event when a modification in the local message (message that user is typing) is detected
  useEffect(() => {
    socket.emit("showMessage", message, () => {});
  }, [message]);

  currentMessages = messages;

  // web-socket event that 
  useEffect(() => {
    socket.on("liveEdit", (message) => {
    updateMessages(message);
    });
  }, []);

  useEffect(() => {
    socket.on("message", (message) => {
      if (message.text.trim() !== "") {
        setMessages((messages) => [...messages, message]);
      }
    });
  }, []);

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
