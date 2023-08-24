import {Accordion, AccordionDetails, AccordionSummary, Card, CardContent, CardMedia} from "@mui/material";
import {cardStyle, cardStyleDark, textStyle, textStyleDark} from "./style";
import {Button, Grid, Typography} from "@material-ui/core";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useTheme} from "./ThemeContext";
import Commander from "./Commander";
import axios from "axios";
import {BASE_URL} from "../index";
import Reporter from "./Reporter";

export default function EspCard( {info} ) {
    const [connection, setConnection] = useState('disconnected');
    const navigate = useNavigate();
    const {darkMode} = useTheme();


    useEffect(() => {
        const interval = setInterval(() => {
            axios.get(BASE_URL + 'node/' + info['id'] + '/')
                .then(response => {
                    if (response.data['last_difference'] > 6) setConnection('disconnected');
                    else setConnection('connected');
                })
                .catch(error => console.log(error.response.status));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const type_map = {'AC': 'Actuator', 'SE': 'Sensor'}

    return (
        <Card sx={{ maxWidth: 350 }} style={darkMode? cardStyleDark: cardStyle}>
            <Button onClick={() => info['type']==='AC'? navigate('/commandPage'): navigate('/ReportPage')}>
                <CardMedia
                    component='img'
                    image={require('./../images/ESP32.png')}
                    alt='ESP32'
                    draggable='false'
                />
            </Button>
            <CardContent>
                <Typography variant='body1' style={darkMode? textStyleDark: textStyle}>
                    Room: {info['room']}
                </Typography>
                <Typography variant='body1' style={darkMode? textStyleDark: textStyle}>
                    Node ID: {info['id']}
                </Typography>
                <Typography variant='body1' style={darkMode? textStyleDark: textStyle}>
                    Type: {type_map[info['type']]} ({info['sensor_type']})
                </Typography>
                <Grid container spacing={1}>
                    <Grid item>
                        <Typography variant='body1' style={darkMode? textStyleDark: textStyle}>Connection Status:</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant='body1' style={{ color: (connection==='disconnected')? '#e33030': '#22723a'}}>{connection}</Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <Accordion style={darkMode? cardStyleDark: cardStyle}>
                <AccordionSummary style={darkMode? textStyleDark: textStyle} expandIcon={<ExpandMoreIcon />}>
                    More Details
                </AccordionSummary>
                <AccordionDetails>
                    {info['type']==='AC'? <Commander id={info['id']} />: <Reporter id={info['id']} small={true} />}
                </AccordionDetails>
            </Accordion>
        </Card>);
}