import ReactCountryFlag from 'react-country-flag';
import { useState } from "react";


const LanguageSelector = ({ onLanguageChange }) => {
    const [selectedLanguage, setSelectedLanguage] = useState('en-US'); // Default language

    const handleLanguageChange = (language) => {
        setSelectedLanguage(language);
        onLanguageChange(language);
    };

    return (
            <div className="language-selector">
                <div className="language-label">
                    <input
                        type="radio"
                        name="language"
                        value="es-ES"
                        checked={selectedLanguage === 'es-ES'}
                        onChange={() => handleLanguageChange('es-ES')}
                        className="radio-input"
                        style={{ width: '1.3rem', height: '1.3rem' }}
                    />
                    <ReactCountryFlag countryCode="ES" svg style={{ width: '2rem', height: '2rem' }} className="country-flag"/>
                </div>

                <div className="language-label">
                    <input
                        type="radio"
                        name="language"
                        value="en-US"
                        checked={selectedLanguage === 'en-US'}
                        onChange={() => handleLanguageChange('en-US')}
                        className="radio-input"
                        style={{ width: '1.3rem', height: '1.3rem' }}
                    />
                    <ReactCountryFlag countryCode="US" svg style={{ width: '2rem', height: '2rem' }}  className="country-flag" />
                </div>

                <div className="language-label">
                    <input
                        type="radio"
                        name="language"
                        value="pl"
                        checked={selectedLanguage === 'pl'}
                        onChange={() => handleLanguageChange('pl')}
                        className="radio-input"
                        style={{ width: '1.3rem', height: '1.3rem' }}
                    />
                    <ReactCountryFlag countryCode="PL" svg style={{ width: '2rem', height: '2rem' }} className="country-flag" />
                </div>
            </div>
    );
};

export default LanguageSelector;
