import { Box, Stack, Button, TextField } from "@mui/material"
import { useParams } from "react-router-dom"
import { useUser } from "./UserContext";

// opens the messages currently logged in user has with username
function Messages() {
    const { username } = useParams();
    const { currentUser } = useUser();

    const fetchMessages = async () => {
        console.log('fetching messages');
    }

    const sendMessage = async () => {
        console.log('sending message');
    }

    return (
        <Stack direction={"column"} sx={{
            // border:'1px solid black', 
            width:'500px',
            margin:'auto'
        }}>
            <h3>{`${username} ❣️`}</h3>

            <Stack sx={{border:'1px solid black', height:'300px'}}>
                message content
            </Stack>

            <TextField variant="filled" sx={{
                
            }}/>
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

export default Messages