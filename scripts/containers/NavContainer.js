import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Nav from '../components/Nav';
import MobileNav from '../components/MobileNav';

const propTypes = {
    isMobile: PropTypes.bool
}

class NavContainer extends Component {
    render() {
        const { isMobile } = this.props;

        if (isMobile) {
            return <MobileNav { ...this.props } />
        }

        return <Nav { ...this.props } />
    }
}

function mapStateToProps(state, ownProps) {
    const { authed, entities, environment, navigator } = state;
    const { playlists, songs } = entities;
    const { isMobile } = environment;

    return {
        authed,
        authedPlaylists: playlists,
        isMobile,
        navigator,
        songs,
    }
}

NavContainer.propTypes = propTypes;

export default connect(mapStateToProps)(NavContainer);
