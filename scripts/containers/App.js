import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { initEnvironment } from '../actions/environment';
import { initAuth } from '../actions/authed';
import { initNavigator } from '../actions/navigator';

import NavContainer from './NavContainer';
import SongsContainer from './SongsContainer';
import PlayerContainer from './PlayerContainer';
import SongContainer from './SongContainer';
import UserContainer from './UserContainer';
import ModalContainer from './ModalContainer';
import MeContainer from './MeContainer';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  height: PropTypes.number,
  isMobile: PropTypes.bool,
  path: PropTypes.array.isRequired,
  width: PropTypes.number
}

class App extends Component {
  componentDidMount() {
    // 组件装载以后触发
    const { dispatch } = this.props;
    dispatch(initEnvironment());
    dispatch(initAuth());
    dispatch(initNavigator());
  }

  renderContent() {
    // do route
    const { path } = this.props;
    switch (path[0]) {
      case 'songs':
        switch (path.length) {
          case 1:
            return <SongsContainer />
          case 2:
            return <SongContainer />
          default:
            return null;
        }

      case 'users':
        return <UserContainer />;

      case 'me':
        return <MeContainer />;

      default:
        return null;
    }
  }

  render() {
    const { isMobile, height, width } = this.props;

    if (isMobile) {
      return (
        <div className="mobile" style={{ height: `${ height }px`, width: `${ width }px` }}>
          <PlayerContainer />
          { this.renderContent() }
          <NavContainer />
        </div>
      )
    }

    return (
      <div>
        <NavContainer />
        { this.renderContent() }
        <PlayerContainer />
        <ModalContainer />
      </div>
    )
  }
}

App.propTypes = propTypes;

function mapStateToProps(state, ownProps) {
  const { environment, navigator } = state;
  const { isMobile, height, width } = environment;
  const { path } = navigator.route;

  return {
    height,
    isMobile,
    path,
    width,
  }
}

export default connect(mapStateToProps)(App);
