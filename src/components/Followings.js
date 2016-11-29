import React, { Component, PropTypes } from 'react';

import SidebarContent from './SidebarContent';
import UserCard from './UserCard';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired,
  users: PropTypes.array.isRequired,
};

class Followings extends Component {
  renderFollowings() {
    const { dispatch, users } = this.props;
    return users.map(user => <UserCard dispatch={dispatch} user={user} key={user.id} />);
  }

  render() {
    const { height, users } = this.props;

    return (
      <div className="followings">
        <div className="followings-header">
          <div className="followings-title">
            {`Following ${users.length} Users`}
          </div>
        </div>

        <SidebarContent height={height - 220}>
          { this.renderFollowings() }
        </SidebarContent>
      </div>
    );
  }
}

Followings.propTypes = propTypes;

export default Followings;
