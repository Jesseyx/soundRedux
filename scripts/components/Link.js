import React, { Component, PropTypes } from 'react';

const propTypes = {
  className: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  route: PropTypes.object.isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
}

class Link extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    console.log('click');
  }

  render() {
    const { className, route, title, children } = this.props;

    return (
      <a
        className={ className }
        href={ `/#/${ route }` }
        title={ title ? '' + title : '' }
        onClick={ this.handleClick }
      >
        { children }
      </a>
    )
  }
}

Link.propsTypes = propTypes;

export default Link;