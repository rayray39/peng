import { Box } from "@mui/material"
import { useParams } from "react-router-dom"

// opens the messages currently logged in user has with username
function Messages() {
    const { username } = useParams();

    return (
        <Box>
            <h2>{`This is the message with ${username}`}</h2>
        </Box>
    )
}

export default Messages