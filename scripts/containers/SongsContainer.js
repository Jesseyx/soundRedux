import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Songs from '../components/Songs';
import MobileSongs from '../components/MobileSongs';

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
  const { entities, environment, navigator } = state;
  const { isMobile } = environment;
  const { songs, users } = entities;
  const { query } = navigator.route;

  const time = query && query.t ? query.t : null;
  let playlist = query && query.q ? query.q : 'house';
  if (time) {
    playlist = `${ playlist } - ${ time }`;
  }

  return {
    isMobile,
    playlist,
    songs,
    time,
    users,
  }
}

export default connect(mapStateToProps)(SongsContainer);