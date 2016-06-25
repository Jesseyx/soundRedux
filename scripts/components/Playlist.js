import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { getImageUrl } from '../utils/SongUtils';
import { playSong } from '../actions/player';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  player: PropTypes.object.isRequired,
  playlists: PropTypes.object.isRequired,
  songs: PropTypes.object.isRequired,
}

class Playlist extends  Component {
  constructor(props) {
    super(props);
    this.state = {
      shownPlaylistIndex: null,
    }
  }

  getShownPlaylistIndex() {
    const { selectedPlaylists } = this.props.player;
    const { shownPlaylistIndex } = this.state;
    const lastPlaylistIndex = selectedPlaylists.length - 1;

    if (shownPlaylistIndex === null) {
      return lastPlaylistIndex;
    }

    return shownPlaylistIndex;
  }

  getShownPlaylist(shownPlaylistIndex) {
    const { selectedPlaylists } = this.props.player;
    return selectedPlaylists[shownPlaylistIndex];
  }

  changeShownPlaylistIndex(index, e) {
    e.preventDefault();
    const { player } = this.props;
    const { selectedPlaylists } = player;
    if (index < 0 || index >= selectedPlaylists.length) {
      return;
    }

    this.setState({ shownPlaylistIndex: index });
  }

  isActiveSong(currentPlaylist, currentSongIndex, i, shownPlaylist) {
    return (currentPlaylist === shownPlaylist) && (currentSongIndex === i);
  }

  playSong(playlist, index) {
    const { dispatch } = this.props;
    dispatch(playSong(playlist, index));
    this.setState({
      shownPlaylistIndex: null,
    })
  }

  handleMouseEnter() {
    // document.body.style.overflow = 'hidden';
  }

  handleMouseLeave() {
    // document.body.style.overflow = 'auto';
  }

  render() {
    const { player, playlists, songs } = this.props;
    const { currentSongIndex, selectedPlaylists } = player;
    const currentPlaylist = selectedPlaylists[selectedPlaylists.length - 1];
    const shownPlaylistIndex = this.getShownPlaylistIndex();
    const shownPlaylist = this.getShownPlaylist(shownPlaylistIndex);
    const stopPropagationFunc = e => { e.stopPropagation() };

    const prevPlaylistFunc = this.changeShownPlaylistIndex.bind(this, shownPlaylistIndex - 1);
    const isFirstPlaylist = shownPlaylistIndex === 0;
    const isLastPlaylist = shownPlaylistIndex === selectedPlaylists.length - 1;
    const nextPlaylistFunc = this.changeShownPlaylistIndex.bind(this, shownPlaylistIndex + 1);

    const items = playlists[shownPlaylist].items.map((songId, i) => {
      const song = songs[songId];
      const isActiveSong = this.isActiveSong(currentPlaylist, currentSongIndex, i, shownPlaylist);
      const playSongFunc = this.playSong.bind(this, shownPlaylist, i);

      return (
        <li
          className={ classnames({
            'playlist-song': true,
            active: isActiveSong,
          }) }
          key={ `${ song.id }-${ i }` }
          onClick={ playSongFunc }
        >
          <img className="playlist-song-image" src={ getImageUrl(song.artwork_url) } />
          <div className="playlist-song-title">{ song.title }</div>
        </li>
      )
    })

    return (
      <div
        className="popover-content playlist"
        onClick={ stopPropagationFunc }
        onMouseEnter={ this.handleMouseEnter }
        onMouseLeave={ this.handleMouseLeave }
      >
        <div className="playlist-header">
          <a
            className={ classnames({
              'playlist-header-button': true,
              disabled: isFirstPlaylist,
            }) }
            href="#"
            onClick={ prevPlaylistFunc }
          >
            <i className="icon ion-ios-arrow-back" />
          </a>
          <div className="playlist-header-title">
            { shownPlaylist.split('|')[0] }
          </div>
          <a
            className={ classnames({
              'playlist-header-button': true,
              disabled: isLastPlaylist,
            }) }
            href="#"
            onClick={ nextPlaylistFunc }
          >
            <i className="icon ion-ios-arrow-forward" />
          </a>
        </div>

        <div className="playlist-body">
          <ul className="playlist-songs">
            { items }
          </ul>
        </div>

        <div className="playlist-footer">
          { items.length + (items.length === 1 ? ' Song' : ' Songs') }
        </div>
      </div>
    )
  }
}

Playlist.propTypes = propTypes;

export default Playlist;
