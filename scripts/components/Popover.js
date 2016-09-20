import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

const propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
}

class Popover extends Component {
    constructor(props) {
        super(props);
        if (props.children.length !== 2) {
            throw new Error('Popover component requires exactly 2 children');
        }
        this.onOutsideClick = this.onOutsideClick.bind(this);
        this.toggleIsOpen = this.toggleIsOpen.bind(this);

        this.state = { isOpen: false };
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.onOutsideClick);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.onOutsideClick);
    }

    onOutsideClick(e) {
        if (!this.state.isOpen) {
            return;
        }

        e.stopPropagation();
        const localNode = ReactDOM.findDOMNode(this);
        let source = e.target;

        while (source.parentNode) {
            // 点击组件内包括组件的元素时返回，因为会执行 toggleIsOpen 方法
            if (source === localNode) {
                return;
            }
            source = source.parentNode;
        }

        this.setState({ isOpen: false });
    }

    toggleIsOpen() {
        this.setState({ isOpen: !this.state.isOpen })
    }

    render() {
        const { isOpen } = this.state;
        const { className, children } = this.props;

        return (
            <div
                className={ classNames({
                    [className]: true,
                    popover: true,
                    open: isOpen === true,
                })}
                onClick={ this.toggleIsOpen }
            >
                { children[0] }
                { isOpen ? children[1] : null }
            </div>
        )
    }
}

Popover.propTypes = propTypes;

export default Popover;
