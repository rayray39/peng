import { Box, Stack } from "@mui/material"
import { useParams } from "react-router-dom"

// opens the messages currently logged in user has with username
function Messages() {
    const { username } = useParams();

    return (
        <Stack direction={"column"} sx={{
            border:'1px solid black', 
            width:'500px',
            margin:'auto'
        }}>
            <h2>{`This is the message with ${username}`}</h2>

            <Stack sx={{border:'1px solid black'}}>
                <h1>some other message</h1>
            </Stack>
        </Stack>
    )
}

export default Messages