import { Box, Card, CardContent, Typography } from "@mui/material";

function Review() {
    return (
        <Box sx={{
            position: 'absolute',
            bottom: 0, // Anchors to the bottom
            width: '500px', // Optional: Make it full-width
            textAlign: 'center', // Center content horizontally
        }}>
            <Card variant="outlined">
            <CardContent>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 16 }}>
                    Review
                </Typography>
                
                <Typography variant="body2">
                    review body
                </Typography>
            </CardContent>
            </Card>
        </Box>
    )
}

export default Review;