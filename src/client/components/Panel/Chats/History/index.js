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

    return (
      <Box className={styles.container}>
        {chats.length === 0 && <h1 className={styles.title}>
          چت های پیشینی وجود ندارد
        </h1>}

        {chats.map((v, i) => <div className={styles.chat} key={i}>
          <Link to={`/panel/chats/${v._id}`}>{v.message.text}</Link>

          <span>از سایت: {v.from}</span>

          <span>
            {new Date(v.message.time).getHours()}:
            {new Date(v.message.time).getMinutes()}
          </span>

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
