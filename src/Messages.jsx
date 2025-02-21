import { Box, Stack, Button, TextField } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import { useUser } from "./UserContext";
import { useEffect, useRef, useState } from "react";

// opens the messages currently logged in user has with username
function Messages() {
    const navigate = useNavigate();
    const { username } = useParams();
    const { currentUser } = useUser();

    const [messages, setMessages] = useState([]);               // past messages from database
    const [messageContent, setMessageContent] = useState('');   // newly sent message
    const [displayMessages, setDisplayMessages] = useState([]);

    const messagesEndRef = useRef(null);

    useEffect(() => {
        // Scroll to the bottom when displayMessages change
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [displayMessages]);

    useEffect(() => {
        fetchMessages();
    }, [])

    const handleMessageContent = (event) => {
        setMessageContent(event.target.value);
    }

    const fetchMessages = async () => {
        // get all the messages between currentUser and user with username
        console.log('fetching messages');

        const token = localStorage.getItem('authToken');

        const response = await fetch('http://localhost:5000/get-all-messages', {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
            body:JSON.stringify({
                currentUser, username
            })
        })

        const data = await response.json();

        if (!response.ok) {
            console.log(data.error);
            return;
        }

        console.log(data.message);
        setMessages(data.messages);
        setDisplayMessages(data.messages);
    }

    const sendMessage = async () => {
        // saves the sent message in the database
        console.log(`sending message to ${username}: ${messageContent}`);

        const token = localStorage.getItem('authToken');

        const response = await fetch('http://localhost:5000/send-message', {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
            body:JSON.stringify({
                currentUser, username, messageContent
            })
        })

        const data = await response.json();

        if (!response.ok) {
            console.log(data.error);
            return;
        }

        console.log(data.message);
        setDisplayMessages((prev) => [...prev, {content: messageContent, sender: currentUser.username}]);
        setMessageContent('');
        document.getElementById('message-textfield')?.blur();   // clear the textfield after message sent
    }

    const goBack = () => {
        console.log('go back button clicked');
        navigate('/people')
    }

    return (
        <Stack direction={"column"} sx={{
            // border:'1px solid black', 
            width:'500px',
            margin:'auto'
        }}>
            <h3>{`${username} ❣️`}</h3>

            <Stack sx={{height:'300px', overflow:'auto', marginBottom:'4px'}} spacing={1}>
                {
                    displayMessages.map((message, index) => (
                        message.sender === currentUser.username ?
                            <MessageBubble message={message.content} alignment={'flex-end'} bgColor={'orange'} key={index} /> :
                            <MessageBubble message={message.content} alignment={'flex-start'} bgColor={'black'} key={index} />
                    ))
                }

                <div ref={messagesEndRef} />
            </Stack>

            <TextField id="message-textfield" variant="filled" value={messageContent} onChange={handleMessageContent} autoFocus />

            <Button onClick={sendMessage} variant="outlined" disableElevation
                sx={{
                    color:'white',
                    backgroundColor:'orange',
                    borderColor:'orange',
                    marginTop:'10px'
                }}
            >
                Send
            </Button>

            <Button sx={{
                backgroundColor:'orange',
                color: 'white',
                height: '50px',
                position: 'fixed',
                bottom: '5px',
                left: '50%', 
                transform: 'translateX(-50%)',
            }} onClick={goBack}>
                BACK
            </Button>
        </Stack>
    )
}

// display message content inside a bubble
function MessageBubble({ message, alignment, bgColor }) {
    // alignment = flex-end -> current user is sender
    // alignment = flex-start -> receiving messages
    return (
        <Box sx={{
            backgroundColor: bgColor,
            color:'white',
            borderRadius:'6px',
            width:'40%',
            textAlign:'start',
            alignSelf: alignment
        }}>
            {message}
        </Box>
    )
}

export default Messages