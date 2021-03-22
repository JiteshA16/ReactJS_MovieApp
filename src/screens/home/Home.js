import React, { Component } from 'react';
import './Home.css';
import Header from '../../common/header/Header';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },
    upcomingMoviesHeading: {
        textAlign: 'center',
        background: '#ff9999',
        padding: '8px',
        fontSize: '1rem'
    },
    gridListUpcomingMovies: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
        width: '100%'
    },
    gridListMain: {
        transform: 'translateZ(0)',
        cursor: 'pointer'
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 240,
        maxWidth: 240
    },
    title: {
        color: theme.palette.primary.light,
    }
});


class Home extends Component {
    constructor() {
        super();
        this.state = {
            movieName: "",
            upcomingMovies: [],
            releasedMovies: [],
            genreList: [],
            artistList: [],
            genres: [],
            artists: [],
            releaseDateStart: "",
            releaseDateEnd: ""
        }
    }

    movieNameChangeHandler = (e) => {
        this.setState({ movieName: e.target.value });
    }

    genreChangeHandler = (e) => {
        this.setState({ genres: e.target.value });
        console.log(this.state.genres)
    }

    artistChangeHandler = (e) => {
        this.setState({ artists: e.target.value });
    }

    releaseDateStartHandler = (e) => {
        this.setState({ releaseDateStart: e.target.value });
    }

    releaseDateEndHandler = (e) => {
        this.setState({ releaseDateEnd: e.target.value });
    }

