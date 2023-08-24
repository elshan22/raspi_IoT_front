import React, {useEffect, useState} from "react";
import {Grid, Typography} from "@material-ui/core";
import EspCard from "./EspCard";
import axios from "axios";
import {BASE_URL} from "../index";
import {textStyle, textStyleDark} from "./style";
import {useTheme} from "./ThemeContext";

export default function EspNodes() {
    const [nodes, setNodes] = useState([]);

    useEffect(() => {
        axios.get(BASE_URL + 'nodes/all/')
            .then((response) => setNodes(response.data))
            .catch(error => {});
    }, []);

    return (
        <Grid container spacing={6} justifyContent='center'>
            {nodes.map((item, index) =>
                <Grid item>
                    <EspCard info={item} />
                </Grid>
            )}
        </Grid>
    );
}