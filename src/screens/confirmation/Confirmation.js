import React, { Component } from 'react';
import './Confirmation.css';
import Header from '../../common/header/Header'
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { Link } from 'react-router-dom';


class Confirmation extends Component {

    constructor() {
        super();

        this.state = {
            snackBarOpen: false,
            couponCode: "",
            bookingId: "",
            totalPrice: 0,
            originalTotalPrice: 0
        }
    }

    componentDidMount() {
        let currentState = this.state;
        currentState.totalPrice = currentState.originalTotalPrice = this.props.location.bookingSummary.unitPrice * this.props.location.bookingSummary.tickets.length;
        this.setState({ currentState });
    }

    confirmBookingHandler = () => {
        /* Confirm Booking API call */
        let that = this;
        let confirmBookingParameters = {
            "customerUuid": sessionStorage.getItem("uuid"),
            "bookingRequest": {
                "coupon_code": this.state.couponCode,
                "show_id": this.props.location.bookingSummary.showId,
                "tickets": [
                    this.props.location.bookingSummary.tickets.toString()
                ]
            }
        }
        let confirmBookingData = JSON.stringify(confirmBookingParameters);

        let xhrConfirmBooking = new XMLHttpRequest();
        xhrConfirmBooking.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(JSON.parse(this.responseText));
                that.setState({ bookingId: JSON.parse(this.responseText).reference_number });
            }
        })
        let authorization = "Bearer " + sessionStorage.getItem("access-token");

        xhrConfirmBooking.open("POST", this.props.baseUrl + "bookings");
        xhrConfirmBooking.setRequestHeader("Authorization", authorization);
        xhrConfirmBooking.setRequestHeader("Content-Type", "application/json");
        xhrConfirmBooking.setRequestHeader("Cache-Control", "no-cache");
        xhrConfirmBooking.send(confirmBookingData);

        this.setState({ snackBarOpen: true });
    }

    snackBarCloseHandler = () => {
        this.setState({ snackBarOpen: false });
        this.props.history.push('/');
    }

    couponCodeChangeHandler = (e) => {
        this.setState({ couponCode: e.target.value });
    }

    couponApplyHandler = () => {
        let that = this;

        if (this.state.couponCode !== "") {
            console.log("Api call");
            /* Apply coupon api, Get Coupon Detail */
            let couponData = null;
            let xhrApplyCoupon = new XMLHttpRequest();
            xhrApplyCoupon.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    let currentState = that.state;

                    let discountValue = JSON.parse(this.responseText).value;
                    if (discountValue !== undefined && discountValue > 0) {
                        currentState.totalPrice = that.state.originalTotalPrice - ((that.state.originalTotalPrice * discountValue) / 100);
                        that.setState(currentState);
                    } else {
                        currentState.totalPrice = that.state.originalTotalPrice;
                        that.setState(currentState);
                    }
                }
            })

            let authorization = "Bearer " + sessionStorage.getItem("access-token");

            xhrApplyCoupon.open("GET", this.props.baseUrl + "coupons/" + this.state.couponCode);
            xhrApplyCoupon.setRequestHeader("Authorization", authorization);
            xhrApplyCoupon.setRequestHeader("Content-Type", "application/json");
            xhrApplyCoupon.setRequestHeader("Cache-Control", "no-cache");
            xhrApplyCoupon.send(couponData);
        }
    }

    render() {
        return (
            <div>
                <Header />

                <div className="confirmation marginTop16">
                    <Typography className="back">
                        <Link to={"/bookshow/" + this.props.match.params.id}>
                            &#60; Back to Book Show
                        </Link>
                    </Typography>

                    <br />

                    <Card className="cardStyle">
                        <CardContent>
                            <Typography style={{ textAlign: 'center' }} variant="h5" component="h2">
                                SUMMARY
                                </Typography>

                            <br />

                            <div className="coupon-container">
                                <div className="confirmLeft">
                                    <Typography>Location:</Typography>
                                </div>
                                <div>
                                    <Typography>{this.props.location.bookingSummary.location}</Typography>
                                </div>
                            </div>

                            <br />

                            <div className="coupon-container">
                                <div className="confirmLeft">
                                    <Typography>Theatre:</Typography>
                                </div>
                                <div>
                                    <Typography>{this.props.location.bookingSummary.theatre}</Typography>
                                </div>
                            </div>

                            <br />

                            <div className="coupon-container">
                                <div className="confirmLeft">
                                    <Typography>Language:</Typography>
                                </div>
                                <div>
                                    <Typography>{this.props.location.bookingSummary.language}</Typography>
                                </div>
                            </div>

                            <br />

                            <div className="coupon-container">
                                <div className="confirmLeft">
                                    <Typography>Show Date:</Typography>
                                </div>
                                <div>
                                    <Typography>{this.props.location.bookingSummary.showDate}</Typography>
                                </div>
                            </div>

                            <br />

                            <div className="coupon-container">
                                <div className="confirmLeft">
                                    <Typography>Tickets:</Typography>
                                </div>
                                <div>
                                    <Typography>{this.props.location.bookingSummary.tickets.toString()}</Typography>
                                </div>
                            </div>

                            <br />

                            <div className="coupon-container">
                                <div className="confirmLeft">
                                    <Typography>Unit Price:</Typography>
                                </div>
                                <div>
                                    <Typography>Rs. {this.props.location.bookingSummary.unitPrice}</Typography>
                                </div>
                            </div>

                            <br />

                            <div className="coupon-container">
                                <div>
                                    <FormControl className="formControl">
                                        <InputLabel htmlFor="coupon"><Typography>Coupon Code</Typography></InputLabel>
                                        <Input id="coupon" type="text" onChange={this.couponCodeChangeHandler} />
                                    </FormControl>
                                </div>
                                <div className="marginApply">
                                    <Button variant="contained" color="primary" onClick={this.couponApplyHandler}>APPLY</Button>
                                </div>
                            </div>

                            <br /><br />

                            <div className="coupon-container">
                                <div className="confirmLeft">
                                    <Typography><span className="bold">Total Price:</span></Typography>
                                </div>
                                <div>
                                    <Typography>Rs. {this.state.totalPrice}</Typography>
                                </div>
                            </div>

                            <br />

                            <Button variant="contained" color="primary" onClick={this.confirmBookingHandler}>CONFIRM BOOKING</Button>
                        </CardContent>
                    </Card>
                </div>


                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    className="snackbar"
                    open={this.state.snackBarOpen}
                    onClose={this.snackBarCloseHandler}
                    message={
                        <span id="client-snackbar">
                            <div className="confirm"><div><CheckCircleIcon style={{ color: 'green' }} /></div><div className="message" style={{ color: 'green' }}> Booking Confirmed!</div></div>
                        </span>
                    }
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={this.snackBarCloseHandler}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />


            </div>
        )
    }
}

export default Confirmation;
