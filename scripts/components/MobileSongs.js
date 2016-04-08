import React, { Component, PropTypes } from 'react';

const propTypes = {

}

class MobileSongs extends Component {
  render() {
    return (
      <div className="mobile-songs">
        <a className="mobile-song-list-item">
          <img className="mobile-song-list-item-image" src="https://i1.sndcdn.com/artworks-000069180943-mnvfku-large.jpg" />
          <div className="mobile-song-list-item-info">
            <div className="mobile-song-list-item-title">
              #SELFIE
            </div>
            <div className="mobile-song-list-item-user">
              The Chainsmokers
            </div>
          </div>
        </a>
      </div>
    )
  }
}

MobileSongs.propTypes = propTypes;

export default MobileSongs;