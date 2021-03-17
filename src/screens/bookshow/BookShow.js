import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from '../../common/header/Header';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button'

import Home from '../home/Home';
import './BookShow.css';

import locations from '../../common/location';
import languages from '../../common/language';
import showDates from '../../common/showDate';
import showTimes from '../../common/showTime';


class BookShow extends Component {

    constructor() {
        super();
        this.state = {
            location: "",
            language: "",
            showDate: "",
            showTime: "",
            tickets: 0,
            unitPrice: 500,
            availableTickets: 20
        }
    }

    backToDetailsHandler = () => {
        ReactDOM.render(
            <React.StrictMode>
                <Home />
            </React.StrictMode>,
            document.getElementById('root')
        );
    }

    locationChangeHandler = (e) => {
        this.setState({ location: e.target.value });
    }

    languageChangeHandler = (e) => {
        this.setState({ language: e.target.value });
    }

    showDateChangeHandler = (e) => {
        this.setState({ showDate: e.target.value });
    }

    showTimeChangeHandler = (e) => {
        this.setState({ showTime: e.target.value });
    }

    ticketsChangeHandler = (e) => {
        this.setState({ tickets: e.target.value });
    }

    bookShowButtonHandler = () => {
    }

    render() {
        return (
            <div>
                <Header />
                <div className="bookShow">
                    <Typography className="back" onClick={this.backToDetailsHandler}>
                        &#60; Back to Movie Details
                    </Typography>

                    <Card className="cardStyle">
                        <CardContent>

                            <Typography style={{ textAlign: 'center' }} variant="h5" component="h2">BOOK SHOW</Typography>
                            <br/>

                            <FormControl required className="formControl">
                                <InputLabel htmlFor="location">Choose Location:</InputLabel>
                                <Select
                                    value={this.state.location}
                                    onChange={this.locationChangeHandler}>
                                    {locations.map(loc => (
                                        <MenuItem key={"loc" + loc.id} value={loc.location}>
                                            {loc.location}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <br/><br/>

                            <FormControl required className="formControl">
                                <InputLabel htmlFor="language">Choose Language:</InputLabel>
                                <Select
                                    value={this.state.language}
                                    onChange={this.languageChangeHandler}>
                                    {languages.map(lang => (
                                        <MenuItem key={"lang" + lang.id} value={lang.language}>
                                            {lang.language}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <br /><br />

                            <FormControl required className="formControl">
                                <InputLabel htmlFor="showDate">Choose Show Date:</InputLabel>
                                <Select
                                    value={this.state.showDate}
                                    onChange={this.showDateChangeHandler}>
                                    {showDates.map(sd => (
                                        <MenuItem key={"showDate" + sd.id} value={sd.showDate}>
                                            {sd.showDate}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <br/><br/>

                            <FormControl required className="formControl">
                                <InputLabel htmlFor="showTime">Choose Show Time:</InputLabel>
                                <Select
                                    value={this.state.showTime}
                                    onChange={this.showTimeChangeHandler}>
                                    {showTimes.map(st => (
                                        <MenuItem key={"showTime" + st.id} value={st.showTime}>
                                            {st.showTime}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <br/><br/>

                            <FormControl required className="formControl">
                                <InputLabel htmlFor="tickets">Tickets: ({this.state.availableTickets + " " + "available"})</InputLabel>
                                <Input id="tickets" type="text" value={this.state.tickets !== 0 ? this.state.tickets : ""} onChange={this.ticketsChangeHandler} />
                            </FormControl>

                            <br/><br/>

                            <Typography>
                                Unit Price: Rs. {this.state.unitPrice}
                            </Typography>

                            <br/>

                            <Typography>
                                Total Price: Rs. {this.state.unitPrice * this.state.tickets}
                            </Typography>

                            <br/><br/>

                            <Button variant="contained" color="primary" onClick={this.bookShowButtonHandler}>
                                BOOK SHOW
                            </Button>

                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }
}

export default BookShow;