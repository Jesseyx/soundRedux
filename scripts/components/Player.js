import React, { Component, PropTypes } from 'react';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  player: PropTypes.object.isRequired,
  playingSongId: PropTypes.number,
  playlists: PropTypes.object.isRequired,
  song: PropTypes.object,
  songs: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
}

class Player extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="player">
        <audio id="audio" ref="audio" src="" />
        <div className="container">
          <div className="player-main">

            <div className="player-section player-info">
              <img className="player-image" src="https://i1.sndcdn.com/artworks-000041124475-2lu7vg-large.jpg" />
              <div className="song-card-details">
                <a className="song-card-title" href="/#/songs/79973942" title="Lana Del Rey - Summertime Sadness (Cedric Gervais Remix)">Summertime Sadness</a>
                <a className="song-card-user-username" href="/#/users/5614319" title="House">House</a>
              </div>
            </div>

            <div className="player-section">
              <div className="player-button">
                <i className="icon ion-ios-rewind" />
              </div>
              <div className="player-button">
                <i className="icon ion-ios-play" />
              </div>
              <div className="player-button">
                <i className="icon ion-ios-fastforward" />
              </div>
            </div>

            <div className="player-section player-seek">
              <div className="player-seek-bar-wrap">
                <div className="player-seek-bar" ref="seekBar">
                  <div className="player-seek-handle"></div>
                </div>
              </div>

              <div className="player-time">
                <span>00:08</span>
                <span className="player-time-divider">/</span>
                <span>06:54</span>
              </div>
            </div>

            <div className="player-section">
              <div className="player-button">
                <i className="icon ion-loop" />
              </div>
              <div className="player-button">
                <i className="icon ion-shuffle" />
              </div>
              <div className="player-button top-right">
                <i className="icon ion-android-list" />
              </div>
              <div className="player-button player-volume-button">
                <div className="player-volume-button-wrap">
                  <i className="icon ion-android-volume-up" />
                  <i className="icon ion-android-volume-mute" />
                </div>
              </div>
              <div className="player-volume">
                <div className="player-seek-bar-wrap">
                  <div className="player-seek-bar" ref="volumeBar">
                    <div className="player-seek-duration-bar" style={{ width: '100%' }}>
                      <div className="player-seek-handle"></div>
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

Player.propTypes = propTypes;

export default Player;
