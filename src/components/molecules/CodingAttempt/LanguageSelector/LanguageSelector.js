import React from 'react';
import './LanguageSelector.css';

const LanguageSelector = ({ language, setLanguage }) => {
    const languages = ['cpp', 'java', 'python', 'javascript'];

    return (
        <div className="language-selector">
            <label htmlFor="language">Select Language:</label>
            <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
            >
                {languages.map((lang) => (
                    <option key={lang} value={lang}>
                        {lang}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LanguageSelector;
