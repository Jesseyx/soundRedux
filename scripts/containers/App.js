import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import NavContainer from './NavContainer';

const propTypes = {

}

class App extends Component {
  render() {
    return (
      <NavContainer />
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