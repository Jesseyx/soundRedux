import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Toolbar from './Toolbar';
import SongCards from './SongCards';
import stickify from './Stickify';

import { fetchSongsIfNeeded } from '../actions/playlists';

const propTypes = {
    authed: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    height: PropTypes.number,
    playingSongId: PropTypes.number,
    playlist: PropTypes.string,
    playlists: PropTypes.object.isRequired,
    sticky: PropTypes.bool,
    songs: PropTypes.object.isRequired,
    time: PropTypes.number,
    users: PropTypes.object.isRequired,
}

class Songs extends Component {
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
                // 如果列表不存在或者为空
                dispatch(fetchSongsIfNeeded(nextPlaylist));
            }
        }
    }

    render() {
        const { authed, dispatch, height, playingSongId, playlist, playlists, sticky, songs, time, users } = this.props;

        const scrollFunc = fetchSongsIfNeeded.bind(null, playlist);

        return (
            <div className={ classNames({
                songs: true,
                sticky: sticky,
            }) }>
                <Toolbar
                    dispatch={ dispatch }
                    playlist={ playlist }
                    sticky={ sticky }
                    time={ time }
                />

                <div className="container">
                    <SongCards
                        authed={ authed }
                        dispatch={ dispatch }
                        height={ height }
                        playingSongId={ playingSongId }
                        playlist={ playlist }
                        playlists={ playlists }
                        scrollFunc={ scrollFunc }
                        songs={ songs }
                        users={ users }
                    />
                </div>
            </div>
        )
    }
}

Songs.propTypes = propTypes;

// Toolbar fixed
export default stickify(Songs, 50);
