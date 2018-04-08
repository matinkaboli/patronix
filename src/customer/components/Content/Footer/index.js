import React, { Component } from 'react';

import bind from 'Root/js/bind';
import send from 'Root/actions/send';
import { dispatch } from 'Root/store';
import types from 'Root/actions';
import styles from './index.less';

class Footer extends Component {
  @bind
  send() {
    let message = this.refs.message.value;

    if (message.length > 250) {
      dispatch({
        type: types.chats.ADD,
        chat: {
          type: 'warning',
          sender: 'customer',
          text: 'بیشتر از ۲۵۰ کاراکتر نمی توانید ارسال کنید.'
        }
      });
      return;
    }

    if (message.length === 0) {
      dispatch({
        type: types.chats.ADD,
        chat: {
          type: 'warning',
          sender: 'customer',
          text: 'پیام خالی نمی توانید ارسال کنید.'
        }
      });
      return;
    }

    send(message);
    this.refs.message.value = '';
  }

  @bind
  keypress(e) {
    if (e.key === 'Enter') {
      this.send();
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <input
          className={styles.input}
          ref='message'
          onKeyPress={this.keypress}
        />
        <button className={styles.button} onClick={this.send}>
          ارسال
        </button>
      </div>
    );
  }
}

export default Footer;
