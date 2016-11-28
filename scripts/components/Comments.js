import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Switch from './Switch';
import SidebarContent from './SidebarContent';
import Comment from './Comment';

const COMMENTS_REFRESH_RATE = 10;

const propTypes = {
  comments: PropTypes.array.isRequired,
  currentTime: PropTypes.number,
  height: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
};

class Comments extends Component {
  constructor(props) {
    super(props);

    this.toggleTimedComments = this.toggleTimedComments.bind(this);

    this.state = {
      className: null,
      currentTime: props.currentTime || 0,
      timedComments: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { currentTime, timedComments } = this.state;
    if (!timedComments || !nextProps.isActive) {
      return;
    }

    if (nextProps.currentTime % COMMENTS_REFRESH_RATE === 0
      || Math.abs(nextProps.currentTime - currentTime) > COMMENTS_REFRESH_RATE) {
      this.setState({
        className: 'animate-out',
      }, () => {
        setTimeout(() => this.setState({
          className: null,
          currentTime: nextProps.currentTime,
        }), 200);
      });
    }
  }

  toggleTimedComments() {
    this.setState({
      timedComments: !this.state.timedComments,
    });
  }

  renderComments() {
    const { comments, isActive } = this.props;
    const { currentTime, timedComments } = this.state;

    if (isActive && timedComments) {
      return comments
        .slice()
        .filter((comment) => {
          const commentTime = comment.timestamp / 1000;
          return commentTime >= currentTime && commentTime < (currentTime + COMMENTS_REFRESH_RATE);
        })
        .sort((a, b) => a.timestamp - b.timestamp)
        .map((comment, i) => <Comment comment={comment} i={i} key={comment.id} />);
    }

    return comments
      .slice()
      .sort((a, b) => a.timestamp - b.timestamp)
      .map((comment, i) => <Comment comment={comment} i={i} key={comment.id} />);
  }

  render() {
    const { height, isActive } = this.props;
    const { className, timedComments } = this.state;

    return (
      <div
        className={classNames({
          comments: true,
          timed: isActive && timedComments,
        })}
      >
        <div className="comments-header">
          <div className="comments-header-title">Comments</div>
          <Switch
            isOn={timedComments}
            toggleFunc={this.toggleTimedComments}
          />
        </div>

        <SidebarContent
          className={className}
          height={height - 200}
        >
          {this.renderComments()}
        </SidebarContent>
      </div>
    );
  }
}

Comments.propTypes = propTypes;

export default Comments;
