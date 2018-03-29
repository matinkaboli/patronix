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
  takeChat(id) {
    return () => {
      this.props.dispatch(take(id));
    };
  }

  @bind
  finishChat(id) {
    return () => {
      this.props.dispatch(finish(id, this.props.history.push));
    };
  }

  @bind
  sendMessage() {
    this.props.dispatch(send(this.refs.send.value));
  }

  render() {
    let chat;

    for (const i of this.props.chats.keys()) {
      if (this.props.chats[i]._id === this.props.match.params.id) {
        chat = this.props.chats[i];
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

    console.log(chat);

    return (
      <Box>
        {!chat.taken ? <Button
          color='blue'
          handleClick={this.takeChat(chat._id)}>
          اختصاص دادن
        </Button> : ''}

        <p>{chat.messages[0]}</p>

        { chat.taken && !chat.finished ? <div>
          <div className={styles.send}>
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
          </div>
          <Button
            color='red'
            handleClick={this.finishChat(chat._id)}>
            پایان چت
          </Button>
        </div> : ''}
      </Box>
    );
  }
}

export default withRouter(connect(
  state => ({
    chats: state.chats
  })
)(Chat));
