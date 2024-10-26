import React from "react";


const SendButton = ({transcript, language}) => {

    const onSend = async (e) => {
        e.preventDefault();

        const data = {
            user_input: {
                sentence: transcript,
                language: language,
            },
        };

        try {
            const res = await fetch('http://localhost:8080/input', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                throw new Error("API Error");
            }

            const jsonResponse = await res.json();
            console.log(jsonResponse);
        } catch (error) {
            alert(error);
        }
    };

    return (
        <button className="send-button" onClick={onSend}>SEND</button>
    )
}
export default SendButton;