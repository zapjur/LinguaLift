import React, {useContext, useState} from "react";
import { DataContext } from "../DataContext.jsx";


const SendButton = ({transcript, language, onTranscriptChange}) => {
    const [loading, setLoading] = useState(false);
    const {
        setUserInputs,
        setChatResponses,
        setAllErrors,
    } = useContext(DataContext);
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const onSend = async (e) => {
        e.preventDefault();
        setLoading(true);
        setAllErrors([]);

        const data = {
            user_input: {
                sentence: transcript,
                language: language,
            },
        };

        onTranscriptChange('')

        // try {
        //     const res = await fetch('http://localhost:8080/input', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(data),
        //     });
        //
        //     if (!res.ok) {
        //         throw new Error("API Error");
        //     }
        //
        //     const jsonResponse = await res.json();
        //     console.log(jsonResponse);
        //     const userInput = jsonResponse.user_input;
        //     const chatResponse = jsonResponse.chat_response;
        //     const errors = jsonResponse.errors;
        //     setUserInputs((prevUserInputs) => [...prevUserInputs, userInput]);
        //     setChatResponses((prevChatResponses) => [
        //                     ...prevChatResponses,
        //                     chatResponse,
        //     ]);
        //     setAllErrors((prevErrors) => [...prevErrors, ...errors]);
        // } catch (error) {
        //     alert(error);
        // } finally {
        //     setLoading(false);
        // }

        //await delay(3000);
        fetch('http://localhost:8000/input')
            .then(response => {
                if(!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                const userInput = data.user_input;
                const chatResponse = data.chat_response;
                const errors = data.errors;

                setUserInputs((prevUserInputs) => [...prevUserInputs, userInput]);
                setChatResponses((prevChatResponses) => [
                    ...prevChatResponses,
                    chatResponse,
                ]);
                setAllErrors((prevErrors) => [...prevErrors, ...errors]);

            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            })
            .finally(() => {
                setLoading(false);
            } )
    };

    return (
        <button
            className="send-button"
            onClick={onSend}
            disabled={loading}
        >
            {loading ? "PENDING..." : "SEND"}
        </button>
    )
}
export default SendButton;