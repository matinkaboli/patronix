import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import finish from 'Root/actions/user/chats/finish';
import take from 'Root/actions/user/chats/take';
import send from 'Root/actions/user/chats/send';

import bind from 'Root/js/bind';

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
  }

  @bind
  sendMessage() {
    this.props.dispatch(send(this.refs.send.value));
  }

  render() {
    console.log(this.props.historyChats);
    let chat;

    for (const i of this.props.newChats.keys()) {
      if (this.props.newChats[i]._id === this.props.match.params.id) {
        chat = this.props.newChats[i];
        break;
      }
    }

    if (this.props.chat._id) {
      chat = this.props.chat;
    }

    for (const i of this.props.historyChats.keys()) {
      if (this.props.historyChats[i]._id === this.props.match.params.id) {
        chat = this.props.historyChats[i];
        break;
      }
    }

    if (!chat) {
      return (
        <Box>
          <h1 className={styles.title}>یافت نشد</h1>
        </Box>
      );
    }

    return (
      <Box>
        {!chat.taken ? <div>
          <Button
            color='blue'
            handleClick={this.takeChat(chat)}>
            اختصاص دادن
          </Button>
          <p>{chat.message.text}</p>
          <span>12:12</span>
        </div> : ''}


        {chat.taken ? <div>

          {chat.messages.map((v, i) => <div
            className={`${styles.message} ${styles[v.sender]}`}
            key={i}>
              <p>{v.message.text}</p>

              <p className={styles.time}>
                {new Date(v.message.time).getHours()}:
                {new Date(v.message.time).getMinutes()}
              </p>
            </div>)}

          {!chat.finished ? <div className={styles.send}>
            <input
              type='text'
              ref='send'
              placeholder='فرستادن پیام'
            />

            <Button
              color='black'
              handleClick={this.sendMessage}>
              فرستادن
            </Button>
          </div> : ''}

          {!chat.finished ? <Button
            color='red'
            handleClick={this.finishChat}>
            پایان چت
          </Button> : ''}

        </div> : ''}
      </Box>
    );
  }
}

export default withRouter(connect(
  state => ({
    historyChats: state.historyChats,
    newChats: state.newChats,
    chat: state.chat
  })
)(Chat));
