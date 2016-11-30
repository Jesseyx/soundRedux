import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import SongDetails from '../components/SongDetails';
import Popover from '../components/Popover';
import Playlist from '../components/Playlist';

import { formatSeconds, formatStreamUrl } from '../utils/FormatUtils';
import { getImageUrl } from '../utils/SongUtils';
import { changeCurrentTime, toggleIsPlaying, changeSong } from '../actions/player';
import { offsetLeft } from '../utils/MouseUtils';
import LocalStorageUtils from '../utils/LocalStorageUtils';
import { CHANGE_TYPES } from '../constants/SongConstants';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  player: PropTypes.object.isRequired,
  playingSongId: PropTypes.number,
  playlists: PropTypes.object.isRequired,
  songs: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
};

class Player extends Component {
  constructor(props) {
    super(props);

    const previousVolumeLevel = Number.parseFloat(LocalStorageUtils.get('volume'));
    this.state = {
      activePlaylistIndex: null,
      currentTime: 0,                                 // 当前播放时间
      duration: 0,                                    // 持续时间
      isSeeking: false,                               // 是否正在 loading
      muted: false,                                   // 静音
      repeat: false,                                  // 重复
      shuffle: false,                                 // 随机
      volume: previousVolumeLevel || 1,               // 音量
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleEnded = this.handleEnded.bind(this);
    this.handleLoadedMetadata = this.handleLoadedMetadata.bind(this);
    this.handleLoadStart = this.handleLoadStart.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
    this.handleVolumeChange = this.handleVolumeChange.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.seek = this.seek.bind(this);
    this.handleMouseClick = this.handleMouseClick.bind(this);
    this.handleSeekMouseDown = this.handleSeekMouseDown.bind(this);
    this.handleSeekMouseMove = this.handleSeekMouseMove.bind(this);
    this.handleSeekMouseUp = this.handleSeekMouseUp.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
    this.handleVolumeMouseDown = this.handleVolumeMouseDown.bind(this);
    this.handleVolumeMouseMove = this.handleVolumeMouseMove.bind(this);
    this.handleVolumeMouseUp = this.handleVolumeMouseUp.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
    this.toggleShuffle = this.toggleShuffle.bind(this);
    this.toggleRepeat = this.toggleRepeat.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown, false);

    // refs 中是是虚拟 DOM
    const audioElement = this.audio;
    // 当媒介已到达结尾时运行的脚本（可发送类似“感谢观看”之类的消息）
    audioElement.addEventListener('ended', this.handleEnded, false);
    // 当元数据（比如分辨率和时长）被加载时运行的脚本
    audioElement.addEventListener('loadedmetadata', this.handleLoadedMetadata, false);
    // 在文件开始加载且未实际加载任何数据前运行的脚本
    audioElement.addEventListener('loadstart', this.handleLoadStart, false);
    // 当媒介被用户或程序暂停时运行的脚本
    audioElement.addEventListener('pause', this.handlePause, false);
    // 当媒介已就绪可以开始播放时运行的脚本
    audioElement.addEventListener('play', this.handlePlay, false);
    // 当播放位置改变时（比如当用户快进到媒介中一个不同的位置时）运行的脚本
    audioElement.addEventListener('timeupdate', this.handleTimeUpdate, false);
    // 每当音量改变时（包括将音量设置为静音）时运行的脚本
    audioElement.addEventListener('volumechange', this.handleVolumeChange, false);

    // fixing player's volume always set to 1 on start
    audioElement.volume = this.state.volume;

    audioElement.play();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.playingSongId && prevProps.playingSongId === this.props.playingSongId) {
      return;
    }

