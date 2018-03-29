import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import types from 'Root/actions';

import lazy from 'Root/js/lazy';

import Box from 'Root/components/Box';

import styles from './index.less';


class History extends Component {
  render() {
    const chats = this.props.historyChats;
console.log(chats);
    return (
      <Box className={styles.container}>

        {chats.map((v, i) => <div className={styles.chat} key={i}>
          <Link to={`/panel/chats/${v._id}`}>{v.message}</Link>
        </div>)}
      </Box>
    );
  }
}

export default lazy(
  connect(
    state => ({
      historyChats: state.historyChats
    })
  )(History),
  types.historyChats.LOAD
);
