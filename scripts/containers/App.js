import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { initEnvironment } from '../actions/environment';
import { initAuth } from '../actions/authed';

import NavContainer from './NavContainer';
import SongsContainer from './SongsContainer';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  isMobile: PropTypes.bool,
  height: PropTypes.number,
  width: PropTypes.number
}

class App extends Component {
  componentDidMount() {
    // 组件开始装载前
    const { dispatch } = this.props;
    dispatch(initEnvironment());
    dispatch(initAuth());
  }

  render() {
    const { isMobile, height, width } = this.props;

    if (isMobile) {
      return (
        <div className="mobile" style={{ height: `${ height }px`, width: `${ width }px` }}>
          <SongsContainer />
          <NavContainer />
        </div>
      )
    }

    return (
      <div>
        <NavContainer />
        <SongsContainer />
      </div>
    )
  }
}

App.propTypes = propTypes;

function mapStateToProps(state, ownProps) {
  const { environment } = state;
  const { isMobile, height, width } = environment;
  return {
    isMobile,
    height,
    width
  }
}

export default connect(mapStateToProps)(App);