    applyClickHander = () => {
        let queryString = "?status=RELEASED";

        if (this.state.movieName !== "") {
            queryString += "&title=" + this.state.movieName;
        }
        if (this.state.genres.length > 0) {
            queryString += "&genre=" + this.state.genres.toString();
        }
        if (this.state.artists.length > 0) {
            queryString += "&artists=" + this.state.artists.toString();
        }
        if (this.state.releaseDateStart !== "") {
            queryString += "&start_date=" + this.state.releaseDateStart;
        }
        if (this.state.releaseDateEnd !== "") {
            queryString += "&end_date=" + this.state.releaseDateEnd;
        }

        /* Get released movies */
        let that = this;
        let fliteredData = null;
        let xhrFiltered = new XMLHttpRequest();
        xhrFiltered.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({ releasedMovies: JSON.parse(this.responseText).movies });
            }
        })

        xhrFiltered.open("GET", this.props.baseUrl + "movies" + encodeURI(queryString));
        xhrFiltered.setRequestHeader("Cache-Control", "no-cache");
        xhrFiltered.send(fliteredData);

    }

    movieClickHandler = (movieId) => {
        this.props.history.push('/movie/' + movieId);
    }

    componentWillMount() {
        /* Get upcoming movies */
        let upcomingData = null;
        let xhrUpcoming = new XMLHttpRequest();
        let that = this;
        xhrUpcoming.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({ upcomingMovies: JSON.parse(this.responseText).movies });
            }
        })

        xhrUpcoming.open("GET", this.props.baseUrl + "movies?status=PUBLISHED");
        xhrUpcoming.setRequestHeader("Cache-Control", "no-cache");
        xhrUpcoming.send(upcomingData);

        /* Get released movies */
        let releasedData = null;
        let xhrReleased = new XMLHttpRequest();
        xhrReleased.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({ releasedMovies: JSON.parse(this.responseText).movies });
            }
        })

        xhrReleased.open("GET", this.props.baseUrl + "movies?status=RELEASED");
        xhrReleased.setRequestHeader("Cache-Control", "no-cache");
        xhrReleased.send(releasedData);

        /* Get Genres */
        let genreData = null;
        let xhrGenre = new XMLHttpRequest();
        xhrGenre.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({ genreList: JSON.parse(this.responseText).genres });
            }
        })

        xhrGenre.open("GET", this.props.baseUrl + "genres");
        xhrGenre.setRequestHeader("Cache-Control", "no-cache");
        xhrGenre.send(genreData);

        /* Get Artists */
        let artistData = null;
        let xhrArtist = new XMLHttpRequest();
        xhrArtist.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({ artistList: JSON.parse(this.responseText).artists });
            }
        })

        xhrArtist.open("GET", this.props.baseUrl + "artists");
        xhrArtist.setRequestHeader("Cache-Control", "no-cache");
        xhrArtist.send(artistData);
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Header baseUrl={this.props.baseUrl} />
                <div className={classes.upcomingMoviesHeading}>
                    <span>Upcoming movies</span>
                </div>
                <GridList cols={5} className={classes.gridListUpcomingMovies}>
                    {this.state.upcomingMovies.map(movie => (
                        <GridListTile key={"upcoming-" + movie.id}>
                            <img className="movie-poster" src={movie.poster_url} alt={movie.title} />
                            <GridListTileBar title={movie.title} />
                        </GridListTile>
                    ))}
                </GridList>

                <div className="flex-container">
                    <div className="left">
                        <GridList cols={4} cellHeight={350} className={classes.gridListMain}>
                            {this.state.releasedMovies.map(movie => (
                                <GridListTile onClick={this.movieClickHandler.bind(this, movie.id)} className="released-movie-grid-item" key={"released-" + movie.id}>
                                    <img className="movie-poster" src={movie.poster_url} alt={movie.title} />
                                    <GridListTileBar
                                        title={movie.title}
                                        subtitle={<span>Release Date : {new Date(movie.release_date).toDateString()}</span>}
                                    />
                                </GridListTile>
                            ))}
                        </GridList>
                    </div>

                    <div className="right">
                        <Card>
                            <CardContent>
                                <FormControl className={classes.formControl}>
                                    <Typography className={classes.title} color="textSecondary">
                                        FIND MOVIES BY:
                                    </Typography>
                                </FormControl>

                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="movieName">Movie Name</InputLabel>
                                    <Input type="text" id="movieName" onChange={this.movieNameChangeHandler} />
                                </FormControl>

                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="select-multiple-checkbox-genre">Genre</InputLabel>

                                    <Select
                                        multiple
                                        input={<Input id="select-multiple-checkbox-genre" />}
                                        renderValue={selected => selected.join(', ')}
                                        value={this.state.genres}
                                        onChange={this.genreChangeHandler}>

                                        <MenuItem value="0">Select genre</MenuItem>
                                        {this.state.genreList.map(genre => (
                                            <MenuItem key={"genre-" + genre.id} value={genre.genre}>
                                                <Checkbox checked={this.state.genres.indexOf(genre.genre) > -1} />
                                                <ListItemText primary={genre.genre} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>


                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="select-multiple-checkbox-artist">Artists</InputLabel>

                                    <Select
                                        multiple
                                        input={<Input id="select-multiple-checkbox-artist" />}
                                        renderValue={selected => selected.join(', ')}
                                        value={this.state.artists}
                                        onChange={this.artistChangeHandler}>

                                        <MenuItem value="0">Select artist</MenuItem>
                                        {this.state.artistList.map(artist => (
                                            <MenuItem key={"artist-" + artist.id} value={artist.first_name + " " + artist.last_name}>
                                                <Checkbox checked={this.state.artists.indexOf(artist.first_name + " " + artist.last_name) > -1} />
                                                <ListItemText primary={artist.first_name + " " + artist.last_name} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl className={classes.formControl}>
                                    <TextField
                                        id="releaseDateStart"
                                        label="Release Date Start"
                                        defaultValue=""
                                        type="date"
                                        InputLabelProps={{ shrink: true }}
                                        onChange={this.releaseDateStartHandler} />
                                </FormControl>

                                <FormControl className={classes.formControl}>
                                    <TextField
                                        id="releaseDateEnd"
                                        label="Release Date End"
                                        defaultValue=""
                                        type="date"
                                        InputLabelProps={{ shrink: true }}
                                        onChange={this.releaseDateEndHandler} />
                                </FormControl>

                                <FormControl className={classes.formControl}>
                                    <Button variant="contained" color="primary" onClick={this.applyClickHander}>APPLY</Button>
                                </FormControl>

                            </CardContent>
                        </Card>
                    </div>
                </div>

            </div>
        );
    }
}

export default withStyles(styles)(Home);