import React, { Component } from 'react';
import './Header.css';
import Button from '@material-ui/core/Button';
import logo from '../../assets/logo.svg';


class Header extends Component {
    render() {
        return (
            <header className="app-header">
                <img src={logo} alt="logo" className="app-logo" />
                <div className="login-button">
                    <Button variant="contained" color="default">LOGIN</Button>
                </div>
            </header>
        );
    }
}

export default Header;