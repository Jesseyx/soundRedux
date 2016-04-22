import React, { Component, PropTypes } from 'react';
import { loginUser, logoutUser } from '../actions/authed';
import Popover from './Popover';
import Link from './Link';
import NavSearch from './NavSearch';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  authed: PropTypes.object.isRequired
}

class Nav extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  renderStreamLink() {
    const { dispatch, authed } = this.props;
    if (!authed.user) {
      return null;
    }

    return (
      <div className="nav-nav-item">
        <Link
          className="nav-nav-user-link"
          dispatch={ dispatch }
          route={{ path: ['me', 'stream' ]}}
        >
          <span className="nav-nav-user-link-text">stream</span>
        </Link>
      </div>
    );
  }

  login(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(loginUser());
  }

  logout(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(logoutUser());
  }

  renderNavUser() {
    const { authed } = this.props;

    if (authed.user) {
      return (
        <Popover className="nav-user">
          <div className="nav-user-link">
            <img className="nav-authed-image" src="https://i1.sndcdn.com/avatars-000217074860-ujilem-large.jpg" />
            <i className="icon ion-chevron-down"></i>
            <i className="icon ion-chevron-up"></i>
          </div>
          <div className="nav-user-popover popover-content">
            <ul className="nav-user-popover-list">
              <li className="nav-user-popover-item">
                <a href="#" onClick={ this.logout }>Log Out</a>
              </li>
            </ul>
          </div>
        </Popover>
      )
    }

    return (
      <Popover className="nav-user">
        <div className="nav-user-link">
          <i className="icon ion-person"></i>
          <i className="icon ion-chevron-down"></i>
          <i className="icon ion-chevron-up"></i>
        </div>
        <div className="nav-user-popover popover-content">
          <ul className="nav-user-popover-list">
            <li className="nav-user-popover-item">
              <a className="button orange block" href="#" onClick={ this.login }>Sign into SoundCloud</a>
            </li>
          </ul>
        </div>
      </Popover>
    )
  }

  render() {
    const { dispatch } = this.props;
    return (
      <div className="nav">
        <div className="container clearfix">
          <div className="nav-logo">
            <i className="icon ion-radio-waves"></i>
          </div>

          <div className="nav-nav float-left">
            <div className="nav-nav-item">
              <Link
                className="nav-nav-item-link active"
                dispatch={ dispatch }
                route={{ path: ['songs'] }}
              >
                SoundRedux
              </Link>
            </div>
            { this.renderStreamLink() }

          </div>

          <div className="nav-nav float-right">
            <div className="nav-nav-item">
              <NavSearch dispatch={ dispatch } />
            </div>
            <div className="nav-nav-item">
              { this.renderNavUser() }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Nav.propTypes = propTypes;

export default Nav;