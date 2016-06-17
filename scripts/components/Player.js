import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import SongDetails from '../components/SongDetails';
import { formatSeconds, formatStreamUrl } from '../utils/FormatUtils';
import { getImageUrl } from '../utils/SongUtils';
import { toggleIsPlaying } from '../actions/player';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  player: PropTypes.object.isRequired,
  playingSongId: PropTypes.number,
  playlists: PropTypes.object.isRequired,
  song: PropTypes.object,
  songs: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
}

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      duration: 0,            // 持续时间
      repeat: false,          // 重复
      shuffle: false,         // 随机
      volume: 1,              // 音量
    }

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
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);

    // refs 中是是虚拟 DOM
    const audioElement = ReactDOM.findDOMNode(this.refs.audio);
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

    audioElement.play();
  }

  handleKeyDown(e) {

  }

  handleEnded() {

  }

  handleLoadedMetadata() {

  }

  handleLoadStart() {

  }

  handlePause() {
    const { dispatch } = this.props;
    dispatch(toggleIsPlaying(false));
  }

  handlePlay() {
    const { dispatch } = this.props;
    dispatch(toggleIsPlaying(true));
  }

  handleTimeUpdate() {

  }

  handleVolumeChange() {

  }

  togglePlay() {

  }

  seek() {

  }

  handleMouseClick() {

  }

  handleSeekMouseDown() {

  }

  renderDurationBar() {
    const { currentTime } = this.props.player;
    // 持续时间
    const { duration } = this.state;

    if (duration !== 0) {
      const width = currentTime / duration * 100;

      return (
        <div className="player-seek-duration-bar" style={{ width: `${ width }%` }}>
          <div
            className="player-seek-handle"
            onClick={ this.handleMouseClick }
            onMouseDown={ this.handleSeekMouseDown }
          />
        </div>
      )
    }
  }

  render() {
    const { dispatch, player, playingSongId, songs, users } = this.props;
    const { isPlaying, currentTime } = player;
    const song = songs[playingSongId];
    const user = users[song.user_id];
    const { duration } = this.state;

    return (
      <div className="player">
        <audio id="audio" ref="audio" src={ formatStreamUrl(song.stream_url) } />
        <div className="container">
          <div className="player-main">

            <div className="player-section player-info">
              <img className="player-image" src={ getImageUrl(song.artwork_url) } />
              <SongDetails
                dispatch={ dispatch }
                songId={ song.id }
                title={ song.title }
                userId={ user.id }
                username={ user.username }
              />
            </div>

            <div className="player-section">
              <div className="player-button">
                <i className="icon ion-ios-rewind" />
              </div>
              <div className="player-button" onClick={ this.togglePlay }>
                <i className={ classnames({
                  icon: true,
                  'ion-ios-pause': isPlaying,
                  'ion-ios-play': !isPlaying,
                }) } />
              </div>
              <div className="player-button">
                <i className="icon ion-ios-fastforward" />
              </div>
            </div>

            <div className="player-section player-seek">
              <div className="player-seek-bar-wrap" onClick={ this.seek }>
                <div className="player-seek-bar" ref="seekBar">
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
              <div className={ classnames({
                'player-button': true,
                active: this.state.repeat,
              }) }>
                <i className="icon ion-loop" />
              </div>
              <div className={ classnames({
                'player-button': true,
                active: this.state.shuffle,
              }) }>
                <i className="icon ion-shuffle" />
              </div>
              <div className="player-button top-right">
                <i className="icon ion-android-list" />
              </div>
              <div className="player-button player-volume-button">
                <div className="player-volume-button-wrap">
                  <i className="icon ion-android-volume-up" />
                  <i className="icon ion-android-volume-mute" />
                </div>
              </div>
              <div className="player-volume">
                <div className="player-seek-bar-wrap">
                  <div className="player-seek-bar" ref="volumeBar">
                    <div className="player-seek-duration-bar" style={{ width: '100%' }}>
                      <div className="player-seek-handle"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

Player.propTypes = propTypes;

export default Player;
