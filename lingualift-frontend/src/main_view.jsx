import MicToggle from "./MicToggle.jsx";
import React, {useState} from "react";
import LanguageSelector from "./Buttons.jsx";


const MainView = () => {
    const [language, setLanguage] = useState("en-US")
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
    const handleLanguageChange = (selectedLanguage) => {
        setLanguage(selectedLanguage);
        console.log(selectedLanguage);
    }

    return (
        <div className="container">
            <div className="video-section">
                <div className="video-placeholder">
                    {/* Video placeholder content or component */}
                </div>
            </div>
            <div className="chat-section">
                <LanguageSelector onLanguageChange={handleLanguageChange} />
                <h3>Chat History/Mistakes Section</h3>
                <div className="chat-messages">
                    <ul>
                        <li>xdddddd</li>
                        <li>xdddddd</li>
                        <li>xdddddd</li>
                        <li>xdddddd</li>
                    </ul>
                    <div className="chat-divider"></div>
                </div>
            </div>
            <div className="input-section">
                <textarea placeholder="How was your day?" className="text-input"/>
                <div className="input-buttons" >
                    {/* MicToggle component */}
                    <MicToggle language={language} />
                    <button className="send-button" onClick={sendMessage}>SEND</button>
                </div>
            </div>
        </div>
    );
};

export default MainView;