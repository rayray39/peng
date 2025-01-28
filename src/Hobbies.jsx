import { Box, Stack, TextField, Chip } from "@mui/material";
import { useState } from "react";

function Hobbies() {
    const availableHobbies = [
        "Reading", "Travelling", "Cooking",
        "Gaming", "Music", "Sports",
        "Films/Shows", "Outdoors", "Fitness",
        "Handicrafts", "Food"
    ];
    const [selectedHobbies, setSelectedHobbies] = useState([]);

    const handleChipClick = (hobby) => {
        // when a single chip is being clicked on

        if (selectedHobbies.includes(hobby)) {
            // Remove hobby from selected hobbies
            setSelectedHobbies(selectedHobbies.filter((item) => item !== hobby));
        } else {
            // Add hobby to selected hobbies
            setSelectedHobbies([...selectedHobbies, hobby]);
        }
    }

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            transform: "translate(0%, 50%)", // Center it perfectly
        }}>
            <Stack direction='column' spacing={2} sx={{width: '500px'}}>
                <h2>Select 3 hobbies 🏸🍣🛫</h2>

                <TextField label='Selected Hobbies' value={selectedHobbies.join(", ")} variant="outlined"
                    slotProps={{
                        input: {
                            readOnly: true,
                        },
                    }}
                />

                {/* Chips for selecting hobbies */}
                <Box display="flex" flexWrap="wrap" gap={1} sx={{justifyContent: 'center', width:'500px'}}>
                    {availableHobbies.map((hobby) => (
                    <Chip
                        key={hobby}
                        label={hobby}
                        onClick={() => handleChipClick(hobby)}
                        color={selectedHobbies.includes(hobby) ? "primary" : "default"}
                        variant={selectedHobbies.includes(hobby) ? "filled" : "outlined"}
                    />
                    ))}
                </Box>
            </Stack>
        </Box>
    )
}

export default Hobbies