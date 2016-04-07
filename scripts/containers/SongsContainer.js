import React, { Component } from 'react';
import { connect } from 'react-redux';
import Songs from '../components/Songs';

class SongsContainer extends Component {
  render() {
    return (
      <Songs />
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {

  }
}

export default connect(mapStateToProps)(SongsContainer);