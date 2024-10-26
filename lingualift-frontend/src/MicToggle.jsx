import React, { useState, useEffect } from 'react';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const MicrophoneButton = ({ language, onTranscriptChange }) => {
    const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
    const [isMicOn, setIsMicOn] = useState(false);
    const [displayedTranscript, setDisplayedTranscript] = useState('');

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser does not support speech recognition.</span>;
    }

    const handleClick = () => {
        if (isMicOn) {
            stopRecording();
        } else {
            startRecording();
        }
        setIsMicOn(prev => !prev);
    };

    const startRecording = () => {
        setDisplayedTranscript('');
        onTranscriptChange('');
        SpeechRecognition.startListening({
            continuous: true,
            language: language
        });
    };

    const stopRecording = () => {
        SpeechRecognition.stopListening();
        resetTranscript();
    };

    useEffect(() => {
        if (listening) {
            setDisplayedTranscript(transcript);
            onTranscriptChange(transcript);
        }
    }, [transcript, listening, onTranscriptChange]);

    return (
        <div>
            <button onClick={handleClick}>
                {isMicOn ? (
                    <FaMicrophone size={43} color="#BB86FC" />
                ) : (
                    <FaMicrophoneSlash size={43} color="#BB86FC" />
                )}
            </button>
        </div>
    );
};

export default MicrophoneButton;
