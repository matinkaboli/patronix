import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './index.less';

class Sites extends Component {
  render() {
    console.log(this.props);
    return (
      <div className={styles.container}>
        <div>
          <p>sfas</p>
        </div>
        <div />
      </div>
    );
  }
}

export default connect(state => ({ sites: state.sites }))(Sites);
