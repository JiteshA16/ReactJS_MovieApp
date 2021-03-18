import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Confirmation.css';
import Header from '../../common/header/Header'
import BookShow from '../bookshow/BookShow';
import Home from '../home/Home';
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
import coupons from '../../common/coupons';


class Confirmation extends Component {

    constructor() {
        super();

        this.state = {
            snackBarOpen: false,
            couponCode: "",
            totalPrice: 0,
            originalTotalPrice: 0
        }
    }

    componentDidMount() {
        let currentState = this.state;
        currentState.totalPrice = currentState.originalTotalPrice = this.props.bookingSummary.unitPrice * this.props.bookingSummary.tickets;
        this.setState({ currentState });
    }

    backToBookShowHandler = () => {
        ReactDOM.render(
            <React.StrictMode>
                <BookShow bookingSummary={this.props.bookingSummary} />
            </React.StrictMode>,
            document.getElementById('root')
        );
    }

    confirmBookingHandler = () => {
        this.setState({ snackBarOpen: true });
    }

    snackBarCloseHandler = () => {
        this.setState({ snackBarOpen: false });
        ReactDOM.render(
            <React.StrictMode>
                <Home />
            </React.StrictMode>,
            document.getElementById('root')
        );
    }

    couponCodeChangeHandler = (e) => {
        this.setState({ couponCode: e.target.value });
    }

    couponApplyHandler = () => {
        let currentState = this.state;

        let filterecCouponObject = coupons.filter((coupon) => {
            return coupon.code === this.state.couponCode
        })[0];

        if (filterecCouponObject !== undefined && filterecCouponObject.value > 0) {
            currentState.totalPrice = this.state.originalTotalPrice - ((this.state.originalTotalPrice * filterecCouponObject.value) / 100);
            this.setState(currentState);
        } else {
            currentState.totalPrice = this.state.originalTotalPrice;
            this.setState(currentState);
        }
    }

    render() {
        return (
            <div>
                <Header />

                <div className="confirmation marginTop16">
                    <Typography className="back" onClick={this.backToBookShowHandler}>
                        &#60; Back to Book Show
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
                                    <Typography>{this.props.bookingSummary.location}</Typography>
                                </div>
                            </div>

                            <br />

                            <div className="coupon-container">
                                <div className="confirmLeft">
                                    <Typography>Language:</Typography>
                                </div>
                                <div>
                                    <Typography>{this.props.bookingSummary.language}</Typography>
                                </div>
                            </div>

                            <br />

                            <div className="coupon-container">
                                <div className="confirmLeft">
                                    <Typography>Show Date:</Typography>
                                </div>
                                <div>
                                    <Typography>{this.props.bookingSummary.showDate}</Typography>
                                </div>
                            </div>

                            <br />

                            <div className="coupon-container">
                                <div className="confirmLeft">
                                    <Typography>Show Time:</Typography>
                                </div>
                                <div>
                                    <Typography>{this.props.bookingSummary.showTime}</Typography>
                                </div>
                            </div>

                            <br />

                            <div className="coupon-container">
                                <div className="confirmLeft">
                                    <Typography>Tickets:</Typography>
                                </div>
                                <div>
                                    <Typography>{this.props.bookingSummary.tickets}</Typography>
                                </div>
                            </div>

                            <br />

                            <div className="coupon-container">
                                <div className="confirmLeft">
                                    <Typography>Unit Price:</Typography>
                                </div>
                                <div>
                                    <Typography>Rs. {this.props.bookingSummary.unitPrice}</Typography>
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
                                    <Typography>Rs. {this.props.bookingSummary.unitPrice * this.props.bookingSummary.tickets}</Typography>
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
                            <div className="confirm"><div><CheckCircleIcon style={{color: 'green'}} /></div><div className="message" style={{color: 'green'}}> Booking Confirmed!</div></div>
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
