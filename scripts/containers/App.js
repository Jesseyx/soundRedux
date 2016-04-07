import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import NavContainer from './NavContainer';
import SongsContainer from './SongsContainer';

const propTypes = {

}

class App extends Component {
  render() {
    return (
      <div>
        <NavContainer />
        <SongsContainer />
      </div>
    )
  }
}

App.propTypes = propTypes;

function mapStateToProps(props, ownProps) {
  return {

  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);