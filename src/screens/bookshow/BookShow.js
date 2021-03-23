import React, { Component } from 'react';
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
import FormHelperText from '@material-ui/core/FormHelperText';

import './BookShow.css';

import { Link } from 'react-router-dom';

class BookShow extends Component {

    constructor() {
        super();
        this.state = {
            showId: "",
            location: "",
            theatre: "",
            language: "",
            showDate: "",
            tickets: 0,
            unitPrice: 500,
            availableTickets: 20,
            locationRequired: "dispNone",
            theatreRequired: "dispNone",
            languageRequired: "dispNone",
            showDateRequired: "dispNone",
            ticketsRequired: "dispNone",
            originalShows: [],
            locations: [],
            theatres: [],
            languages: [],
            showDates: []
        }
    }

    componentDidMount() {
        let that = this;
        /* Get Show Detail */
        let bookShowData = null;
        let xhrBookShow = new XMLHttpRequest();
        xhrBookShow.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                let response = JSON.parse(this.responseText);
                that.setState({ originalShows: response.shows });

                let newLocations = []

                for (let show of response.shows) {
                    newLocations.push({ id: show.theatre.city, location: show.theatre.city });
                }

                newLocations = newLocations.filter((loc, index, self) =>
                    index === self.findIndex((c) => (
                        c.id === loc.id
                    ))
                )
                that.setState({ locations: newLocations });

                console.log(that.state.locations);
            }
        })

        xhrBookShow.open("GET", this.props.baseUrl + "movies/" + this.props.match.params.id + "/shows");
        xhrBookShow.setRequestHeader("Cache-Control", "no-cache");
        xhrBookShow.send(bookShowData);
    }

    locationChangeHandler = (e) => {
        this.setState({ location: e.target.value });
        let newTheatres = []

        for (let show of this.state.originalShows) {
            if (show.theatre.city === e.target.value) {
                newTheatres.push({ id: show.theatre.name, theatre: show.theatre.name });
            }
        }

        newTheatres = newTheatres.filter((theatre, index, self) =>
            index === self.findIndex((t) => (
                t.id === theatre.id
            ))
        )

        this.setState({ theatres: newTheatres });
    }

    theatreChangeHandler = (e) => {
        this.setState({ theatre: e.target.value });

        let newLanguages = []

        for (let show of this.state.originalShows) {
            if (show.theatre.city === this.state.location && show.theatre.name === e.target.value) {
                newLanguages.push({id: show.language, language: show.language});
            }
        }

        newLanguages = newLanguages.filter((language, index, self) =>
            index === self.findIndex((l) => (
                l.id === language.id
            ))
        )

        this.setState({ languages: newLanguages });
        
    }

    languageChangeHandler = (e) => {
        this.setState({ language: e.target.value });

        let newShowDates = []

        for (let show of this.state.originalShows) {
            if (show.theatre.city === this.state.location && show.theatre.name === this.state.theatre && show.language === e.target.value) {
                newShowDates.push({id: show.show_timing, showDate: show.show_timing});
            }
        }

        newShowDates = newShowDates.filter((showDate, index, self) =>
            index === self.findIndex((d) => (
                d.id === showDate.id
            ))
        )

        this.setState({ showDates: newShowDates });

    }

    showDateChangeHandler = (e) => {
        this.setState({ showDate: e.target.value });

        let unitPrice = 0;
        let availableTickets = 0;

        for (let show of this.state.originalShows) {
            if (show.theatre.city === this.state.location && show.theatre.name === this.state.theatre && show.language === this.state.language && show.show_timing === e.target.value) {
                unitPrice = show.unit_price;
                availableTickets = show.available_seats
                this.setState({showId: show.id});
            }
        }

        this.setState({unitPrice: unitPrice, availableTickets: availableTickets});
    }

    ticketsChangeHandler = (e) => {
        this.setState({ tickets: e.target.value.split(",") });
    }

    bookShowButtonHandler = () => {
        this.state.location === "" ? this.setState({ locationRequired: "dispBlock" }) : this.setState({ locationRequired: "dispNone" })
        this.state.theatre === "" ? this.setState({ theatreRequired: "dispBlock" }) : this.setState({ theatreRequired: "dispNone" })
        this.state.language === "" ? this.setState({ languageRequired: "dispBlock" }) : this.setState({ languageRequired: "dispNone" })
        this.state.showDate === "" ? this.setState({ showDateRequired: "dispBlock" }) : this.setState({ showDateRequired: "dispNone" })
        this.state.tickets === 0 ? this.setState({ ticketsRequired: "dispBlock" }) : this.setState({ ticketsRequired: "dispNone" })

        if (this.state.location !== "" && this.state.theatre !== "" && this.state.language !== "" && this.state.showDate !== "" && this.state.tickets !== 0) {
            this.props.history.push({
                pathname: '/confirm/' + this.props.match.params.id,
                bookingSummary: this.state
            });
        }

    }

    render() {
        return (
            <div>
                <Header />
                <div className="bookShow">
                    <Typography className="back">
                        <Link to={"/movie/" + this.props.match.params.id}>
                            &#60; Back to Movie Details
                        </Link>
                    </Typography>

                    <br />

                    <Card className="cardStyle">
                        <CardContent>

                            <Typography style={{ textAlign: 'center' }} variant="h5" component="h2">BOOK SHOW</Typography>
                            <br />


                            <FormControl required className="formControl">
                                <InputLabel htmlFor="location">Choose Location:</InputLabel>
                                <Select
                                    value={this.state.location}
                                    onChange={this.locationChangeHandler}>
                                    {this.state.locations.map(loc => (
                                        <MenuItem key={"loc-" + loc.id} value={loc.location}>
                                            {loc.location}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText className={this.state.locationRequired}><span className="red">Please select location</span></FormHelperText>
                            </FormControl>

                            <br /><br />

                            <FormControl required className="formControl">
                                <InputLabel htmlFor="theatre">Choose Theatre:</InputLabel>
                                <Select
                                    value={this.state.theatre}
                                    onChange={this.theatreChangeHandler}>
                                    {this.state.theatres.map(th => (
                                        <MenuItem key={"theatre-" + th.id} value={th.theatre}>
                                            {th.theatre}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText className={this.state.theatreRequired}><span className="red">Please select theatre</span></FormHelperText>
                            </FormControl>

                            <br /><br />

                            <FormControl required className="formControl">
                                <InputLabel htmlFor="language">Choose Language:</InputLabel>
                                <Select
                                    value={this.state.language}
                                    onChange={this.languageChangeHandler}>
                                    {this.state.languages.map(lang => (
                                        <MenuItem key={"lang-" + lang.id} value={lang.language}>
                                            {lang.language}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText className={this.state.languageRequired}><span className="red">Please select language</span></FormHelperText>
                            </FormControl>

                            <br /><br />

                            <FormControl required className="formControl">
                                <InputLabel htmlFor="showDate">Choose Show Date and Time:</InputLabel>
                                <Select
                                    value={this.state.showDate}
                                    onChange={this.showDateChangeHandler}>
                                    {this.state.showDates.map(sd => (
                                        <MenuItem key={"showDate-" + sd.id} value={sd.showDate}>
                                            {sd.showDate}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText className={this.state.showDateRequired}><span className="red">Please select show date</span></FormHelperText>
                            </FormControl>

                            <br /><br />

                            <FormControl required className="formControl">
                                <InputLabel htmlFor="tickets">Seat Selection: ({this.state.availableTickets + " " + "available"})</InputLabel>
                                <Input id="tickets" type="text" value={this.state.tickets !== 0 ? this.state.tickets : ""} onChange={this.ticketsChangeHandler} />
                                <FormHelperText className={this.state.ticketsRequired}><span className="red">Please select tickets</span></FormHelperText>
                            </FormControl>

                            <br /><br />

                            <Typography>
                                Unit Price: Rs. {this.state.unitPrice}
                            </Typography>

                            <br />

                            <Typography>
                                Total Price: Rs. { this.state.tickets.length > 0 ? (this.state.unitPrice * this.state.tickets.length) : 0}
                            </Typography>

                            <br /><br />

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