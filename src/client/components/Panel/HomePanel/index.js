import React, { Component } from 'react';
import { connect } from 'react-redux';

import Box from 'Root/components/Box';

import styles from './index.less';


class Index extends Component {
  render() {
    return (
      <div>
        <div className={styles.container}>
          <Box>
            <p>اطلاعاتت</p>
          </Box>
          <Box>
            <p>سایت هات</p>
          </Box>
          <Box>
            <p>چت هات</p>
          </Box>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    user: state.user
  })
)(Index);
