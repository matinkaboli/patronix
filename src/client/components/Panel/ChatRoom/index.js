import React, { Component, Fragment } from 'react';

import Chat from './Chat';

import bind from 'Root/js/bind';
import take from 'Root/actions/chats/take';

import styles from './index.less';

class ChatRoom extends Component {
  @bind
  take() {
    take(this.props.chat.id);
  }

  @bind
  header() {
    if (!this.props.chat.done && !this.props.chat.taken) {
      return (
        <div className={styles.info}>
          <img src={this.props.chat.site.avatar} className={styles.avatar} />
          <p>{this.props.chat.site.name}</p>
        </div>
      );
    }

    if (this.props.chat.taken) {
      return (
        <Fragment>
          <div className={styles.info}>
            <img src={this.props.chat.site.avatar} className={styles.avatar} />
            <p>{this.props.chat.site.name}</p>
          </div>
          <div>
            <button className={styles.finish}>
              پایان
            </button>
          </div>
        </Fragment>
      );
    }
  }

  @bind
  footer() {
    if (this.props.chat.done) {
      return null;
    }

    if (!this.props.chat.taken) {
      return (
        <Fragment>
          <button
            className={styles.taking}
            onClick={this.take}>
            اختصاص دادن چت
          </button>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <input className={styles.input} />
        <button className={styles.button}>
          ارسال
        </button>
      </Fragment>
    );
  }

  @bind
  content() {
    let { done } = this.props.chat;

    return (
      <div className={
        `${styles.content} ${done ? styles.heightDone : styles.heightUndone}`
      }>
        {this.props.chat.chats.map(
          (v, i) =>
            <Chat
              sender={v.sender ? 'server' : 'customer'}
              time={v.time}
              message={v.message}
              key={i} />
        )}
      </div>
    );
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          {this.header()}
        </div>

        {this.content()}

        <div className={styles.footer}>
          {this.footer()}
        </div>
      </div>
    );
  }
}

export default ChatRoom;
