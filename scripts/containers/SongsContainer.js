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
  const { environment } = state;
  const { isMobile } = environment;

  return {
    isMobile
  }
}

export default connect(mapStateToProps)(SongsContainer);