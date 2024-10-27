import React, { createContext, useState } from "react";
export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [userInputs, setUserInputs] = useState([]);
    const [chatResponses, setChatResponses] = useState([]);
    const [allErrors, setAllErrors] = useState([]);

    const value = {
        userInputs,
        chatResponses,
        allErrors,
        setUserInputs,
        setChatResponses,
        setAllErrors,
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};
