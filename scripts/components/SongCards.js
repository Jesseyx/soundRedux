import React, { Component, PropTypes } from 'react';
import SongCard from './SongCard';

const propTypes = {
  authed: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  height: PropTypes.number,
  playlist: PropTypes.string.isRequired,
  playlists: PropTypes.object.isRequired,
  songs: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
}

class SongCards extends Component {
  constructor(props) {
    super(props);

    const { playlist, playlists } = props;
    const items = playlist in playlists ? playlists[playlist].items : [];

    this.state = {
      end: items.length,
      paddingBottom: 0,
      paddingTop: 0,
      start: 0,
    }
  }

  componentWillReceiveProps(nextProps) {
    // 暂时先设置 end
    const { playlist, playlists } = nextProps;

    this.setState({
      end: playlists[playlist].items.length,
    })
  }

  renderSongs(start, end) {
    const chunk = 5;
    const { authed, dispatch, playlist, playlists, songs, users } = this.props;
    const items = playlist in playlists ? playlists[playlist].items : [];
    const result = [];
    console.log(start + ', ' + end);

    for (let i = start; i < end; i += chunk) {
      const songCards = items.slice(i, i + chunk).map((songId, j) => {
        const song = songs[songId];
        const user = users[song.user_id];
        const index = i + j;

        return (
          <div className="col-1-5 clearfix" key={ `${ index }-${ song.id }` }>
            <SongCard
              authed={ authed }
              dispatch={ dispatch }
              isActive={ false }
              song={ song }
              user={ user }
            />
          </div>
        )
      });

      if (songCards.length < chunk) {
        for (let j = 0; i < chunk - songCards.length + 1; j++) {
          SongCards.push(
            <div className="col-1-5" key={ `song-placeholder-${ (i + j) }` } />
          )
        }
      }

      result.push(
        <div className="songs-row grid" key={ `songs-row-${ i }` }>
          { songCards }
        </div>
      )
    }

    return result;
  }

  render() {
    const { playlist, playlists } = this.props;
    const { end, paddingBottom, paddingTop, start } = this.state;
    const isFetching = playlist in playlists ? playlists[playlist].isFetching : false;

    return (
      <div className="content">
        <div className="padder" style={{ height: paddingTop }}></div>
        { this.renderSongs(start, end) }
      </div>
    )
  }
}

SongCards.propTypes = propTypes;

export default SongCards;