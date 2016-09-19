import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { loginUser, logoutUser } from '../actions/authed';
import Popover from './Popover';
import Link from './Link';
import NavSearch from './NavSearch';
import { getImageUrl } from '../utils/SongUtils';

const propTypes = {
    authed: PropTypes.object.isRequired,
    authedPlaylists: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    navigator: PropTypes.object.isRequired,
}

class Nav extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    renderStreamLink() {
        const { authed, dispatch, navigator } = this.props;
        const { route } = navigator;
        // const hasNewStreamSongs = authed.newStreamSongs.length > 0;
        const hasNewStreamSongs = false;

        if (!authed.user) {
            return null;
        }

        return (
            <div className="nav-nav-item">
                <Link
                    className={ classnames({
                        'nav-nav-user-link': true,
                        active: route.path[1] === 'stream'
                    }) }
                    dispatch={ dispatch }
                    route={{ path: ['me', 'stream' ]}}
                >
                    { hasNewStreamSongs ? <div className="nav-nav-user-link-indicator"></div> : null }
                    <span className="nav-nav-user-link-text">stream</span>
                </Link>
            </div>
        );
    }

    renderLikesLink() {
        const { authed, dispatch, navigator } = this.props;
        const { route } = navigator;

        if (!authed.user) {
            return null;
        }

        return (
            <div className="nav-nav-item">
                <Link
                    className={ classnames({
                        'nav-nav-user-link': true,
                        active: route.path[1] === 'likes'
                    }) }
                    dispatch={ dispatch }
                    route={{ path: ['me', 'likes'] }}
                >
                    <span className="nav-nav-user-link-text">likes</span>
                </Link>
            </div>
        )
    }

    renderPlaylistsPopover() {
        const { authed, navigator } = this.props;
        const { path } = navigator.route;
        const playlist = this.getPlaylist();

        if (!authed.user) {
            return null;
        }

        return (
            <Popover className="nav-nav-item nav-playlists">
                <div className={ classnames({
                    'nav-nav-user-link': true,
                    active: path[1] === 'playlists'
                }) }>
                    <span className="nav-nav-user-link-text">{ playlist }</span>
                    <i className="icon ion-chevron-down"></i>
                    <i className="icon ion-chevron-up"></i>
                </div>

                <div className="nav-playlists-popover popover-content">
                    { this.renderPlaylists() }
                </div>
            </Popover>
        )
    }

    getPlaylist() {
        const { authedPlaylists, navigator } = this.props;
        const { path } = navigator.route;

        if (path[0] === 'me'
        && path[1] === 'playlists'
        && path[2] in authedPlaylists) {
            return authedPlaylists[path[2]].title;
        }

        return 'playlists';
    }

    renderPlaylists() {
        const { authed, authedPlaylists, dispatch } = this.props;
        return authed.playlists.map(playlistId => {
            const playlist = authedPlaylists[playlistId];

            return (
                <Link
                    className="nav-playlist"
                    dispatch={ dispatch }
                    key={ playlistId }
                    route={{ path: ['me', 'playlists', playlistId] }}
                >
                    <div className="nav-playlist-title">
                        { `${ playlist.title } (${ playlist.track_count }` })
                    </div>

                    <div className="nav-playlist-images">
                        { this.renderArtworks(playlist) }
                    </div>
                </Link>
            )
        })
    }

    renderArtworks(playlist) {
        const { songs } = this.props;
        return playlist.tracks.slice(0, 10).map(songId =>
            <img
                className="nav-playlist-image"
                key={ songId }
                src={ getImageUrl(songs[songId].artwork_url) }
            />
        )
    }

    login(e) {
        e.preventDefault();
        const { dispatch } = this.props;
        dispatch(loginUser());
    }

    logout(e) {
        e.preventDefault();
        const { dispatch } = this.props;
        dispatch(logoutUser());
    }

    renderNavUser() {
        const { authed } = this.props;

        if (authed.user) {
            return (
                <Popover className="nav-user">
                    <div className="nav-user-link">
                        <img className="nav-authed-image" src="https://i1.sndcdn.com/avatars-000217074860-ujilem-large.jpg" />
                        <i className="icon ion-chevron-down"></i>
                        <i className="icon ion-chevron-up"></i>
                    </div>
                    <div className="nav-user-popover popover-content">
                        <ul className="nav-user-popover-list">
                            <li className="nav-user-popover-item">
                                <a href="#" onClick={ this.logout }>Log Out</a>
                            </li>
                        </ul>
                    </div>
                </Popover>
            )
        }

        return (
            <Popover className="nav-user">
                <div className="nav-user-link">
                    <i className="icon ion-person"></i>
                    <i className="icon ion-chevron-down"></i>
                    <i className="icon ion-chevron-up"></i>
                </div>
                <div className="nav-user-popover popover-content">
                    <ul className="nav-user-popover-list">
                        <li className="nav-user-popover-item">
                            <a className="button orange block" href="#" onClick={ this.login }>Sign into SoundCloud</a>
                        </li>
                    </ul>
                </div>
            </Popover>
        )
    }

    render() {
        const { dispatch } = this.props;
        return (
            <div className="nav">
                <div className="container clearfix">
                    <div className="nav-logo">
                        <i className="icon ion-radio-waves"></i>
                    </div>

                    <div className="nav-nav float-left">
                        <div className="nav-nav-item">
                            <Link
                                className="nav-nav-item-link active"
                                dispatch={ dispatch }
                                route={{ path: ['songs'] }}
                            >
                                SoundRedux
                            </Link>
                        </div>
                        { this.renderStreamLink() }
                        { this.renderLikesLink() }
                        { this.renderPlaylistsPopover() }
                    </div>

                    <div className="nav-nav float-right">
                        <div className="nav-nav-item">
                            <NavSearch dispatch={ dispatch } />
                        </div>
                        <div className="nav-nav-item">
                            { this.renderNavUser() }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Nav.propTypes = propTypes;

export default Nav;