    this.audio.play();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown, false);

    const audioElement = this.audio;
    audioElement.removeEventListener('ended', this.handleEnded, false);
    audioElement.removeEventListener('loadedmetadata', this.handleLoadedMetadata, false);
    audioElement.removeEventListener('loadstart', this.handleLoadStart, false);
    audioElement.removeEventListener('pause', this.handlePause, false);
    audioElement.removeEventListener('play', this.handlePlay, false);
    audioElement.removeEventListener('timeupdate', this.handleTimeUpdate, false);
    audioElement.removeEventListener('volumechange', this.handleVolumeChange, false);
  }

  bindSeekMouseEvents() {
    document.addEventListener('mousemove', this.handleSeekMouseMove);
    document.addEventListener('mouseup', this.handleSeekMouseUp);
  }

  unbindSeekMouseEvents() {
    document.removeEventListener('mousemove', this.handleSeekMouseMove);
    document.removeEventListener('mouseup', this.handleSeekMouseUp);
  }

  bindVolumeMouseEvents() {
    document.addEventListener('mousemove', this.handleVolumeMouseMove);
    document.addEventListener('mouseup', this.handleVolumeMouseUp);
  }

  unbindVolumeMouseEvents() {
    document.removeEventListener('mousemove', this.handleVolumeMouseMove);
    document.removeEventListener('mouseup', this.handleVolumeMouseUp);
  }

  handleKeyDown(e) {
    const keyCode = e.keyCode || e.which;
    const isInsideInput = e.target.tagName.toLowerCase().match(/input|textarea/);
    if (isInsideInput) {
      return;
    }

    if (keyCode === 32) {
      // 空格键
      e.preventDefault();
      this.togglePlay();
    } else if (keyCode === 37 || keyCode === 74) {
      // 左箭头和 J 键
      e.preventDefault();
      this.changeSong(CHANGE_TYPES.PREV);
    } else if (keyCode === 39 || keyCode === 75) {
      // 右箭头和 K 键
      e.preventDefault();
      this.changeSong(CHANGE_TYPES.NEXT);
    }
  }

  handleEnded() {
    if (this.state.repeat) {
      this.audio.play();
    } else if (this.state.shuffle) {
      this.changeSong(CHANGE_TYPES.SHUFFLE);
    } else {
      this.changeSong(CHANGE_TYPES.NEXT);
    }
  }

  handleLoadedMetadata() {
    this.setState({
      duration: Math.floor(this.audio.duration),
    });
  }

  handleLoadStart() {
    const { dispatch } = this.props;
    dispatch(changeCurrentTime(0));
    this.setState({
      duration: 0,
    });
  }

  handlePause() {
    const { dispatch } = this.props;
    dispatch(toggleIsPlaying(false));
  }

  handlePlay() {
    const { dispatch } = this.props;
    dispatch(toggleIsPlaying(true));
  }

  handleTimeUpdate(e) {
    if (this.state.isSeeking) {
      return;
    }

    const { dispatch, player } = this.props;
    const audioElement = e.currentTarget;
    const currentTime = Math.floor(audioElement.currentTime);

    if (currentTime === player.currentTime) {
      return;
    }

    dispatch(changeCurrentTime(currentTime));
  }

  handleVolumeChange(e) {
    if (this.state.isSeeking) {
      return;
    }

    const volume = e.currentTarget.volume;
    LocalStorageUtils.set('volume', volume);
    this.setState({
      volume,
    });
  }

  togglePlay() {
    const { isPlaying } = this.props.player;
    const audioElement = this.audio;

    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
  }

  handleMouseClick(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  seek(e) {
    const { dispatch } = this.props;
    const percent = (e.clientX - offsetLeft(e.currentTarget)) / e.currentTarget.offsetWidth;
    const currentTime = Math.floor(percent * this.state.duration);

    dispatch(changeCurrentTime(currentTime));
    this.audio.currentTime = currentTime;
  }

  handleSeekMouseDown() {
    this.bindSeekMouseEvents();
    this.setState({
      isSeeking: true,
    });
  }

  handleSeekMouseMove(e) {
    const { dispatch } = this.props;
    const seekBar = this.seekBar;
    const diff = e.clientX - offsetLeft(seekBar);
    const pos = diff < 0 ? 0 : diff;
    let percent = pos / seekBar.offsetWidth;
    percent = percent > 1 ? 1 : percent;

    dispatch(changeCurrentTime(Math.floor(percent * this.state.duration)));
  }

  handleSeekMouseUp() {
    if (!this.state.isSeeking) {
      return;
    }

    this.unbindSeekMouseEvents();

    const { currentTime } = this.props.player;

    this.setState({
      isSeeking: false,
    }, () => {
      this.audio.currentTime = currentTime;
    });
  }

  changeVolume(e) {
    const volume = (e.clientX - offsetLeft(e.currentTarget)) / e.currentTarget.offsetWidth;
    this.audio.volume = volume;
  }

  handleVolumeMouseDown() {
    this.bindVolumeMouseEvents();
    this.setState({
      isSeeking: true,
    });
  }

  handleVolumeMouseMove(e) {
    const volumeBar = this.volumeBar;
    const diff = e.clientX - offsetLeft(volumeBar);
    const pos = diff < 0 ? 0 : diff;
    let percent = pos / volumeBar.offsetWidth;
    percent = percent > 1 ? 1 : percent;

    this.setState({
      volume: percent,
    });

    this.audio.volume = percent;
  }

  handleVolumeMouseUp() {
    if (!this.state.isSeeking) {
      return;
    }

    this.unbindVolumeMouseEvents();

    this.setState({
      isSeeking: false,
    // }, () => {
    //   this.audio.volume = this.state.volume;
    });

    // fix updating LocalStorage on volume slider mouseup
    LocalStorageUtils.set('volume', this.state.volume);
  }

  renderDurationBar() {
    const { currentTime } = this.props.player;
    // 持续时间
    const { duration } = this.state;

    if (duration !== 0) {
      const width = (currentTime / duration) * 100;

      return (
        <div className="player-seek-duration-bar" style={{ width: `${width}%` }}>
          <div
            className="player-seek-handle"
            onClick={this.handleMouseClick}
            onMouseDown={this.handleSeekMouseDown}
          />
        </div>
      );
    }

    return null;
  }

  renderVolumeBar() {
    const { muted, volume } = this.state;
    const width = muted ? 0 : volume * 100;

    return (
      <div className="player-seek-duration-bar" style={{ width: `${width}%` }}>
        <div
          className="player-seek-handle"
          onClick={this.handleMouseClick}
          onMouseDown={this.handleVolumeMouseDown}
        />
      </div>
    );
  }

  toggleMute() {
    const audioElement = this.audio;
    if (this.state.muted) {
      audioElement.muted = false;
    } else {
      audioElement.muted = true;
    }

    this.setState({
      muted: !this.state.muted,
    });
  }

  renderVolumeIcon() {
    const { muted, volume } = this.state;

    if (muted) {
      // 静音
      return <i className="icon ion-android-volume-off" />;
    }

    if (volume === 0) {
      return <i className="icon ion-android-volume-mute" />;
    } else if (volume === 1) {
      return (
        <div className="player-volume-button-wrap">
          <i className="icon ion-android-volume-up" />
          <i className="icon ion-android-volume-mute" />
        </div>
      );
    }

    return (
      <div className="player-volume-button-wrap">
        <i className="icon ion-android-volume-down" />
        <i className="icon ion-android-volume-mute" />
      </div>
    );
  }

  changeSong(changeType) {
    console.log(changeType);
    const { dispatch } = this.props;
    dispatch(changeSong(changeType));
  }

  toggleShuffle() {
    this.setState({
      shuffle: !this.state.shuffle,
    });
  }

  toggleRepeat() {
    this.setState({
      repeat: !this.state.repeat,
    });
  }

  renderPlaylist() {
    const { dispatch, player, playlists, songs } = this.props;

    return (
      <Playlist
        dispatch={dispatch}
        player={player}
        playlists={playlists}
        songs={songs}
      />
    );
  }

  render() {
    const { dispatch, player, playingSongId, songs, users } = this.props;
    const { isPlaying, currentTime } = player;
    const song = songs[playingSongId];
    const user = users[song.user_id];
    const { duration } = this.state;
    const prevFunc = this.changeSong.bind(this, CHANGE_TYPES.PREV);
    const nextFunc = this.changeSong.bind(
      this, this.state.shuffle ? CHANGE_TYPES.SHUFFLE : CHANGE_TYPES.NEXT
    );

    return (
      <div className="player">
        <audio id="audio" ref={(ref) => { this.audio = ref; }} src={formatStreamUrl(song.stream_url)} />
        <div className="container">
          <div className="player-main">

            <div className="player-section player-info">
              <img
                className="player-image"
                src={getImageUrl(song.artwork_url)}
                alt="Song artwork"
              />
              <SongDetails
                dispatch={dispatch}
                songId={song.id}
                title={song.title}
                userId={user.id}
                username={user.username}
              />
            </div>

            <div className="player-section">
              <div
                className="player-button"
                onClick={prevFunc}
              >
                <i className="icon ion-ios-rewind" />
              </div>
              <div className="player-button" onClick={this.togglePlay}>
                <i
                  className={classNames({
                    icon: true,
                    'ion-ios-pause': isPlaying,
                    'ion-ios-play': !isPlaying,
                  })}
                />
              </div>
              <div
                className="player-button"
                onClick={nextFunc}
              >
                <i className="icon ion-ios-fastforward" />
              </div>
            </div>

            <div className="player-section player-seek">
              <div className="player-seek-bar-wrap" onClick={this.seek}>
                <div className="player-seek-bar" ref={(ref) => { this.seekBar = ref; }}>
                  { this.renderDurationBar() }
                </div>
              </div>

              <div className="player-time">
                <span>{ formatSeconds(currentTime) }</span>
                <span className="player-time-divider">/</span>
                <span>{ formatSeconds(duration) }</span>
              </div>
            </div>

            <div className="player-section">
              <div
                className={classNames({
                  'player-button': true,
                  active: this.state.repeat,
                })}
                onClick={this.toggleRepeat}
              >
                <i className="icon ion-loop" />
              </div>
              <div
                className={classNames({
                  'player-button': true,
                  active: this.state.shuffle,
                })}
                onClick={this.toggleShuffle}
              >
                <i className="icon ion-shuffle" />
              </div>
              <Popover className="player-button top-right">
                <i className="icon ion-android-list" />
                { this.renderPlaylist() }
              </Popover>
              <div
                className="player-button player-volume-button"
                onClick={this.toggleMute}
              >
                { this.renderVolumeIcon() }
              </div>
              <div className="player-volume">
                <div className="player-seek-bar-wrap" onClick={this.changeVolume}>
                  <div className="player-seek-bar" ref={(ref) => { this.volumeBar = ref; }}>
                    { this.renderVolumeBar() }
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

Player.propTypes = propTypes;

export default Player;
