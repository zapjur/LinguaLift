import React from 'react';
import './App.css';
import MicToggle from './MicToggle';
import cat from './assets/meow.gif';

function App() {
    return (
        <div className="container">
            <div className="video-section">
                <div className="video-placeholder">
                    <img src={cat} alt="kot" className="fota" />
                </div>
            </div>
            <div className="chat-section">
                <h3>Sekcja bledow?</h3>
                <div className="chat-messages">
                    <ul>
                        <p>odmien byc</p>
                        <p>odmien byc</p>
                        <p>odmien byc</p>
                        <p>odmien byc</p>
                    </ul>
                    <div className="chat-divider"></div>
                </div>
            </div>
            <div className="input-section">
                <input type="text" placeholder="Wpisz tu cos" className="text-input" />
                <button className="send-button">SEND</button>
                <MicToggle />
            </div>
        </div>
    );
}

export default App;