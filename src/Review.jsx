import { Box, Card, CardContent, Typography } from "@mui/material";

function Review() {
    const reviews = [
        "Found the love of my life through Peng.",
        "Simple to use, straightforward and no nonsense.",
        "The people here are really nice and friendly."
    ]

    return (
        <Box sx={{
            position: 'absolute',
            bottom: 0, // Anchors to the bottom
            width: '500px',
            textAlign: 'center', // Center content horizontally
        }}>
            {reviews.map((review) => (
                <Card variant="outlined" key={review}>
                <CardContent>
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 16 }}>
                        Review
                    </Typography>
                    
                    <Typography variant="body2">
                        {review}
                    </Typography>
                </CardContent>
                </Card>
            ))}
        </Box>
    )
}

export default Review;