import React, { useState } from 'react';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa'; // Importing FontAwesome Icons

const MicToggle = () => {
    const [isMicOn, setIsMicOn] = useState(true);
    const handleClick = () => {
        setIsMicOn((prev) => !prev);
    };

    return (
        <div style={styles.micToggleContainer}>
            <button onClick={handleClick}>
                {isMicOn ? (
                    <FaMicrophoneSlash size={40} color="BB86FC" />

                ) : (
                    <FaMicrophone size={40} color="BB86FC" />
                )}
            </button>
        </div>
    );
};

const styles = {
    micToggleContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: '100%',
        paddingRight: '10px',
        marginLeft: '35vh',
    },
};

export default MicToggle;