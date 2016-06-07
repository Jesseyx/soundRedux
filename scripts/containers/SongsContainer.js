import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Songs from '../components/Songs';
import MobileSongs from '../components/MobileSongs';
import { fetchSongsIfNeeded } from '../actions/playlists';

const propTypes = {
  isMobile: PropTypes.bool
}

class SongsContainer extends Component {
  render() {
    const { isMobile } = this.props;

    if (isMobile) {
      return <MobileSongs { ...this.props } />
    }

    return <Songs { ...this.props } />
  }
}

SongsContainer.propTypes = propTypes;

function mapStateToProps(state, ownProps) {
  const { authed, entities, environment, navigator, playlists } = state;
  const { height, isMobile } = environment;
  const { songs, users } = entities;
  const { query } = navigator.route;

  const time = query && query.t ? query.t : null;
  let playlist = query && query.q ? query.q : 'house';
  if (time) {
    playlist = `${ playlist } - ${ time }`;
  }

  return {
    authed,
    height,
    isMobile,
    playlist,
    playlists,
    scrollFunc: fetchSongsIfNeeded.bind(null, playlist),
    songs,
    time,
    users,
  }
}

export default connect(mapStateToProps)(SongsContainer);
