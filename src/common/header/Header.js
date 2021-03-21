import React, { Component } from 'react';
import './Header.css';
import Button from '@material-ui/core/Button';
import logo from '../../assets/logo.svg';
import Modal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Link } from 'react-router-dom';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const TabContainer = function (props) {
    return (
        <Typography component="div" style={{ padding: 0, textAlign: "center" }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
};

class Header extends Component {

    constructor() {
        super();
        this.state = {
            modalIsOpen: false,
            value: 0,
            usernameRequired: "dispNone",
            username: "",
            loginPasswordRequired: "dispNone",
            loginPassword: "",
            firstnameRequired: "dispNone",
            firstname: "",
            lastnameRequired: "dispNone",
            lastname: "",
            emailRequired: "dispNone",
            email: "",
            registerPasswordRequired: "dispNone",
            registerPassword: "",
            contactRequired: "dispNone",
            contact: "",
            registrationSuccess: false,
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true
        }
    }

    openModalHandler = () => {
        this.setState(
            {
                modalIsOpen: true,
                value: 0,
                usernameRequired: "dispNone",
                username: "",
                loginPasswordRequired: "dispNone",
                loginPassword: "",
                firstnameRequired: "dispNone",
                firstname: "",
                lastnameRequired: "dispNone",
                lastname: "",
                emailRequired: "dispNone",
                email: "",
                registerPasswordRequired: "dispNone",
                registerPassword: "",
                contactRequired: "dispNone",
                contact: ""
            }
        );
    }

    closeModalHandler = () => {
        this.setState({ modalIsOpen: false });
    }

    tabChangeHandler = (event, value) => {
        this.setState({ value: value });
    }

    loginClickHandler = () => {
        this.state.username === "" ? this.setState({ usernameRequired: "dispBlock" }) : this.setState({ usernameRequired: "dispNone" })
        this.state.loginPassword === "" ? this.setState({ loginPasswordRequired: "dispBlock" }) : this.setState({ loginPasswordRequired: "dispNone" })

        if (this.state.username === "" || this.state.loginPassword === "") {
            return;
        }

        let that = this;
        let loginData = null;

        let xhrLogin = new XMLHttpRequest();
        xhrLogin.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
                sessionStorage.setItem("uuid", JSON.parse(this.responseText).id);
                sessionStorage.setItem("access-token", xhrLogin.getResponseHeader("access-token"));
                that.setState({ loggedIn: true });
                that.closeModalHandler();
            }
        })
        let authString = this.state.username + ":" + this.state.loginPassword;
        let authorization = "Basic " + window.btoa(authString);
        xhrLogin.open("POST", this.props.baseUrl + "auth/login");
        xhrLogin.setRequestHeader("Authorization", authorization);
        xhrLogin.setRequestHeader("Content-Type", "application/json");
        xhrLogin.setRequestHeader("Cache-Control", "no-cache");
        xhrLogin.send(loginData);
    }

    inputUsernameChangeHandler = (e) => {
        this.setState({ username: e.target.value });
    }

    inputLoginPasswordChangeHandler = (e) => {
        this.setState({ loginPassword: e.target.value });
    }

    registerClickHandler = () => {
        this.state.firstname === "" ? this.setState({ firstnameRequired: "dispBlock" }) : this.setState({ firstnameRequired: "dispNone" })
        this.state.lastname === "" ? this.setState({ lastnameRequired: "dispBlock" }) : this.setState({ lastnameRequired: "dispNone" })
        this.state.email === "" ? this.setState({ emailRequired: "dispBlock" }) : this.setState({ emailRequired: "dispNone" })
        this.state.registerPassword === "" ? this.setState({ registerPasswordRequired: "dispBlock" }) : this.setState({ registerPasswordRequired: "dispNone" })
        this.state.contact === "" ? this.setState({ contactRequired: "dispBlock" }) : this.setState({ contactRequired: "dispNone" })

        if (this.state.firstname === "" || this.state.lastname === "" || this.state.email === "" || this.state.registerPassword === "" || this.state.contact === "") {
            return;
        }

        let that = this;
        let registerParams = {
            "email_address": this.state.email,
            "first_name": this.state.firstname,
            "last_name": this.state.lastname,
            "mobile_number": this.state.contact,
            "password": this.state.registerPassword
        }
        let registerData = JSON.stringify(registerParams);

        let xhrSignUp = new XMLHttpRequest();
        xhrSignUp.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
                that.setState({ registrationSuccess: true });
            }
        })
        xhrSignUp.open("POST", this.props.baseUrl + "signup");
        xhrSignUp.setRequestHeader("Content-Type", "application/json");
        xhrSignUp.setRequestHeader("Cache-Control", "no-cache");
        xhrSignUp.send(registerData);
    }

    inputFirstNameChangeHandler = (e) => {
        this.setState({ firstname: e.target.value });
    }

    inputLastNameChangeHandler = (e) => {
        this.setState({ lastname: e.target.value });
    }

    inputEmailChangeHandler = (e) => {
        this.setState({ email: e.target.value });
    }

    inputRegisterPasswordChangeHandler = (e) => {
        this.setState({ registerPassword: e.target.value });
    }

    inputContactNoChangeHandler = (e) => {
        this.setState({ contact: e.target.value });
    }

    logoutHandler = () => { 
        let that = this;
        let logoutData = null;

        let xhrLogout = new XMLHttpRequest();
        xhrLogout.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
                sessionStorage.removeItem("uuid");
                sessionStorage.removeItem("access-token");
                that.setState({loggedIn: false});
            }
        })

        let authorization = "Bearer " + sessionStorage.getItem("access-token");
        xhrLogout.open("POST", this.props.baseUrl + "auth/logout");
        xhrLogout.setRequestHeader("Authorization", authorization);
        xhrLogout.setRequestHeader("Content-Type", "application/json");
        xhrLogout.setRequestHeader("Cache-Control", "no-cache");
        xhrLogout.send(logoutData);
    }

    render() {
        return (
            <header className="app-header">
                <img src={logo} alt="logo" className="app-logo" />

                {!this.state.loggedIn ?
                    <div className="login-button">
                        <Button variant="contained" color="default" onClick={this.openModalHandler}>LOGIN</Button>
                    </div>
                    :
                    <div className="login-button">
                        <Button variant="contained" color="default" onClick={this.logoutHandler}>LOGOUT</Button>
                    </div>
                }

                {this.props.showBookShowButton === "true"
                    ? <div className="bookshow-button">
                        <Link to={"/bookshow/" + this.props.id}>
                            <Button variant="contained" color="primary">BOOK SHOW</Button>
                        </Link>
                    </div>
                    : ""}

                <Modal ariaHideApp={false} isOpen={this.state.modalIsOpen} contentLabel="Login" onRequestClose={this.closeModalHandler} style={customStyles}>
                    <Tabs className="tabs" value={this.state.value} onChange={this.tabChangeHandler}>
                        <Tab label="Login" />
                        <Tab label="Register" />
                    </Tabs>

                    {this.state.value === 0 &&
                        <TabContainer>
                            <FormControl required>
                                <InputLabel htmlFor="username">Username</InputLabel>
                                <Input type="text" id="username" username={this.state.username} onChange={this.inputUsernameChangeHandler} />
                                <FormHelperText className={this.state.usernameRequired}><span className="red">Please enter username</span></FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="loginPassword">Password</InputLabel>
                                <Input type="password" id="loginPassword" loginpassword={this.state.loginPassword} onChange={this.inputLoginPasswordChangeHandler} />
                                <FormHelperText className={this.state.loginPasswordRequired}><span className="red">Please enter password</span></FormHelperText>
                            </FormControl>
                            <br /><br />
                            <Button variant="contained" color="primary" onClick={this.loginClickHandler}>LOGIN</Button>
                        </TabContainer>
                    }

                    {this.state.value === 1 &&
                        <TabContainer>
                            <FormControl required>
                                <InputLabel htmlFor="firstname">First Name</InputLabel>
                                <Input type="text" id="firstname" firstname={this.state.firstname} onChange={this.inputFirstNameChangeHandler} />
                                <FormHelperText className={this.state.firstnameRequired}><span className="red">Please enter firstname</span></FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="lastname">Last Name</InputLabel>
                                <Input type="text" id="lastname" lastname={this.state.lastname} onChange={this.inputLastNameChangeHandler} />
                                <FormHelperText className={this.state.lastnameRequired}><span className="red">Please enter lastname</span></FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Input type="text" id="email" email={this.state.email} onChange={this.inputEmailChangeHandler} />
                                <FormHelperText className={this.state.emailRequired}><span className="red">Please enter email</span></FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="registerPassword">Password</InputLabel>
                                <Input type="password" id="registerPassword" registerpassword={this.state.registerPassword} onChange={this.inputRegisterPasswordChangeHandler} />
                                <FormHelperText className={this.state.registerPasswordRequired}><span className="red">Please enter password</span></FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="contact">Contact No.</InputLabel>
                                <Input type="text" id="contact" contact={this.state.contact} onChange={this.inputContactNoChangeHandler} />
                                <FormHelperText className={this.state.contactRequired}><span className="red">Please enter contact no</span></FormHelperText>
                            </FormControl>
                            <br /><br />
                            {this.state.registrationSuccess === true &&
                                <FormControl>
                                    <span>Registration Successful. Please Login!</span>
                                </FormControl>
                            }
                            <br /><br />
                            <Button variant="contained" color="primary" onClick={this.registerClickHandler}>REGISTER</Button>
                        </TabContainer>
                    }

                </Modal>

            </header>
        );
    }
}

export default Header;