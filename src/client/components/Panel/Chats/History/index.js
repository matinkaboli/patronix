import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import types from 'Root/actions';

import lazy from 'Root/js/lazy';

import Box from 'Root/components/Box';

import styles from './index.less';


class History extends Component {
  render() {
    console.log(this.props.chats);
    return (
      <Box className={styles.container}>
        <div className={styles.chat}>
          <Link to='/panel/chats/'>سایتییت</Link>
        </div>
      </Box>
    );
  }
}

export default lazy(
  connect(
    state => ({
      chats: state.chats
    })
  )(History),
  types.chats.LOAD
);
