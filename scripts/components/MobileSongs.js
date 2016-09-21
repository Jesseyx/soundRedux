import React, { Component, PropTypes } from 'react';

import MobileSongList from './MobileSongList';

import { fetchSongsIfNeeded } from '../actions/playlists';

const propTypes = {
    dispatch: PropTypes.func.isRequired,
    playingSongId: PropTypes.number,
    playlist: PropTypes.string.isRequired,
    playlists: PropTypes.object.isRequired,
    songs: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
}

class MobileSongs extends Component {
    componentWillMount() {
        const { dispatch, playlist, playlists } = this.props;
        if (!(playlist in playlists) || playlists[playlist].items.length === 0) {
            dispatch(fetchSongsIfNeeded(playlist));
        }
    }

    componentWillReceiveProps(nextProps) {
        const { dispatch, playlist, playlists } = this.props;
        const nextPlaylist = nextProps.playlist;
        if (playlist !== nextPlaylist) {
            if (!(nextPlaylist in playlists) || playlists[nextPlaylist].items.length === 0) {
                dispatch(fetchSongsIfNeeded(nextPlaylist));
            }
        }
    }

    render() {
        return (
            <MobileSongList { ...this.props } />
        )
    }
}

MobileSongs.propTypes = propTypes;

export default MobileSongs;
