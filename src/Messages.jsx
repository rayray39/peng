import { Box, Stack, Button, TextField } from "@mui/material"
import { useParams } from "react-router-dom"
import { useUser } from "./UserContext";
import { useState } from "react";

// opens the messages currently logged in user has with username
function Messages() {
    const { username } = useParams();
    const { currentUser } = useUser();

    const [messages, setMessages] = useState([]);               // past messages from database
    const [messageContent, setMessageContent] = useState('');   // newly sent message
    const [displayMessages, setDisplayMessages] = useState([]);

    const handleMessageContent = (event) => {
        setMessageContent(event.target.value);
    }

    const fetchMessages = async () => {
        console.log('fetching messages');

        // const token = localStorage.getItem('authToken');

        // const response = await fetch('http://localhost:5000/get-all-messages', {
        //     method:'GET',
        //     headers:{
        //         'Content-Type':'application/json',
        //         'Authorization':`Bearer ${token}`
        //     },
        //     body:JSON.stringify({
        //         currentUser, username
        //     })
        // })

        // const data = await response.json();

        // if (!response.ok) {
        //     console.log(data.error);
        //     return;
        // }

        // console.log(data.message);
        // setMessages(data.messages);
        // setDisplayMessages(data.messages);
    }

    const sendMessage = async () => {
        // saves the sent message in the database
        console.log(`sending message to ${username}: ${messageContent}`);

        // const token = localStorage.getItem('authToken');

        // const response = await fetch('http://localhost:5000/send-message', {
        //     method:'POST',
        //     headers:{
        //         'Content-Type':'application/json',
        //         'Authorization':`Bearer ${token}`
        //     },
        //     body:JSON.stringify({
        //         currentUser, username, messageContent
        //     })
        // })

        // const data = await response.json();

        // if (!response.ok) {
        //     console.log(data.error);
        //     return;
        // }

        // console.log(data.message);
        setDisplayMessages((prev) => [...prev, messageContent]);
        setMessageContent('');
        document.getElementById('message-textfield')?.blur();   // clear the textfield after message sent
    }

    return (
        <Stack direction={"column"} sx={{
            // border:'1px solid black', 
            width:'500px',
            margin:'auto'
        }}>
            <h3>{`${username} ❣️`}</h3>

            <Stack sx={{border:'1px solid black', height:'300px'}} spacing={1}>
                {
                    displayMessages ? 
                    displayMessages.map((message, index) => (
                        <MessageBubble message={message} key={index} />
                    )) :
                    null
                }
            </Stack>

            <TextField id="message-textfield" variant="filled" value={messageContent} onChange={handleMessageContent} />

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
        </Stack>
    )
}

function MessageBubble({ message }) {
    return (
        <Box sx={{
            backgroundColor:'orange',
            color:'white',
            borderRadius:'6px',
            width:'50%',
            textAlign:'start',
        }}>
            {message}
        </Box>
    )
}

export default Messages