import { Box, Card, CardContent, Typography } from "@mui/material";

function Review() {
    const reviews = [
        {user: "Jane Maddison", content: "Found the love of my life through Peng."},
        {user: "David Raquel Sainz", content: "Simple to use, straightforward and no nonsense."},
        {user: "Carry Davis", content: "The people here are really nice and friendly."}
    ]

    return (
        <Box sx={{
            position: 'absolute',
            bottom: 0, // Anchors to the bottom
            width: '500px',
            textAlign: 'center', // Center content horizontally
        }}>
            {reviews.map((review, index) => (
                <Card variant="outlined" key={index} sx={{height:'100px'}}>
                <CardContent>
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 16 }}>
                        {review.user}
                    </Typography>
                    
                    <Typography variant="body2">
                        {`"${review.content}"`}
                    </Typography>
                </CardContent>
                </Card>
            ))}
        </Box>
    )
}

export default Review;