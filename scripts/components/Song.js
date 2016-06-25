import React, { Component, PropTypes } from 'react';

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
  render() {
    return (
      <div className="container">
        <div className="content">
          <div className="grid">
            <div className="col-7-10">
              <div className="song card">
                <div className="song-main">
                  <div className="song-detail">
                    <div className="song-image" style={{ backgroundImage: 'url(https://i1.sndcdn.com/artworks-000041124475-2lu7vg-t300x300.jpg)' }} />
                    <div className="song-info">
                      <div className="song-title">
                        Lana Del Rey - Summertime Sadness (Cedric Gervais Remix)
                      </div>

                      <div className="song-user">
                        <div className="song-user-image" style={{ backgroundImage: 'url(https://i1.sndcdn.com/avatars-000217622831-lwr9mn-large.jpg)' }} />
                        <a className="song-username" href="/#/users/5614319" title="">House</a>
                      </div>

                      <div className="song-stats">
                        <div className="song-stat">
                          <i className="icon ion-play" />
                          <span>21,381,175</span>
                        </div>
                        <div className="song-stat">
                          <i className="icon ion-chatbubble" />
                          <span>10,342</span>
                        </div>
                      </div>

                      <div className="song-description">
                        ▶ Cedric Merchandise - bit.ly/CedricEFam

                        Buy it Now: http://smarturl.it/SummertimeCedric
                        ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
                        Follow Cedric Gervais:
                        http://www.cedricgervais.com/
                        http://facebook.com/cedgerv
                        http://twitter.com/cedricgervais
                        SC: http://soundcloud.com/cedricgervais

                        Follow Lana Del Rey:
                        http://www.lanadelrey.com/

                        Follow Spinnin' Records:
                        http://www.spinninrecords.com/
                        https://www.facebook.com/SpinninRecords

                        http://www.House.NET
                        •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
                        Send all demos to dropbox@house.NET to have your track featured!
                        •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
                        Sounds like: Avicii, David Guetta, Calvin Harris, Nicky Romero, Afrojack, Chuckie, Skrillex, Zedd, Steve Aoki, Showtek, Kill The Noise, Porter Robinson, Dada Life, Wolfgang Gartner, Sasha, Bingo Players, R3hab, DeadMau5, Above & Beyond, John Dahlbeck, Progressive, Dance Music, EDM, Bass, Electro, Electro House, Complextro, Moombahton, OWSLA, Ultra, Armada, Dim Mak, Spinnin' Records, Anjunabeats, Big Beat, Wall Recordings and Mau5trap
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
