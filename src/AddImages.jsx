import { Box, Stack, Button, ImageList, ImageListItem } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useState } from "react";
import { useUser } from "./UserContext";

function AddImages() {
    const { currentUser } = useUser();
    const [images, setImages] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    
    const [imageUploaded, setImageUploaded] = useState(false);

    const handleNext = async () => {
        // when the next button is clicked
        // make a post request to save the images selected to account
        console.log('next button is clicked');

        images.forEach(image => {
            console.log(image.file.name);
        });

        if (images.length === 0) {
            alert('No images selected!');
            return;
        }

        const formData = new FormData();
        images.forEach((image) => {
            formData.append('images', image.file); // Append each file to the form data
        });
        try {
            // Send a POST request to the backend to upload images to Cloudinary using fetch
            const response = await fetch('http://localhost:5000/upload-to-cloud', {
                method: 'POST',
                body: formData, // Send form data with images
            });

            // Check if the request was successful
            if (!response.ok) {
                throw new Error('Failed to upload images');
            }

            const data = await response.json();

            // Update the state with the image URLs received from Cloudinary
            setImageUrls(data.imageUrls);
            console.log('Uploaded image URLs:', data.imageUrls);
        } catch (error) {
            console.error('Error uploading images:', error);
        }
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
        setImageUploaded(true);
    };

    const handleRemoveAllImages = () => {
        // when clear images button is clicked
        console.log('remove images clicked');
        setImages([]);
        setImageUploaded(false);
    }

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
            transform: images.length > 0 ? "translate(0%, 20%)" : "translate(0%, 40%)",
        }}>
            <Stack direction='column' spacing={2} sx={{width: '500px'}}>
                <h2>Add at least 1 image of yourself 📹</h2>

                <Stack direction={'row'} spacing={2} sx={{width: '500px'}}>
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        disableElevation
                        sx={{
                            backgroundColor: 'orange',
                            width: '50%'
                        }}
                    >
                        Select Image(s)
                        <VisuallyHiddenInput
                            type="file"
                            onChange={handleImageUpload}
                            multiple
                        />
                    </Button>

                    <Button
                        variant="contained"
                        disableElevation
                        sx={{
                            backgroundColor: 'orange',
                            width: '50%'
                        }}
                        onClick={handleRemoveAllImages}
                    >
                        Clear Images
                    </Button>
                </Stack>

                {
                    images.length > 0 &&
                    <ImageList sx={{ width: 500, height: 164 }} cols={3} rowHeight={164}>
                        {images.map((image, index) => (
                            <ImageListItem key={index}>
                            <img
                                srcSet={image.url}
                                src={image.url}
                                alt={image.file.name}
                                loading="lazy"
                            />
                            </ImageListItem>
                        ))}
                    </ImageList>
                }

                <Button variant="contained" sx={{height:'50px', backgroundColor:'orange', marginTop:'20px'}} 
                    disableElevation disabled={!imageUploaded} onClick={handleNext} >Next
                </Button>
            </Stack>
        </Box>
    )
}

export default AddImages