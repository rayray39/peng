import { Box, Stack, Button, ImageList, ImageListItem } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useState } from "react";
import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom";

// page for uploading images of currently logged in user
function AddImages() {
    const { currentUser } = useUser();
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    
    const [threeImagesUploaded, setThreeImagesUploaded] = useState(false);  // limit num of uploaded images to 3

    const handleNext = async () => {
        // when the next button is clicked
        // make a post request to save the images selected to account
        if (images.length === 0) {
            alert('No images selected!');
            return;
        }

        const formData = new FormData();
        formData.append("userId", currentUser.id); // Append user ID
        images.forEach((image) => {
            formData.append('images', image.file); // Append each file to the form data
        });
        try {
            // Send a POST request to the backend to upload images to Cloudinary using fetch
            const response = await fetch('http://localhost:5000/upload-to-cloud', {
                method: 'POST',
                body: formData, // Send form data with currentUser.id and images
            });

            if (!response.ok) {
                throw new Error('Failed to upload images');
            }

            const data = await response.json();
            setImageUrls(data.imageUrls);
            console.log(data.message);
            console.log('Uploaded image URLs:', data.imageUrls);

            navigate('/people');
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
        if (images.length + newImages.length === 3) {
            setThreeImagesUploaded(true);
        } else {
            setThreeImagesUploaded(false);
        }
    };

    const handleRemoveAllImages = () => {
        // when clear images button is clicked
        console.log('remove images clicked');
        setImages([]);
        setThreeImagesUploaded(false);
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
                <h2>Select 3 images of yourself 📹</h2>

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

                {images.length > 3 &&
                    <p style={{color:'red'}}>Please select only 3 images!</p>
                }

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
                    disableElevation disabled={!threeImagesUploaded} onClick={handleNext} >Next
                </Button>
            </Stack>
        </Box>
    )
}

export default AddImages