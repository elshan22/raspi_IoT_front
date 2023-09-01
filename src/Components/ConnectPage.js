import {Button, Grid, InputAdornment, TextField, Typography} from "@material-ui/core";
import {
    defaultButtonStyle,
    defaultButtonStyleDark,
    hoverButtonStyle,
    hoverButtonStyleDark,
    textFieldStyle,
    textFieldStyleDark,
    textStyle,
    textStyleDark
} from "./style";
import React, {useEffect, useState} from "react";
import Navbar from "./Navbar";
import {useTheme} from "./ThemeContext";
import CableIcon from '@mui/icons-material/Cable';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PasswordIcon from '@mui/icons-material/Password';
import axios from "axios";
import {BASE_URL} from "../index";
import {wait} from "@testing-library/user-event/dist/utils";
import WifiTetheringOffIcon from '@mui/icons-material/WifiTetheringOff';

export default function ConnectPage() {
    const [hover, setHover] = useState(false);
    const [disHover, setDisHover] = useState(false);
    const [error, setError] = useState(null);
    const {darkMode} = useTheme();


    function handle_click() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        axios.post(BASE_URL + 'connect/', {'email': email, 'password': password})
            .then((response) => wait(1000).then(() => axios.get(BASE_URL + 'getStatus/')
                    .then(r => setError(r.data['status']))))
            .catch(error => setError('Email is not Valid!'));
    }

    function handle_disconnect() {
        axios.post(BASE_URL + 'connect/', {'email': '', 'password': ''})
            .then((response) => wait(1000).then(() => axios.get(BASE_URL + 'getStatus/')))
            .catch(error => setError('You Have Disconnected Successfully!'));
    }

    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <Navbar />
            </Grid>
            <Grid item xs={12}>
                <Grid container justifyContent='center' spacing={6}>
                    <Grid item>
                        <TextField id="email" label="Email" InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AlternateEmailIcon />
                                </InputAdornment>
                            ),
                            style: darkMode? textFieldStyleDark: textFieldStyle
                        }} InputLabelProps={{style: darkMode? textStyleDark: textStyle}}
                                   variant="filled" required/>
                    </Grid>
                    <Grid item>
                        <TextField id="password" label="Password" InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PasswordIcon />
                                </InputAdornment>
                            ),
                            style: darkMode? textFieldStyleDark: textFieldStyle
                        }} InputLabelProps={{style: darkMode? textStyleDark: textStyle}}
                                   variant="filled" required/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={6} justifyContent='center'>
                    <Grid item xs={12}>
                        <Button style={hover? (darkMode? hoverButtonStyleDark: hoverButtonStyle): (darkMode? defaultButtonStyleDark: defaultButtonStyle)} onMouseEnter={() => setHover(true)}
                                onMouseLeave={() => setHover(false)} variant="contained" endIcon={<CableIcon />} onClick={handle_click}>
                            Connect
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button style={disHover? (darkMode? hoverButtonStyleDark: hoverButtonStyle): (darkMode? defaultButtonStyleDark: defaultButtonStyle)} onMouseEnter={() => setDisHover(true)}
                                onMouseLeave={() => setDisHover(false)} variant="contained" endIcon={<WifiTetheringOffIcon />} onClick={handle_disconnect}>
                            Disconnect
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container justifyContent='center'>
                    <Typography variant='body2' style={darkMode? textStyleDark: textStyle}>{error}</Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}