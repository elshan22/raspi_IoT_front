import { Grid } from "@material-ui/core";
import React, {useEffect} from "react";
import Commander from "./Commander";
import Navbar from "./Navbar";
import {useTheme} from "./ThemeContext";

export default function CommandPage() {
    const { darkMode } = useTheme();


    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <Navbar />
            </Grid>
            <Grid item xs={12}>
                <Commander />
            </Grid>
        </Grid>
    );
}