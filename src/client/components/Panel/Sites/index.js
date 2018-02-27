import React, { Component } from 'react';
import { connect } from 'react-redux';

import Box from 'Root/components/Box';
import styles from './index.less';

class Sites extends Component {
  render() {
    console.log(this.props);
    return (
      <div className={styles.container}>
        <Box>
          <h3>
            لیست سایت های شما:
          </h3>
        </Box>
        <Box>

        </Box>
      </div>
    );
  }
}

export default connect(state => ({ sites: state.sites }))(Sites);
