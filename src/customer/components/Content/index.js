import React, { Component } from 'react';
import { connect } from 'react-redux';

import toggle from 'Root/js/toggle';

import styles from './index.less';

class Content extends Component {
  render() {
    return (
      <div
        className={toggle(styles, this.props.appStatus, 'container')}>
      </div>
    );
  }
}

export default connect(
  state => ({
    appStatus: state.appStatus
  })
)(Content);
