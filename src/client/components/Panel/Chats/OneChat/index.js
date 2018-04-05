import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import izitoast from 'izitoast';

import finish from 'Root/actions/user/chats/finish';
import take from 'Root/actions/user/chats/take';
import send from 'Root/actions/user/chats/send';
import types from 'Root/actions';

import bind from 'Root/js/bind';
import lazy from 'Root/js/lazy';

import Button from 'Root/components/Button';
import Box from 'Root/components/Box';

import styles from './index.less';


class Chat extends Component {
  @bind
  takeChat(chat) {
    return () => {
      this.props.dispatch(take(chat));
    };
  }

  @bind
  finishChat() {
    this.props.dispatch(finish());
    this.props.history.push('/panel');
  }

  @bind
  sendMessage() {
    if (this.refs.send.value.length > 250) {
      izitoast.warning({
        rtl: true,
        title: 'بیشتر از ۲۵۰ کاراکتر نمیتوانید ارسال کنید'
      });

      return;
    }

    if (!this.refs.send.value.length) {
      izitoast.warning({
        rtl: true,
        title: 'مقادیر کافی نمیباشند'
      });

      return;
    }

    this.props.dispatch(send(this.refs.send.value));

    this.refs.send.value = '';
  }

  @bind
  keypress(e) {
    if (e.key === 'Enter') {
      this.sendMessage();
    }
  }

  render() {
    let chat = this.props.chat;

    return (
      <div className={styles.container}>
        <Box classes={styles.chatList}>
          {!chat.taken ? <div className={styles.messages}>
            <Button
              color='blue'
              handleClick={this.takeChat(chat)}>
              اختصاص دادن
            </Button>
            <p>{chat.chats[0].text}</p>
            <span>
              {new Date(chat.chats[0].time).getHours()}:
              {new Date(chat.chats[0].time).getMinutes()}
            </span>
          </div> : ''}


          {chat.taken ? <div className={styles.messages}>
            {chat.chats.map((v, i) => <div
              className={`${styles.message}
              ${styles[v.sender === 1 ? 'CLIENT' : 'CUSTOMER']}`}
              key={i}>

              <p>{v.text}</p>

              <p className={styles.time}>
                {new Date(v.time).getHours()}:
                {new Date(v.time).getMinutes()}
              </p>
            </div>)}

            {!chat.done ? <div className={styles.send}>
              <input
                type='text'
                ref='send'
                onKeyPress={this.keypress}
                placeholder='فرستادن پیام'
              />

              <Button
                color='blue'
                handleClick={this.sendMessage}>
                فرستادن
              </Button>
            </div> : ''}

            {!chat.done ? <Button
              color='red'
              handleClick={this.finishChat}>
              پایان چت
            </Button> : ''}

          </div> : ''}
        </Box>
      </div>
    );
  }
}

export default lazy(
  withRouter(connect(
    state => ({
      chat: state.chat
    })
  )(Chat)),
  types.chat.LOAD
);
