/* ========================================================================== */
/* React-Redux                                                                */
/* ========================================================================== */
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from "react-router-dom";

/* ========================================================================== */
/* App Routers                                                                */
/* ========================================================================== */
import ShogibanRouter from './app/shogiban/ShogibanRouter';
import AuthRouter from './app/auth/AuthRouter';

ReactDOM.render(
    <React.StrictMode>
        <Router basename={process.env.PUBLIC_URL}>
            <ShogibanRouter />
            <AuthRouter />
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);