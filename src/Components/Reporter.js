import {
    defaultSelectStyle,
    defaultSelectStyleDark, disableSelectStyle, disableSelectStyleDark,
    hoverSelectStyle,
    hoverSelectStyleDark,
    selectLabelStyle,
    selectLabelStyleDark, textFieldStyle, textFieldStyleDark,
    textStyle,
    textStyleDark
} from "./style";
import {Grid, InputAdornment, TextField, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {useTheme} from "./ThemeContext";
import axios from "axios";
import {BASE_URL} from "../index";
import Chart from "./Chart";
import {DateTimePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import { format } from 'date-fns';

export default function Reporter( {id, small} ) {
    const [data, setData] = useState({'type': ''});
    const [vals, setVals] = useState([]);
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const {darkMode} = useTheme();

    useEffect(() => {
        const interval = setInterval(() => {
            axios.get(BASE_URL + 'report/updateData/' + id + '/')
                .then(response => {
                    setData(response.data);
                }).catch(error => console.log(error.response.status));
        }, 1000);
        return () => clearInterval(interval);
    }, [id]);

    useEffect(() => {
        axios.get(BASE_URL + 'report/getData/' + id + '/' +
            format(start, 'yyyy-MM-dd HH:mm:ss') + '/' +
            format(end, 'yyyy-MM-dd HH:mm:ss') + '/')
            .then(response => setVals(response.data))
            .catch(error => console.log(error.response.status));
    }, [id, start, end]);


    return (
        <Grid container spacing={small? 2: 6} justifyContent='center'>
            <Grid item xs={12}>
                <Grid container justifyContent='center'>
                    <Typography variant='body1' style={darkMode? textStyleDark: textStyle}>{data['type']}: {data[data['type'].toLowerCase()]}</Typography>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={small? 2: 6} justifyContent='center'>
                    <Grid item>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                renderInput={(props) => <TextField {...props} />}
                                label="Start Time"
                                value={start}
                                onChange={(val) => setStart(val)}
                                ampm={false}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                renderInput={(props) => <TextField {...props} />}
                                label="End Time"
                                value={end}
                                onChange={(val) => setEnd(val)}
                                ampm={false}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Chart data={vals} type={data['type']} small={small} />
            </Grid>
        </Grid>
    );
}