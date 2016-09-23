import React, { Component } from 'react';

export default function (InnerComponent, scrollHeight) {
  class StickyComponent extends Component {
    constructor(props) {
      super(props);

      this.state = { sticky: false };

      this.onScroll = this.onScroll.bind(this);
    }

    componentDidMount() {
      window.addEventListener('scroll', this.onScroll, false);
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.onScroll, false);
    }

    onScroll() {
      const scrollY = window.scrollY;
      if (scrollY >= scrollHeight && !this.state.sticky) {
        this.setState({ sticky: true });
      } else if (scrollY < scrollHeight && this.state.sticky) {
        this.setState({ sticky: false });
      }
    }

    render() {
      return <InnerComponent {...this.props} sticky={this.state.sticky} />;
    }
  }

  return StickyComponent;
}
