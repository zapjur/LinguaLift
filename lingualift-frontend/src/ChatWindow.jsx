import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from './DataContext';

const ChatWindow = ({language, onSpeechStart, onSpeechEnd}) => {
    const { userInputs, chatResponses, allErrors } = useContext(DataContext);
    const [activeTab, setActiveTab] = useState('Rozmowa');

    const textToSpeech = (text) => {
        if ("speechSynthesis" in window) {
            if (window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel();
            }

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = language;
            utterance.pitch = 0.8;
            utterance.rate = 0.8;
            utterance.onstart = () => {
                if(onSpeechStart) onSpeechStart();
            };
            utterance.onend = () => {
                if(onSpeechEnd) onSpeechEnd();
            };
            utterance.onerror = (event) => {
                console.error("Error occurred in speech synthesis:", event.error);
            };

            window.speechSynthesis.speak(utterance);
        } else {
            console.log("Text-to-Speech not supported in this browser.");
        }
    };

    useEffect(() => {
        if (chatResponses.length > 0) {
            const latestResponse = chatResponses[chatResponses.length - 1].response_text;
            textToSpeech(latestResponse);
        }
    }, [chatResponses, language]);

    return (
        <div className="chatWindow">
            <div className="tabButtons">
                <button
                    onClick={() => setActiveTab('Rozmowa')}
                    className={`tabButton ${activeTab === 'Rozmowa' ? 'active' : ''}`}
                >
                    Chat
                </button>
                <button
                    onClick={() => setActiveTab('Błędy')}
                    className={`tabButton ${activeTab === 'Błędy' ? 'active' : ''}`}
                >
                    Mistakes
                </button>
            </div>

            <div>
                {activeTab === 'Rozmowa' && (
                    <>
                        {userInputs.length > 0 ? (
                            userInputs.map((input, index) => (
                                <p key={index} className="user-input">{input.sentence}</p>
                            ))
                        ) : (
                            <p className="placeholder">No user inputs yet</p>
                        )}

                        {chatResponses.length > 0 ? (
                            chatResponses.map((response, index) => (
                                <p key={index} className="chat-response">{response.response_text}</p>
                            ))
                        ) : (
                            <p className="placeholder">No chat responses yet</p>
                        )}
                    </>
                )}

                {activeTab === 'Błędy' && (
                    <div className="error-container">
                        {allErrors.length > 0 ? (
                            allErrors.map((error, index) => (
                                <div key={index} className="chuj">
                                    <p className="error-text">Mistakes: {error.error}</p>
                                    <p className="correction-text">Correction: {error.correction}</p>
                                    <p className="explanation-text">Explanation: {error.explanation}</p>
                                </div>
                            ))
                        ) : (
                            <p className="placeholder">No errors yet</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatWindow;
