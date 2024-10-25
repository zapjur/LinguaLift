import ReactCountryFlag from 'react-country-flag';

const LanguageSelector = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('EN');

    const handleLanguageChange = (language) => {
        setSelectedLanguage(language);
    };

    return (
        <div>
            <h3>Select input language</h3>
            <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => handleLanguageChange('ES')}>
                    <ReactCountryFlag countryCode="ES" svg style={{ width: '30px', height: '30px' }} />
                </button>
                <button onClick={() => handleLanguageChange('EN')}>
                    <ReactCountryFlag countryCode="US" svg style={{ width: '30px', height: '30px' }} />
                </button>
                <button onClick={() => handleLanguageChange('PL')}>
                    <ReactCountryFlag countryCode="PL" svg style={{ width: '30px', height: '30px' }} />
                </button>
            </div>
        </div>
    );
};

export default LanguageSelector;
