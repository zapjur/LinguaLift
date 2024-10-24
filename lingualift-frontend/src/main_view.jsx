import MicToggle from "./MicToggle.jsx";
import React from "react";


const MainView = () => {
    return (
        <div className="container">
            <div className="video-section">
                <div className="video-placeholder">
                    {/* Video placeholder content or component */}
                </div>
            </div>
            <div className="chat-section">
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
                <button className="send-button">SEND</button>
                {/* MicToggle component */}
                <MicToggle />
            </div>
        </div>
    );
};

export default MainView;