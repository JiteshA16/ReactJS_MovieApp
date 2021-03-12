import React, { Component } from 'react';
import './Header.css';
import Button from '@material-ui/core/Button';
import logo from '../../assets/logo.svg';
import Modal from 'react-modal';


class Header extends Component {

    constructor() {
        super();
        this.state = {
            modalIsOpen: false
        }
    }

    openModalHandler = () => {
        this.setState({modalIsOpen: true});
    }

    closeModalHandler = () => {
        this.setState({modalIsOpen: false});
    }


    render() {
        return (
            <header className="app-header">
                <img src={logo} alt="logo" className="app-logo" />
                <div className="login-button">
                    <Button variant="contained" color="default" onClick={this.openModalHandler}>LOGIN</Button>
                </div>

                <Modal ariaHideApp={false} isOpen={this.state.modalIsOpen} contentLabel="Login" onRequestClose={this.closeModalHandler}>

                </Modal>

            </header>
        );
    }
}

export default Header;