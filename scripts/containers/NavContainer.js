import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Nav from '../components/Nav';

const propTypes = {

}

class NavContainer extends Component {
  render() {
    return (
      <Nav />
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {

  }
}

NavContainer.propTypes = propTypes;

export default connect(mapStateToProps)(NavContainer);