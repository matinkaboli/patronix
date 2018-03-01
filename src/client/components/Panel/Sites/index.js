import React, { Component } from 'react';
import { connect } from 'react-redux';

import Box from 'Root/components/Box';
import lazy from 'Root/js/lazy';
import types from 'Root/actions';
import styles from './index.less';

class Sites extends Component {
  render() {
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

export default lazy({
  component: connect(
    state => ({ sites: state.sites })
  )(Sites),
  type: types.sites.LOAD
});
