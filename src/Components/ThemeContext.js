import React, {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL} from "../index";

const ThemeContext = createContext();

export const useTheme = () => {
    return useContext(ThemeContext);
};

export const ManualThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        axios.get(BASE_URL + 'theme/')
            .then(response => {
                setDarkMode(response.data['theme']);
                document.body.style.backgroundColor = response.data['dark']? '#333333': '#cccccc';
            })
            .catch(error => console.log(error.response.status));
    }, []);

    const toggleTheme = () => {
        document.body.style.backgroundColor = darkMode? '#cccccc': '#333333';
        axios.post(BASE_URL + 'theme/', {'theme': !darkMode})
            .then(setDarkMode(!darkMode))
            .catch(error => console.log(error.response.status));
    };

    const value = {
        darkMode,
        toggleTheme,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};
