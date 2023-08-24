import React from 'react';
import './index.css';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import {createRoot} from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CommandPage from "./Components/CommandPage";
import ReportPage from "./Components/ReportPage";
import SchedulePage from "./Components/SchedulePage";
import {ManualThemeProvider} from "./Components/ThemeContext";
import ConditionPage from "./Components/ConditionPage";


export const BASE_URL = 'http://127.0.0.1:1800/';

const root = createRoot(document.getElementById('root'));
root.render(
            <ManualThemeProvider>
                <Router>
                    <Routes>
                        <Route exact path='/' element={<App />} />
                        <Route path='/CommandPage' element={<CommandPage />} />
                        <Route path='/ReportPage' element={<ReportPage />} />
                        <Route path='/TaskSchedule' element={<SchedulePage />} />
                        <Route path='/ConditionPage' element={<ConditionPage />} />
                    </Routes>
                </Router>
            </ManualThemeProvider>
);

reportWebVitals();