import React, { Component, PropTypes } from 'react';

const propTypes = {

}

class Songs extends Component {
  render() {
    return (
      <div className="songs">
        <div className="toolbar">
          <div className="container">
            <div className="toolbar-items">
              <a className="toolbar-item toolbar-genre">chilly</a>
              <a className="toolbar-item toolbar-genre">deep</a>
              <a className="toolbar-item toolbar-genre">dubstep</a>
              <a className="toolbar-item toolbar-genre">house</a>
              <a className="toolbar-item toolbar-genre">progressive</a>
              <a className="toolbar-item toolbar-genre">tech</a>
              <a className="toolbar-item toolbar-genre">trance</a>
              <a className="toolbar-item toolbar-genre">tropical</a>

              <div className="toolbar-item toolbar-filter toolbar-times">
                <i className="icon ion-funnel"></i>
                <a className="toolbar-time">7 days</a>
                <a className="toolbar-time">30 days</a>
                <a className="toolbar-time">90 days</a>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="content">
            <div className="padder"></div>
            <div className="songs-row grid">
              <div className="col-1-5 clearfix">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Songs.propTypes = propTypes;

export default Songs;