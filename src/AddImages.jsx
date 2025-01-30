import { Box, Stack, Button } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useState } from "react";

function AddImages() {
    const [images, setImages] = useState([]);

    const handleNext = () => {
        console.log('next button is clicked');

        images.forEach(image => {
            console.log(image.file.name);
        });
    }

    const handleImageUpload = (event) => {
        // when image file is selected
        const files = Array.from(event.target.files); // Convert FileList to an array
        if (files.length === 0) return; // Ensure at least one file is selected
    
        const newImages = files.map((file) => ({
            file,
            url: URL.createObjectURL(file), // Generate a temporary URL for preview
        }));
    
        setImages((prevImages) => [...prevImages, ...newImages]); // Append new images
    };

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            transform: "translate(0%, 40%)", // Center it perfectly
        }}>
            <Stack direction='column' spacing={2} sx={{width: '500px'}}>
                <h2>Add at least 1 image of yourself 📹</h2>

                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    disableElevation
                    sx={{
                        backgroundColor: 'orange'
                    }}
                >
                    Select Image
                    <VisuallyHiddenInput
                        type="file"
                        onChange={handleImageUpload}
                        multiple
                    />
                </Button>

                <Button variant="contained" sx={{height:'50px', backgroundColor:'orange', marginTop:'20px'}} 
                    disableElevation onClick={handleNext} >Next
                </Button>
            </Stack>
        </Box>
    )
}

export default AddImages