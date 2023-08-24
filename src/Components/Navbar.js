import React, {useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {Grid, Typography} from "@material-ui/core";
import axios from "axios";
import {BASE_URL} from "../index";
import {useNavigate} from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTheme } from './ThemeContext';
import RoomPreferencesIcon from '@mui/icons-material/RoomPreferences';
import {barStyle, barStyleDark, textStyle, textStyleDark} from "./style";

export default function Navbar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [name, setName] = useState('');
    const { darkMode, toggleTheme } = useTheme();
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    useEffect(() => {
            axios.get(BASE_URL + 'name/')
                .then((response) => setName(response.data['name']))
                .catch(error => console.log(error.status))}
        , []);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    function handleClose() {
        setAnchorEl(null);
    }

    function changeTheme() {
        toggleTheme();
        handleClose();
    }

    return (
        <AppBar position="static" style={darkMode? barStyleDark: barStyle}>
            <Toolbar>
                <div>
                    <IconButton
                        onClick={handleMenu}
                        color="inherit"
                        aria-label="account"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                    >
                        <AccountCircleIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => navigate('/')}>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <HomeIcon />
                                </Grid>
                                <Grid item>
                                    <Typography>
                                        Home
                                    </Typography>
                                </Grid>
                            </Grid>
                        </MenuItem>
                        <MenuItem onClick={() => navigate('/TaskSchedule')}>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <FormatListBulletedIcon />
                                </Grid>
                                <Grid item>
                                    <Typography>
                                        Task Schedule
                                    </Typography>
                                </Grid>
                            </Grid>
                        </MenuItem>
                        <MenuItem onClick={() => navigate('/ConditionPage')}>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <RoomPreferencesIcon />
                                </Grid>
                                <Grid item>
                                    <Typography>
                                        Sensor Preferences
                                    </Typography>
                                </Grid>
                            </Grid>
                        </MenuItem>
                        <MenuItem onClick={changeTheme}>
                            <Grid container spacing={2}>
                                <Grid item>
                                    {darkMode? <DarkModeIcon />: <LightModeIcon />}
                                </Grid>
                                <Grid item>
                                    <Typography>
                                        {darkMode? 'Dark Mode': 'Light Mode'}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </MenuItem>
                    </Menu>
                </div>
                <Typography variant='h6' style={darkMode? textStyleDark: textStyle}>Welcome, {name}</Typography>
            </Toolbar>
        </AppBar>
    );
}