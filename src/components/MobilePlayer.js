import React, { Component, PropTypes } from 'react';
import { Motion, spring } from 'react-motion';

import MobilePlayerContent from './MobilePlayerContent';

const propTypes = {
  playingSongId: PropTypes.number,
};

class MobilePlayer extends Component {
  renderPlayerContent() {
    return <MobilePlayerContent {...this.props} />;
  }

  render() {
    const { playingSongId } = this.props;
    const isSongPlaying = playingSongId !== null;

    return (
      <Motion style={{ height: spring(isSongPlaying ? 100 : 0) }}>
        {
          ({ height }) =>
            <div className="mobile-player-container" style={{ height }}>
              { this.renderPlayerContent() }
            </div>
        }
      </Motion>
    );
  }
}

MobilePlayer.propTypes = propTypes;

export default MobilePlayer;
