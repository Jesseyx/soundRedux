import React, { Component, PropTypes } from 'react';
import Toolbar from './Toolbar';
import SongCards from './SongCards';

const propTypes = {
  authed: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  height: PropTypes.number,
  playlist: PropTypes.string,
  playlists: PropTypes.object.isRequired,
  songs: PropTypes.object.isRequired,
  time: PropTypes.number,
  users: PropTypes.object.isRequired,
}

class Songs extends Component {
  render() {
    const { authed, dispatch, height, playlist, playlists, songs, time, users } = this.props;

    return (
      <div className="songs">
        <Toolbar
          dispatch={ dispatch }
          playlist={ playlist }
          time={ time }
        />

        <div className="container">
          <SongCards
            authed={ authed }
            dispatch={ dispatch }
            height={ height }
            playlist={ playlist }
            playlists={ playlists }
            songs={ songs }
            users={ users }
          />
        </div>
      </div>
    )
  }
}

Songs.propTypes = propTypes;

export default Songs;