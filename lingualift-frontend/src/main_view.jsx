import MicToggle from "./MicToggle.jsx";
import React, { useState } from "react";
import LanguageSelector from "./LanguageSelector.jsx";
import SendButton  from "./assets/SendButton.jsx";
import ChatWindow from "./ChatWindow.jsx";
import babkagif from "./assets/babka_1.gif";
import babkapng from "./assets/img.png";

const MainView = () => {
    const [language, setLanguage] = useState("en-US");
    const [transcript, setTranscript] = useState("");
    const [placeholder, setPlaceholder] = useState("How was your day?")
    const [imageSrc, setImageSrc] = useState(babkapng);
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
    const handleSpeechStart = () => {
        setImageSrc(babkagif);
    };
    const handleSpeechEnd = () => {
        setImageSrc(babkapng);
    };

    return (
        <div className="container">

            <div className="right-bar">
                <LanguageSelector onLanguageChange={handleLanguageChange} />
                {/* ARTUR TUTAJ PISZ CHAT :))) ~ chyba Juro | ARTUR PISZ GO W OSOBNYM KOMPONENCIE TAK JAK GADALISMY ~ Piotrek
                || tak w osobnym komponencie ale w tym divie xd d*/}
                <ChatWindow language={language} onSpeechStart={handleSpeechStart} onSpeechEnd={handleSpeechEnd}/>
            </div>
            <div className="gif">
                <img src = {imageSrc} alt="opis" className="img" />
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
                    <SendButton transcript={transcript} language={language} onTranscriptChange={updateTranscript}/>
                </div>
            </div>
        </div>
    );
};

export default MainView;
