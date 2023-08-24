import React, {useEffect, useState} from 'react';
import {Grid, Typography} from "@material-ui/core";
import Navbar from "./Navbar";
import {textStyle, textStyleDark} from "./style";
import {useTheme} from "./ThemeContext";
import Selector from "./Selector";
import Reporter from "./Reporter";
import Chart from "./Chart";
import axios from "axios";
import {BASE_URL} from "../index";

export default function ReportPage () {
    const [nodeId, setNodeId] = useState(null);
    const {darkMode} = useTheme();


    useEffect(() => {document.body.style.backgroundColor = darkMode? '#333333': '#cccccc'}, [darkMode]);


    return (
        <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <Navbar />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <Grid container justifyContent='center'>
                    <Selector type='Sensor' change_handle={(val) => setNodeId(val)} />
                </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <Grid container justifyContent='center'>
                    <Typography variant='body1' style={darkMode? textStyleDark: textStyle}>NODE ID: {nodeId}</Typography>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <Grid container justifyContent='center'>
                    <Reporter id={nodeId} small={false} />
                </Grid>
            </Grid>
        </Grid>
    );
};