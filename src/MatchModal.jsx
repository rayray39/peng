import { Modal, Box, Typography, Button } from "@mui/material"

function MatchModal({ open, close }) {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#FFDEAD',
        boxShadow: 24,
        borderRadius: 2,
        p: 4,
        display:'flex',
        alignItems:'center',
        flexDirection:'column'
      };

    return (
        <Modal
            open={open}
            onClose={close}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    It's A Match! 💞
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Sent a message or continue swiping.
                </Typography>

                <Button variant="outlined" disableElevation size="medium"
                        sx={{color:'orange', borderColor:'orange',
                            "&:hover": {
                                backgroundColor: "orange",
                                color: 'white',
                            },
                            marginTop:'20px'
                        }}>
                    Sent Message
                </Button>
            </Box>
        </Modal>
    )
}

export default MatchModal