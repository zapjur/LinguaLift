import React, { useState } from 'react';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';

const MicrophoneButton = (props) => {
    const [isMicOn, setIsMicOn] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [recognition, setRecognition] = useState(null);

    const handleClick = () => {
        if (isMicOn) {
            stopRecording();
        } else {
            startRecording();
        }
        setIsMicOn(prev => !prev);
    };

    const startRecording = () => {
        console.log(props.language + " from mic component");
        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        const newRecognition = new window.SpeechRecognition();
        setRecognition(newRecognition);

        newRecognition.interimResults = true;
        newRecognition.lang = props.language;

        newRecognition.onresult = (event) => {
            const current = event.resultIndex;
            const transcriptResult = event.results[current][0].transcript;
            setTranscript(prevTranscript => prevTranscript + ' ' + transcriptResult);
            console.log(transcriptResult);
        };

        newRecognition.onend = () => {
            if (isMicOn) {
                newRecognition.start();
            }
        };

        newRecognition.onerror = (event) => {
            console.error('Speech recognition error', event.error);
        };

        newRecognition.start();
    };

    const stopRecording = () => {
        if (recognition) {
            recognition.stop();
            setTranscript('');
        }
    };

    return (
        <div>
            <button onClick={handleClick}>
                {isMicOn ? (
                    <FaMicrophone size={40} color="#BB86FC" />
                ) : (
                    <FaMicrophoneSlash size={40} color="#BB86FC" />
                )}
            </button>
        </div>
    );
};

export default MicrophoneButton;
