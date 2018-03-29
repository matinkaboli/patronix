import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import types from 'Root/actions';

import lazy from 'Root/js/lazy';

import Box from 'Root/components/Box';

import styles from './index.less';


class History extends Component {
  render() {
    const chats = this.props.chats.filter(obj => obj.finished === true);

    return (
      <Box className={styles.container}>

        {chats.map((v, i) => <div className={styles.chat} key={i}>
          <Link to={`/panel/chats/${v._id}`}>{v.messages[0]}</Link>
        </div>)}
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
