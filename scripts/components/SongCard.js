import React, { Component, PropTypes } from 'react';

const propTypes = {
  authed: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  song: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

class SongCard extends Component {
  render() {
    return (
      <div className="card song-card">
        <div className="song-card-image" style={{ backgroundImage: 'url(https://i1.sndcdn.com/artworks-000041124475-2lu7vg-t300x300.jpg)' }}>
          <div className="toggle-play-button">
            <i className="toggle-play-button-icon ion-ios-play"></i>
          </div>
        </div>

        <div className="song-card-user clearfix">
          <img alt="" className="song-card-user-image" src="https://i1.sndcdn.com/avatars-000171638202-jhc1ep-large.jpg" />
          <div className="song-card-details">
            <a className="song-card-title">Summertime Sadness</a>
            <a className="song-card-user-username">House</a>
            <div className="song-heart song-card-heart popover">
              <i className="icon ion-ios-heart"></i>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

SongCard.propTypes = propTypes;

export default SongCard;