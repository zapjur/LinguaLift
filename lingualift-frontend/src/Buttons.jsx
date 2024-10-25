import ReactCountryFlag from 'react-country-flag';
import {useState} from "react";

const LanguageSelector = ({onLanguageChange}) => {

    const handleLanguageChange = (language) => {
        onLanguageChange(language)
    };

    return (
        <div>
            <h3>Select input language</h3>
            <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => handleLanguageChange('es-ES')}>
                    <ReactCountryFlag countryCode="ES" svg style={{ width: '30px', height: '30px' }} />
                </button>
                <button onClick={() => handleLanguageChange('en-US')}>
                    <ReactCountryFlag countryCode="US" svg style={{ width: '30px', height: '30px' }} />
                </button>
                <button onClick={() => handleLanguageChange('pl')}>
                    <ReactCountryFlag countryCode="PL" svg style={{ width: '30px', height: '30px' }} />
                </button>
            </div>
        </div>
    );
};

export default LanguageSelector;
