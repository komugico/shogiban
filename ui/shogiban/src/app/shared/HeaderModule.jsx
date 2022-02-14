import * as React from 'react';
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from 'react-redux';

import { Stack } from '@mui/material';
import { Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

import * as AuthSelectors from '../auth/stores/selectors';

const UserStatus = ({ username }) => {
    if (username != "") {
        return (
            <>
                <p>{username}</p>
                <Avatar>
                    <PersonIcon />
                </Avatar>
            </>
        )
    }
    else {
        return (
            <Button color="inherit" component={Link} to="/auth/signin">Sign In</Button>
        )
    }
}

const HeaderModule = () => {
    const username = useSelector(AuthSelectors.getUsername)

    return (
        <AppBar position="static" color="default">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    将棋盤
                </Typography>
                <UserStatus username={username} />
            </Toolbar>
        </AppBar>
    );
}

export default HeaderModule;