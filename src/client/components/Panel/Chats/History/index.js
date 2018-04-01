import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import types from 'Root/actions';

import lazy from 'Root/js/lazy';

import styles from './index.less';


class History extends Component {
  render() {
    const chats = this.props.historyChats;
    console.log(chats);

    return (
      <div className={styles.container}>
        {chats.length === 0 && <h1 className={styles.title}>
          چت های پیشینی وجود ندارد
        </h1>}

        {chats.map((v, i) => <Link to={`/panel/chats/${v._id}`}>
          <div className={styles.chat} key={i}>
          <h1>سایت: {v.site.name}</h1>

          <span>
            {new Date(v.chats[0].time).getHours()}:
            {new Date(v.chats[0].time).getMinutes()}
          </span>

          <p>پیام: {v.chats[0].message}</p>

          <p>توسط پشتیبان: {v.operator.name}</p>

          </div>
        </Link>)}
      </div>
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
