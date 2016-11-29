import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

const propTypes = {
  isPlaying: PropTypes.bool.isRequired,
};

class TogglePlayButton extends Component {
  constructor(props) {
    super(props);

    this.togglePlay = this.togglePlay.bind(this);
  }

  togglePlay() {
    const { isPlaying } = this.props;
    const audioElement = document.getElementById('audio');

    if (!audioElement) {
      return;
    }

    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
  }

  render() {
    const { isPlaying } = this.props;

    return (
      <div
        className={classnames({
          'toggle-play-button active': true,
          'is-playing': isPlaying,
        })}
        onClick={this.togglePlay}
      >
        <i className="toggle-play-button-icon ion-radio-waves" />
        <i className="toggle-play-button-icon ion-ios-play" />
      </div>
    );
  }
}

TogglePlayButton.propTypes = propTypes;

export default TogglePlayButton;
