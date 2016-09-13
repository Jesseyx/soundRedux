import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

const propTypes = {
    isOn: PropTypes.bool.isRequired,
    toggleFunc: PropTypes.func.isRequired,
}

class Switch extends Component {
    render() {
        const { isOn, toggleFunc } = this.props;

        return (
            <div
                className={ classNames({
                    switch: true,
                    on: isOn,
                }) }
                onClick={ toggleFunc }
            >
                <div className="switch-button" />
            </div>
        )
    }
}

Switch.propTypes = propTypes;

export default Switch;
