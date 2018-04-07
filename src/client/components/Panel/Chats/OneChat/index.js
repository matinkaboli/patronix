import React, { Component, Fragment } from 'react';
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
  takeChat() {
    this.props.dispatch(take(this.props.chat));
  }

  @bind
  finishChat() {
    this.props.dispatch(finish());
    this.props.history.push('/panel');
  }

  @bind
  sendMessage() {
    if (this.refs.textInput.value.length > 250) {
      izitoast.warning({
        rtl: true,
        title: 'بیشتر از ۲۵۰ کاراکتر نمیتوانید ارسال کنید'
      });

      return;
    }

    if (!this.refs.textInput.value.length) {
      izitoast.warning({
        rtl: true,
        title: 'مقادیر کافی نمیباشند'
      });

      return;
    }

    this.props.dispatch(send(this.refs.textInput.value));

    this.refs.textInput.value = '';
  }

  @bind
  keypress(e) {
    if (e.key === 'Enter') {
      this.sendMessage();
    }
  }

  @bind
  operatorInformation() {
    let chat = this.props.chat;

    if (chat.done) {
      return (
        <div className={styles.opName}>
          <img src={chat.operator.avatar} />
          {chat.operator.name} - {chat.operator.email}
        </div>
      );
    }

    return null;
  }

  @bind
  footer() {
    let chat = this.props.chat;

    if (chat.done) {
      return null;
    }

    if (chat.taken) {
      return (
        <Box classes={styles.footer}>
          <input
            type='text'
            placeholder='پیام خود را اینجا بنویسید...'
            ref='textInput'
            onKeyPress={this.keypress}
          />
          <Button
            color='blue'
            handleClick={this.sendMessage}>
            ارسال
          </Button>
          <Button
            color='red'
            handleClick={this.finishChat}>
            پایان چت
          </Button>
        </Box>
      );
    }

    return (
      <Box classes={styles.footer}>
        <Button
          color='blue'
          handleClick={this.takeChat}>
          اختصاص دادن چت و شروع چت
        </Button>
      </Box>
    );
  }

  @bind
  status() {
    if (this.props.chat.done) {
      return styles.full;
    }

    return '';
  }

  render() {
    let chat = this.props.chat;

    return (
      <Fragment>
        <Box classes={styles.content + ' ' + this.status()}>
          {this.operatorInformation()}
          <div>
            {chat.chats.map((v, i) => {
              let prefix = v.sender ? 'operator' : 'customer';

              return (
                <div key={i} className={`${styles.chat} ${styles[prefix]}`}>
                  <div>
                    <p>{v.message}</p>
                    <p className={styles.time}>
                      {new Date(chat.chats[0].time).getHours()}:
                      {new Date(chat.chats[0].time).getMinutes()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Box>

        {this.footer()}
      </Fragment>
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
