import { Dialog, DialogTitle } from "@mui/material"

// opens the messages currently logged in user has with username
function Messages({ username, open, onClose }) {
    return (
        <Dialog open={open} onClose={onClose} >
            <DialogTitle>{`This is the message with ${username}`}</DialogTitle>
        </Dialog>
    )
}

export default Messages