import React, {useContext} from "react";
import { DataContext } from "../DataContext.jsx";


const SendButton = ({transcript, language}) => {

    const {
        setUserInputs,
        setChatResponses,
        setAllErrors,
    } = useContext(DataContext);

    const onSend = async (e) => {
        e.preventDefault();

        setUserInputs([]);
        setChatResponses([]);
        setAllErrors([]);

        // const data = {
        //     user_input: {
        //         sentence: transcript,
        //         language: language,
        //     },
        // };
        //
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
        // } catch (error) {
        //     alert(error);
        // }

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
    };

    return (
        <button className="send-button" onClick={onSend}>SEND</button>
    )
}
export default SendButton;