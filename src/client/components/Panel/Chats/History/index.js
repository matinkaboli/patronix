import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import types from 'Root/actions';

import lazy from 'Root/js/lazy';

import styles from './index.less';


class History extends Component {
  render() {
    const chat = this.props.historyChats.sort((a, b) =>
      +new Date(b.chats[b.chats.length - 1].time) -
      +new Date(a.chats[a.chats.length - 1].time)
    );

    return (
      <div className={styles.container}>
        {chat.length === 0 && <h1 className={styles.title}>
          چت های پیشینی وجود ندارد
        </h1>}

        {chat.map((v, i) =>
          <Link to={`/panel/chats/${v._id}`} key={i}>
            <div className={styles.chat}>
            <h1>سایت: {v.site.name}</h1>

            <span>
              {new Date(v.chats[0].time).getHours()}:
              {new Date(v.chats[0].time).getMinutes()}
            </span>

            <p>پیام: {v.chats[0].message}</p>

            <p>توسط پشتیبان: {v.operator.name}</p>

            </div>
          </Link>
        )}
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
