import React, { useContext, useState } from 'react';
import { DataContext } from './DataContext';

const ChatWindow = () => {
    const { userInputs, chatResponses, allErrors } = useContext(DataContext);
    const [activeTab, setActiveTab] = useState('Rozmowa');

    return (
        <div className="chatWindow">

            {/* Tab Buttons */}
            <div className="tabButtons">
                <button 
                    onClick={() => setActiveTab('Rozmowa')}
                    className={`tabButton ${activeTab === 'Rozmowa' ? 'active' : ''}`}
                >
                    Rozmowa
                </button>
                <button 
                    onClick={() => setActiveTab('Błędy')}
                    className={`tabButton ${activeTab === 'Błędy' ? 'active' : ''}`}
                >
                    Błędy
                </button>
            </div>

            {/* Conditionally Rendered Content */}
            <div>
                {activeTab === 'Rozmowa' && (
                    <>
                        {/* Displaying User Inputs */}
                        {userInputs.length > 0 ? (
                            userInputs.map((input, index) => (
                                <p key={index} className="user-input">{input.sentence}</p>
                            ))
                        ) : (
                            <p className="placeholder">No user inputs yet</p>
                        )}

                        {/* Displaying Chat Responses */}
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
                                <div key={index}>
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