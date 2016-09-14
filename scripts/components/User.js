import React, { Component, PropTypes } from 'react';

import stickify from './Stickify';
import Spinner from './Spinner';

import { fetchUserIfNeeded } from '../actions/users';

const propTypes = {
    authed: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    height: PropTypes.number,
    player: PropTypes.object.isRequired,
    playingSongId: PropTypes.number,
    playlists: PropTypes.object.isRequired,
    songs: PropTypes.object.isRequired,
    sticky: PropTypes.bool.isRequired,
    userId: PropTypes.number,
    users: PropTypes.object.isRequired,
}

class User extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { dispatch, userId } = this.props;
        dispatch(fetchUserIfNeeded(userId));
    }

    render() {
        const { sticky, userId, users } = this.props;
        const user = users[userId];
        if (!user || !user.hasOwnProperty('description')) {
            return <Spinner />;
        }

        return null;
    }
}

User.propTypes = propTypes;

export default stickify(User, 50);
