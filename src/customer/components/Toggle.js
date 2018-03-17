import React, { Component } from 'react';
import connect from 'react-redux';

class Toggle extends Component {
  render() {
    if (this.props.activeStatus) {
      return <this.props.component className={this.props.active} />;
    }

    return <this.props.component className={this.props.deactive} />;
  }
}

export default connect(
  state => (
    {
      activeStatus: state.activeStatus
    }
  )
)(Toggle);
