import React, { Component, PropTypes } from 'react';
import { Motion, presets, spring } from 'react-motion';

import Link from './Link';

import { GENRES } from '../constants/SongConstants';
import { loginUser, logoutUser } from '../actions/authed';
import { getImageUrl } from '../utils/SongUtils';

const propTypes = {
  authed: PropTypes.object.isRequired,
  authedPlaylists: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  navigator: PropTypes.object.isRequired,
};

class MobileNav extends Component {
  constructor(props) {
    super(props);

    this.toggleGenreMenuOpen = this.toggleGenreMenuOpen.bind(this);
    this.toggleUserMenuOpen = this.toggleUserMenuOpen.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);

    this.state = {
      isGenreMenuOpen: false,
      isUserMenuOpen: false,
    };
  }

  toggleGenreMenuOpen(e) {
    if (!this.state.isUserMenuOpen) {
      e.preventDefault();
      this.setState({ isGenreMenuOpen: !this.state.isGenreMenuOpen });
    }
  }

  toggleUserMenuOpen(e) {
    e.preventDefault();
    if (!this.state.isGenreMenuOpen) {
      this.setState({ isUserMenuOpen: !this.state.isUserMenuOpen });
    }
  }

  login(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(loginUser(false));
  }

  logout(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(logoutUser());
  }

  getPlaylist() {
    const { navigator } = this.props;
    const { query } = navigator.route;
    const time = query && query.t ? query.t : null;
    let playlist = query && query.q ? query.q : 'house';

    if (time) {
      playlist = `${playlist} - ${time}`;
    }

    return playlist;
  }

  getPlaylistDetails() {
    const { authed, authedPlaylists } = this.props;
    const playlistNames = [];
    let playlistIds = [];
    let playlistDetails = {};

    if (authed.playlists) {
      playlistIds = authed.playlists;
    }

    if (playlistIds) {
      for (const n of playlistIds) {
        playlistNames.push(`PLAYLIST: ${authedPlaylists[n].title}`);
      }
    }

    playlistDetails = {
      playlistNames,
      playlistIds,
    };

    return playlistDetails;
  }

  renderGenreMenu(isGenreMenuOpen, playlist) {
    return (
      <Motion
        style={{ height: spring(isGenreMenuOpen ? (GENRES.length - 1) * 50 : 0, presets.stiff) }}
      >
        {
          ({ height }) =>
            <div
              className="mobile-nav-menu"
              style={{ height }}
              onClick={this.toggleGenreMenuOpen}
            >
              { this.renderGenresTabs(playlist) }
            </div>
        }
      </Motion>
    );
  }

  renderGenresTabs(playlist) {
    return GENRES
      .filter(genre => genre !== playlist)
      .map(genre =>
        <Link
          className="mobile-nav-tab"
          dispatch={this.props.dispatch}
          route={{ path: ['songs'], query: { q: genre } }}
          key={genre}
        >
          { genre }
        </Link>
      );
  }

  renderUserMenu(isUserMenuOpen, playlist, playlistDetails) {
    const { playlistNames } = playlistDetails;
    const tabs = ['stream', 'likes', ...playlistNames];

    return (
      <Motion
        style={{ height: spring(isUserMenuOpen ? (4) * 50 : 0, presets.stiff) }}
      >
        {
          ({ height }) =>
            <div
              className="mobile-nav-menu mobile-scrollable"
              style={{ height }}
              onClick={this.toggleUserMenuOpen}
            >
              { this.renderUserTabs(tabs) }
            </div>
        }
      </Motion>
    );
  }

  renderUserTabs(tabs) {
    return tabs
      .map(tab =>
        <Link
          className="mobile-nav-tab"
          dispatch={this.props.dispatch}
          route={{ path: ['me', tab] }}
          key={tab}
        >
          { tab }
        </Link>
      );
  }

  renderGenresOptions(isGenreMenuOpen, playlist) {
    return (
      <div className="mobile-nav-items">
        <a
          className="mobile-nav-item"
          href="#"
          onClick={this.toggleGenreMenuOpen}
        >
          { playlist }

          <i className={isGenreMenuOpen ? 'ion-chevron-down' : 'ion-chevron-up'} />
        </a>
      </div>
    );
  }

  renderUserOptions() {
    const { authed } = this.props;

    if (authed.user) {
      return (
        <div className="mobile-nav-items">
          <a
            className="mobile-nav-item mobile-nav-auth"
            href="#"
            onClick={this.toggleUserMenuOpen}
          >
            <img
              className="mobile-nav-authed-image"
              src={getImageUrl(authed.user.avatar_url)}
              alt="User avatar"
            />
            { authed.user.username }
          </a>

          <a
            className="mobile-nav-item mobile-nav-auth"
            href="#"
            onClick={this.logout}
          >
            { "Log Out" }
          </a>
        </div>
      );
    }

    return (
      <div className="mobile-nav-items">
        <a
          className="mobile-nav-item mobile-nav-auth"
          href="#"
          onClick={this.login}
        >
          { "Sign into SoundCloud" }
          <i className="icon ion-person" />
        </a>
      </div>
    );
  }

  render() {
    const playlist = this.getPlaylist();
    const { isGenreMenuOpen, isUserMenuOpen } = this.state;
    const playlistDetails = this.getPlaylistDetails();

    return (
      <div className="mobile-nav">
        { this.renderGenreMenu(isGenreMenuOpen, playlist) }

        { this.renderUserMenu(isUserMenuOpen, playlist, playlistDetails) }

        { this.renderGenresOptions(isGenreMenuOpen, playlist) }

        { this.renderUserOptions() }
      </div>
    );
  }
}

MobileNav.propTypes = propTypes;

export default MobileNav;
