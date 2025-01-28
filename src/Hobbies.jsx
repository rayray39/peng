import { Box, Stack, TextField, Chip, Button } from "@mui/material";
import { useState } from "react";
import { useUser } from "./UserContext";

function Hobbies() {
    const availableHobbies = [
        "Reading", "Travelling", "Cooking",
        "Gaming", "Music", "Sports",
        "Films/Shows", "Outdoors", "Fitness",
        "Handicrafts", "Food"
    ];
    const { currentUser } = useUser();
    const [selectedHobbies, setSelectedHobbies] = useState([]);
    const MAX_SELECTED_HOBBIES = 3;
    const [alreadySelectedThree, setAlreadySelectedThree] = useState(false);

    const handleChipClick = (hobby) => {
        // when a single chip is being clicked on

        if (selectedHobbies.includes(hobby)) {
            // Remove hobby from selected hobbies
            setSelectedHobbies(selectedHobbies.filter((item) => item !== hobby));
        } else {
            // Add hobby to selected hobbies
            if (selectedHobbies.length === MAX_SELECTED_HOBBIES) {
                setAlreadySelectedThree(true);
                console.log("selected max. number of hobbies");
                return;
            }
            setSelectedHobbies([...selectedHobbies, hobby]);
        }
        setAlreadySelectedThree(false);
    }

    const handleNext = async () => {
        // when the next button is clicked
        // make a post request to save the hobbies selected for currently logged in user
        console.log('next button is clicked');

        const response = await fetch("http://localhost:5000/save-hobbies", {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ currentUser, selectedHobbies }),
        })

        const data = await response.json();
        if (!response.ok) {
            console.log(data.error);
            return;
        }

        console.log(data.message);
        console.log(`selected hobbies: ${selectedHobbies}`);
    }

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            transform: "translate(0%, 40%)", // Center it perfectly
        }}>
            <Stack direction='column' spacing={2} sx={{width: '500px'}}>
                <h2>Select {MAX_SELECTED_HOBBIES} hobbies 🏸🍣🛫</h2>

                <TextField label='Selected Hobbies' value={selectedHobbies.join(", ")} variant="outlined"
                    slotProps={{
                        input: {
                            readOnly: true,
                        },
                    }}
                    helperText={alreadySelectedThree ? "You have already selected 3 hobbies." : null}
                />

                {/* Chips for selecting hobbies */}
                <Box display="flex" flexWrap="wrap" gap={1} sx={{justifyContent: 'center', width:'500px'}}>
                    {availableHobbies.map((hobby) => (
                    <Chip
                        key={hobby}
                        label={hobby}
                        onClick={() => handleChipClick(hobby)}
                        variant={selectedHobbies.includes(hobby) ? "filled" : "outlined"}
                        sx={{
                            backgroundColor: selectedHobbies.includes(hobby) ? "orange" : "white",
                            "&:hover": {
                                backgroundColor: selectedHobbies.includes(hobby) ? "orange" : "white", // Darker shade on hover
                            },
                        }}
                    />
                    ))}
                </Box>

                <Button variant="contained" sx={{height:'50px', backgroundColor:'orange', marginTop:'20px'}} 
                    disableElevation onClick={handleNext}>Next
                </Button>
            </Stack>
        </Box>
    )
}

export default Hobbies