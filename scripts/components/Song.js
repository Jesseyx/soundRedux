import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import { fetchSongIfNeeded } from '../actions/songs';
import { getImageUrl } from '../utils/SongUtils';
import { IMAGE_SIZES } from '../constants/SongConstants';
import { playSong } from '../actions/player';
import { addCommas } from '../utils/FormatUtils';
import { SONG_PLAYLIST_SUFFIX } from '../constants/PlaylistConstants';

import Spinner from '../components/Spinner';
import TogglePlayButtonContainer from '../containers/TogglePlayButtonContainer';
import Link from '../components/Link';
import SongHeartCount from '../components/SongHeartCount';

const propTypes = {
  authed: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  height: PropTypes.number,
  player: PropTypes.object.isRequired,
  playingSongId: PropTypes.number,
  playlists: PropTypes.object.isRequired,
  songId: PropTypes.number,
  songs: PropTypes.object.isRequired,
  // sticky: PropTypes.bool.isRequired,
  users: PropTypes.object.isRequired,
}

class Song extends Component {
  componentWillMount() {
    const { dispatch, songId } = this.props;
    dispatch(fetchSongIfNeeded(songId));
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, songId } = this.props;
    if (nextProps.songId !== songId) {
      dispatch(fetchSongIfNeeded());
    }
  }

  playSong(i) {
    const { dispatch, songId, songs } = this.props;
    const song = songs[songId];

    if (!song) {
      return;
    }

    dispatch(playSong(song.title + SONG_PLAYLIST_SUFFIX, i));
  }

  renderTogglePlayButton() {
    const { playingSongId, songId } = this.props;
    const isActive = playingSongId && playingSongId === songId;
    const playSongFunc = this.playSong.bind(this, 0);

    if (isActive) {
      return <TogglePlayButtonContainer />;
    }

    return (
        <div className="toggle-play-button" onClick={ playSongFunc }>
          <i className="toggle-play-button-icon ion-ios-play" />
        </div>
    );
  }

  render() {
    const { authed, dispatch, player, playingSongId, songId, songs, users } = this.props;
    const song = songs[songId];
    if (!song) {
      return <Spinner />;
    }

    const isActive = Boolean(playingSongId && playingSongId === songId);
    const image = getImageUrl(song.artwork_url, IMAGE_SIZES.LARGE);
    const playSongFunc = this.playSong.bind(this, 0);
    const user = song.user_id in users ? users[song.user_id] : {};

    return (
      <div className="container">
        <div className="content">
          <div className="grid">
            <div className="col-7-10">
              <div className={ classNames({
                song: true,
                card: true,
                active: isActive,
              })}>
                <div className="song-main">
                  <div className="song-detail">
                    <div
                        className="song-image"
                        style={{ backgroundImage: `url(${ image })` }}
                    >
                      { this.renderTogglePlayButton() }
                    </div>
                    <div className="song-info">
                      <div className="song-title">
                        { song.title }
                      </div>

                      <div className="song-user">
                        <div
                            className="song-user-image"
                            style={{ backgroundImage: `url(${ getImageUrl(user.avatar_url) })` }}
                        />
                        <Link
                            className="song-username"
                            dispatch={ dispatch }
                            route={{ path: ['users', user.id] }}
                        >
                          { user.username }
                        </Link>
                      </div>

                      <div className="song-stats">
                        <SongHeartCount
                            authed={ authed }
                            count={ song.likes_count ? song.likes_count : song.favoritings_count }
                            dispatch={ dispatch }
                            songId={ songId }
                        />
                        <div className="song-stat">
                          <i className="icon ion-play" />
                          <span>{ addCommas(song.playback_count) }</span>
                        </div>
                        <div className="song-stat">
                          <i className="icon ion-chatbubble" />
                          <span>{ addCommas(song.comment_count) }</span>
                        </div>
                      </div>

                      <div className="song-description">
                        { song.description }
                      </div>
                    </div>
                  </div>

                  <div className="song-waveform">
                    <div className="waveform">
                      <canvas className="waveform-canvas" />
                      <div className="waveform-image-container">
                        <img className="waveform-image" src="//w1.sndcdn.com/Ekkfiki0rseo_m.png" />
                        <div className="waveform-image-bg" style={{ width: '0%' }} />
                        <div>
                          <div className="waveform-play-highlight" />
                          <div className="waveform-play-highlight-icon">
                            <i className="icon ion-ios-play" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="tab-content">
                <div className="song-list-item">
                  <div className="song-list-item-detail">
                    <div className="song-list-item-image" style={{ backgroundImage: 'url(https://i1.sndcdn.com/artworks-000168430917-7tx2wv-t300x300.jpg)' }}>
                      <div className="toggle-play-button">
                        <i className="toggle-play-button-icon ion-ios-play" />
                      </div>
                    </div>
                    <div className="song-list-item-info">
                      <a className="song-list-item-title" href="/#/songs/270220008" title="">
                        BASS CADETS, Ditta &amp; Dumont - House Party
                      </a>
                      <div className="song-list-item-info-extra">
                        <div className="song-list-item-user">
                          <div className="song-list-item-user-image" style={{ backgroundImage: 'url(https://i1.sndcdn.com/avatars-000217622831-lwr9mn-large.jpg)' }} />
                          <a className="song-list-item-username" href="/#/users/5614319" title="">
                            House
                          </a>
                        </div>
                        <div className="song-list-item-stats">
                          <div className="song-list-item-stat song-heart-count undefined popover">
                            <div>
                              <i className="icon ion-ios-heart" />
                              <span>535</span>
                            </div>
                          </div>
                          <div className="song-list-item-stat">
                            <i className="icon ion-play" />
                            <span>512</span>
                          </div>
                          <div className="song-list-item-stat">
                            <i className="icon ion-chatbubble" />
                            <span>11</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="song-list-item-waveform">
                    <div className="waveform">
                      <canvas className="waveform-canvas" />
                      <div className="waveform-image-container">
                        <img className="waveform-image" src="//w1.sndcdn.com/dr3fitcm6CH7_m.png" />
                        <div className="waveform-image-bg" style={{ width: '0%' }} />
                        <div>
                          <div className="waveform-play-highlight" />
                          <div className="waveform-play-highlight-icon">
                            <i className="icon ion-ios-play" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-3-10">
              <div className="sidebar">
                <div className="comments">
                  <div className="comments-header">
                    <div className="comments-header-title">Comments</div>
                    <div className="switch">
                      <div className="switch-button" />
                    </div>
                  </div>

                  <div className="sidebar-content">
                    <div className="comment">
                      <div className="comment-image" style={{ backgroundImage: 'url(https://i1.sndcdn.com/avatars-000045148736-lwtuwb-t300x300.jpg)' }} />
                      <div className="comment-info">
                        <div className="comment-comment">
                          nice:))
                        </div>
                        <div className="comment-username">
                          owencranxzz
                        </div>
                      </div>
                      <div className="comment-time">00:00</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Song.propTypes = propTypes;

export default Song;
