import React, { Component, PropTypes } from 'react';
import Link from './Link';
import SongHeart from './SongHeart';
import { IMAGE_SIZES} from '../constants/SongConstants';
import { getImageUrl } from '../utils/SongUtils';
import { formatSongTitle } from '../utils/FormatUtils';

const propTypes = {
  authed: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  song: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

class SongCard extends Component {
  renderTogglePlayButton() {
    const { isActive } = this.props;

    if (isActive) {

    }

    return (
      <div className="toggle-play-button">
        <i className="toggle-play-button-icon ion-ios-play"></i>
      </div>
    )
  }
  render() {
    const { authed, dispatch, isActive, song, user } = this.props;
    const image = getImageUrl(song.artwork_url, IMAGE_SIZES.LARGE);

    return (
      <div className={ `card song-card${ isActive ? ' active' : '' }` }>
        <div className="song-card-image" style={{ backgroundImage: `url(${ image })` }}>
          { this.renderTogglePlayButton() }
        </div>

        <div className="song-card-user clearfix">
          <img alt="User avatar"
               className="song-card-user-image"
               src={ getImageUrl(user.avatar_url) } />
          <div className="song-card-details">
            <Link
              className="song-card-title"
              dispatch={ dispatch }
              route={{ path: ['songs', song.id] }}
              title={ song.title }
            >
              { formatSongTitle(song.title) }
            </Link>

            <Link
              className="song-card-user-username"
              dispatch={ dispatch }
              route={{ path: ['users', user.id] }}
              title={ user.username }
            >
              { user.username }
            </Link>

            <SongHeart
              authed={ authed }
              className="song-card-heart"
              dispatch={ dispatch }
              isLiked={ false }
              songId={ song.id }
            />
          </div>
        </div>
      </div>
    )
  }
}

SongCard.propTypes = propTypes;

export default SongCard;