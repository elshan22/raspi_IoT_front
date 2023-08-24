import React, {useEffect} from 'react';
import {Grid} from "@material-ui/core";
import Navbar from "./Components/Navbar";
import './App.css';
import {useTheme} from "./Components/ThemeContext";
import EspNodes from "./Components/EspNodes";



export default function App () {
    const {darkMode} = useTheme();

    useEffect(() => {document.body.style.backgroundColor = darkMode? '#333333': '#cccccc'}, [darkMode]);

    return (
            <Grid container spacing={4}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Navbar />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <EspNodes />
                </Grid>
            </Grid>
    );
};