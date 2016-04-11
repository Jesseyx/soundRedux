import React, { Component, PropTypes } from 'react';
import Popover from './Popover';

const propTypes = {

}

class Nav extends Component {
  constructor(props) {
    super(props);
  }

  renderNavUser() {
    const { authed } = this.props;

    if (authed.user) {
      return (
        <h1>哈哈哈</h1>
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
              <a className="button orange block">Sign into SoundCloud</a>
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
              <a className="nav-nav-item-link active" href="#">SoundRedux</a>
            </div>
          </div>

          <div className="nav-nav float-right">
            <div className="nav-nav-item">
              <div className="nav-search">
                <i className="icon ion-search"></i>
                <input className="nav-search-input" type="text" placeholder="SEARCH" />
              </div>
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