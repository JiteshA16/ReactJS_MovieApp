import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from '../../common/header/Header';
import moviesData from '../../common/moviesData';
import Typography from '@material-ui/core/Typography';
import Home from '../../screens/home/Home';
import Youtube from 'react-youtube';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import './Details.css';

class Details extends Component {
    constructor() {
        super();
        this.state = {
            movie: {}
        }
    }

    componentWillMount() {
        let currentState = this.state;
        currentState.movie = moviesData.filter((mov) => {
            return mov.id === this.props.movieId;
        })[0];
        this.setState(currentState);
    }

    backToHomeHandler = () => {
        ReactDOM.render(
            <React.StrictMode>
                <Home />
            </React.StrictMode>,
            document.getElementById('root')
        );
    }

    artistImageClickHandler = (wikiUrl) => {
        window.location = wikiUrl;
    }

    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }

    render() {
        let movie = this.state.movie;
        const opts = {
            height: '390',
            width: '640',
            playerVars: {
                // https://developers.google.com/youtube/player_parameters
                autoplay: 1,
            },
        };

        return (
            <div className="details">
                <Header />
                <div className="back">
                    <Typography onClick={this.backToHomeHandler}>
                        &#60; Back to Home
                    </Typography>
                </div>

                <div className="flex-containerDetails">
                    <div className="leftDetails">
                        <img src={movie.poster_url} alt={movie.title} />
                    </div>

                    <div className="middleDetails">
                        <div>
                            <Typography variant="h5" component="h2">{movie.title}</Typography>
                        </div>

                        <br /><br />

                        <div>
                            <Typography><span className="bold">Genre: </span>{movie.genres.join(', ')}</Typography>
                        </div>

                        <div>
                            <Typography><span className="bold">Duration: </span>{movie.duration}</Typography>
                        </div>

                        <div>
                            <Typography><span className="bold">Release Date: </span>{new Date(movie.release_date).toDateString()}</Typography>
                        </div>

                        <div>
                            <Typography><span className="bold">Rating: </span>{movie.critics_rating}</Typography>
                        </div>

                        <br />

                        <div>
                            <Typography><span className="bold">Plot: </span> <a href={movie.wiki_url}>(Wiki Link)</a> {movie.storyline}</Typography>
                        </div>

                        <br />

                        <div>
                            <Typography><span className="bold">Trailer: </span> </Typography>
                            <Youtube videoId={movie.trailer_url.split("?v=")[1]} opts={opts} onReady={this._onReady} />
                        </div>

                    </div>

                    <div className="rightDetails">
                        <div className="bold marginBottom16 marginTop16">
                            <Typography><span className="bold">Artists: </span> </Typography>
                        </div>
                        <GridList cellHeight={160} cols={2}>
                            {movie.artists != null && movie.artists.map(artist => (
                                <GridListTile key={artist.id} onClick={this.artistImageClickHandler.bind(this,artist.wiki_url)}>
                                    <img src={artist.profile_url} alt={artist.first_name + " " + artist.last_name} />
                                    <GridListTileBar title={artist.first_name + " " + artist.last_name} />
                                </GridListTile>
                            ))}
                        </GridList>
                    </div>
                </div>
            </div>
        )
    }
}

export default Details;