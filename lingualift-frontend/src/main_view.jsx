import MicToggle from "./MicToggle.jsx";
import React, { useState } from "react";
import LanguageSelector from "./LanguageSelector.jsx";
import SendButton  from "./assets/SendButton.jsx";
import ChatWindow from "./ChatWindow.jsx";

const MainView = () => {
    const [language, setLanguage] = useState("en-US");
    const [transcript, setTranscript] = useState("");
    const [placeholder, setPlaceholder] = useState("How was your day?")

    const handleLanguageChange = (selectedLanguage) => {
        setLanguage(selectedLanguage);
        changePlaceHolderBasedOnSelectedLanguage(selectedLanguage);
    };
    const changePlaceHolderBasedOnSelectedLanguage = (selectedLanguage) => {
        if(selectedLanguage === "en-US"){
            setPlaceholder("How was your day?")
        }
        if(selectedLanguage === "pl"){
            setPlaceholder("Jak ci minął dzień?")
        }
        if(selectedLanguage === "es-ES"){
            setPlaceholder("Cómo estuvo su día?")
        }
    }
    const updateTranscript = (newTranscript) => {
        setTranscript(newTranscript);
    };
    const handleChange = (event) => {
        setTranscript(event.target.value);
    };

    return (
        <div className="container">
            <div className="right-bar">
                <LanguageSelector onLanguageChange={handleLanguageChange} />
                {/* ARTUR TUTAJ PISZ CHAT :))) ~ chyba Juro | ARTUR PISZ GO W OSOBNYM KOMPONENCIE TAK JAK GADALISMY ~ Piotrek
                || tak w osobnym komponencie ale w tym divie xd d*/}
                <ChatWindow />
            </div>
            <div className="input-section">
                <textarea
                    value = {transcript}
                    placeholder={placeholder}
                    className="text-input"
                    onChange={handleChange}
                />
                <div className="input-buttons" >
                    <MicToggle language={language} onTranscriptChange={updateTranscript} />
                    <SendButton transcript={transcript} language={language}/>
                </div>
            </div>
        </div>
    );
};

export default MainView;
