import React, { Component, PropTypes } from 'react';

const propTypes = {

}

class MobileNav extends Component {
  render() {
    return (
      <div className="mobile-nav">
        <div className="mobile-nav-menu" style={{ height: '350px' }}>
          <a className="mobile-nav-tab">chill</a>
          <a className="mobile-nav-tab">deep</a>
          <a className="mobile-nav-tab">dubstep</a>
          <a className="mobile-nav-tab">progressive</a>
          <a className="mobile-nav-tab">tech</a>
          <a className="mobile-nav-tab">trance</a>
          <a className="mobile-nav-tab">tropical</a>
        </div>

        <div className="mobile-nav-menu mobile-scrollable" style={{ height: 0 }}>
          <a className="mobile-nav-tab">stream</a>
          <a className="mobile-nav-tab">likes</a>
        </div>

        <div className="mobile-nav-items">
          <a className="mobile-nav-item">
            <span>house</span>
            <i className="ion-chevron-up"></i>
          </a>
        </div>

        <div className="mobile-nav-items">
          <a className="mobile-nav-item mobile-nav-auth">
            <span>Sign into SoundCloud</span>
            <i className="icon ion-person"></i>
          </a>
        </div>
      </div>
    )
  }
}

MobileNav.propTypes = propTypes;

export default MobileNav;