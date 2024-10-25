import MicToggle from "./MicToggle.jsx";
import React from "react";
import LanguageSelector from "./Buttons.jsx";



const MainView = () => {
    const sendMessage = async () => {
        try {
            const response = await fetch('http://localhost:8000/chat_response', {
                method: 'GET', // Use POST method
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Response:', data.response_text);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <div className="container">
            <div className="video-section">
                <div className="video-placeholder">
                    {/* Video placeholder content or component */}
                </div>
            </div>
            <div className="chat-section">
                <LanguageSelector />
                <h3>Sekcja błędów?</h3>
                <div className="chat-messages">
                    <ul>
                        <li>odmien być</li>
                        <li>odmien być</li>
                        <li>odmien być</li>
                        <li>odmien być</li>
                    </ul>
                    <div className="chat-divider"></div>
                </div>
            </div>
            <div className="input-section">
                <input type="text" placeholder="Wpisz tu coś" className="text-input" />
                <button className="send-button" onClick={sendMessage}>SEND</button>
                {/* MicToggle component */}
                <MicToggle />
            </div>
        </div>
    );
};

export default MainView;