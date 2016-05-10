import React, { Component, PropTypes } from 'react';
import Popover from './Popover';

const propTypes = {
  authed: PropTypes.object,
  className: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  isLiked: PropTypes.bool,
  songId: PropTypes.number,
}

class SongHeart extends Component {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
    this.toggleLike = this.toggleLike.bind(this);
  }

  login(e) {
    e.preventDefault();
    console.log('Do login');
  }

  toggleLike(e) {
    e.preventDefault();
    console.log('Do toggleLike');
  }

  render() {
    const { authed, className, isLiked } = this.props;

    if (!authed.user) {
      return (
        <Popover
          className={ `song-heart ${ className }` }
        >
          <i className="icon ion-ios-heart" />
          <div className="song-heart-popover popover-content">
            <ul className="nav-user-popover-list">
              <li className="nav-user-popover-item">
                <a href="#" className="button orange block" onClick={ this.login }>
                  Sign into SoundCloud
                </a>
              </li>
            </ul>
          </div>
        </Popover>
      )
    }
    
    return (
      <a
        className={ `song-heart ${ className }${ isLiked ? ' liked' : '' }` }
        href="#"
        onClick={ this.toggleLike }
      >
        <i className="icon ion-ios-heart" />
      </a>
    )
  }
}

SongHeart.propTypes = propTypes;

export default SongHeart;
