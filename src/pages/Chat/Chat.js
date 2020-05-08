import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import './Chat.css'
import InfoBar from '../../components/InfoBar/InfoBar'
import Input from '../../components/Input/Input'
import Messages from '../../components/Messages/Messages'

let socket

const Chat = ({ location }) => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([ ])

    const ENDPOINT = 'localhost:5000'


    useEffect(() => {
        const { name, room } = queryString.parse(location.search)

        socket = io(ENDPOINT)

        setName(name)
        setRoom(room)

        socket.emit('join', {name, room}, () => {
           
        })

        return () => {
            socket.emit('disconnect', name)

            socket.off()
        }

        
    }, [ENDPOINT, location.search])

    const sendMessage = (event) => {
        event.preventDefault()

        console.log(messages)

        if(message){
            socket.emit('sendMessage', message, () => {
                setMessage('')
            })
        }
    }

    useEffect(() => {
        socket.on('message', message => {
          setMessages(messages => [ ...messages, message ]);
        });
        
        // socket.on("roomData", ({ users }) => {
        //   setUsers(users);
        // });
    }, []);


    console.log(messages, message)

    return(
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
                
            </div>
        </div>
    )
}

export default Chat
