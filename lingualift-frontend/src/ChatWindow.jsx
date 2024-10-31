import React, { useContext, useState } from 'react';
import { DataContext } from './DataContext';

const ChatWindow = () => {
    const { userInputs, chatResponses, allErrors } = useContext(DataContext);
    const [activeTab, setActiveTab] = useState('Rozmowa'); // State to track active tab

    return (
        <div style={styles.chatWindow}>
            <h2 style={styles.chatTitle}>Chat Window</h2>

            {/* Tab Buttons */}
            <div style={styles.tabButtons}>
                <button 
                    onClick={() => setActiveTab('Rozmowa')}
                    style={styles.tabButton(activeTab === 'Rozmowa')}
                >
                    Rozmowa
                </button>
                <button 
                    onClick={() => setActiveTab('Błędy')}
                    style={styles.tabButton(activeTab === 'Błędy')}
                >
                    Błędy
                </button>
            </div>

            {/* Conditionally Rendered Content */}
            <div>
                {activeTab === 'Rozmowa' && (
                    <>
                        {/* Displaying User Inputs */}
                        <h3 style={styles.sectionTitle}>User Inputs</h3>
                        {userInputs.length > 0 ? (
                            userInputs.map((input, index) => (
                                <p key={index} style={styles.userInput}>{input.sentence}</p>
                            ))
                        ) : (
                            <p style={styles.placeholder}>No user inputs yet</p>
                        )}

                        {/* Displaying Chat Responses */}
                        <h3 style={styles.sectionTitle}>Chat Responses</h3>
                        {chatResponses.length > 0 ? (
                            chatResponses.map((response, index) => (
                                <p key={index} style={styles.chatResponse}>{response.response_text}</p>
                            ))
                        ) : (
                            <p style={styles.placeholder}>No chat responses yet</p>
                        )}
                    </>
                )}

                {activeTab === 'Błędy' && (
                    <div style={styles.errorContainer}>
                        <h3 style={styles.sectionTitle}>Mistakes</h3>
                        {allErrors.length > 0 ? (
                            allErrors.map((error, index) => (
                                <div key={index}>
                                    <p style={styles.errorText}>Mistakes: {error.error}</p>
                                    <p style={styles.correctionText}>Correction: {error.correction}</p>
                                    <p style={styles.explanationText}>Explanation: {error.explanation}</p>
                                </div>
                            ))
                        ) : (
                            <p style={styles.placeholder}>No errors yet</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatWindow;


    // Inline styles for the component
    const styles = {
        chatWindow: {
            width: '100%',
            maxWidth: '40rem',
            margin: '1rem auto',
            padding: '1rem',
            border: '1px solid #444',
            borderRadius: '1rem',
            backgroundColor: '#1e1e1e',
            boxShadow: '0 0 1rem rgba(0, 0, 0, 0.5)',
            color: '#e0e0e0',
        },
        chatTitle: {
            fontSize: '2rem',
            color: '#e0e0e0',
            marginBottom: '1rem',
        },
        tabButtons: {
            display: 'flex',
            marginBottom: '1rem',
        },
        tabButton: (isActive) => ({
            padding: '0.5rem 1rem',
            marginRight: '1rem',
            cursor: 'pointer',
            backgroundColor: isActive ? '#007bff' : '#333',
            color: isActive ? '#fff' : '#e0e0e0',
            border: 'none',
            borderRadius: '0.25rem',
        }),
        sectionTitle: {
            fontSize: '1.5rem',
            color: '#f1f1f1',
            margin: '1rem 0 0.5rem 0',
        },
        userInput: {
            color: '#80c7ff',
            fontSize: '1.25rem',
        },
        chatResponse: {
            color: '#c2c2c2',
            fontSize: '1.25rem',
        },
        placeholder: {
            fontStyle: 'italic',
            color: '#888',
            fontSize: '1.25rem',
        },
        errorContainer: {
            marginTop: '1rem',
            padding: '1rem',
            borderRadius: '0.5rem',
        },
        errorText: {
            color: '#ff6b6b',
            fontSize: '1.25rem',
        },
        correctionText: {
            color: '#a3e635',
            fontSize: '1.25rem',
        },
        explanationText: {
            color: '#bbb',
            fontSize: '1.25rem',
        },
    };