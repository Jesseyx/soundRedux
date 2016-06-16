import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { initEnvironment } from '../actions/environment';
import { initAuth } from '../actions/authed';
import { initNavigator } from '../actions/navigator';

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
    dispatch(initNavigator());
  }

  renderContent() {
    // do route
    return <SongsContainer />
  }

  render() {
    const { isMobile, height, width } = this.props;

    if (isMobile) {
      return (
        <div className="mobile" style={{ height: `${ height }px`, width: `${ width }px` }}>
          { this.renderContent() }
          <NavContainer />
        </div>
      )
    }

    return (
      <div>
        <NavContainer />
        { this.renderContent() }
      </div>
    )
  }
}

App.propTypes = propTypes;

function mapStateToProps(state, ownProps) {
  const { environment, navigator } = state;
  const { isMobile, height, width } = environment;
  const { path } = navigator;

  return {
    isMobile,
    height,
    width,
    path,
  }
}

export default connect(mapStateToProps)(App);
