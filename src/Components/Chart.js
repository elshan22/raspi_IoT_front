import {Container, Paper} from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {useTheme} from "./ThemeContext";
import {chartBackgroundStyle, chartBackgroundStyleDark, lineStyle, lineStyleDark} from "./style";

export default function Chart( {data, type, small} ) {
    const {darkMode} = useTheme();

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={darkMode? chartBackgroundStyleDark: chartBackgroundStyle}>
                <ResponsiveContainer width='100%' height={small? 200: 300}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" tick={false} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dot={false} dataKey={type.toLowerCase()} stroke={darkMode? lineStyleDark: lineStyle} />
                    </LineChart>
                </ResponsiveContainer>
            </Paper>
        </Container>
    );
}