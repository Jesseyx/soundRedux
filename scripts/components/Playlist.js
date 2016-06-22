import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { getImageUrl } from '../utils/SongUtils';

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

  changeShownPlaylistIndex(index) {

  }

  isActiveSong(currentPlaylist, currentSongIndex, i, shownPlaylist) {
    return (currentPlaylist === shownPlaylist) && (currentSongIndex === i);
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
    const nextPlaylistFunc = this.changeShownPlaylistIndex(this, shownPlaylistIndex + 1);

    const items = playlists[shownPlaylist].items.map(function (songId, i) => {
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
        
      >
        <div className="playlist-header">
          <a
            className="playlist-header-button"
            href="#"
          >
            <i className="icon ion-ios-arrow-back" />
          </a>
          <div className="playlist-header-title">
            House
          </div>
          <a
            className="playlist-header-button"
            href="#"
          >
            <i className="icon ion-ios-arrow-forward" />
          </a>
        </div>

        <div className="playlist-body">
          <ul className="playlist-songs">

          </ul>
        </div>

        <div className="playlist-footer">
          11 songs
        </div>
      </div>
    )
  }
}

Playlist.propTypes = propTypes;

export default Playlist;
