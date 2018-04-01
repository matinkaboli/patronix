import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import styles from './index.less';


class HomeChat extends Component {
  render() {
    return (
      <div className={styles.container}>
        {this.props.newChats.length === 0 && <h1 className={styles.title}>
          چت جدیدی وجود ندارد
        </h1>}

        {this.props.newChats.map((v, i) =>
          <Link to={`/panel/chats/${v._id}`} key={i}>
            <div className={styles.chat}>
              <h1>سایت: {v.site.name}</h1>

              <span>
                {new Date(v.chats[0].time).getHours()}:
                {new Date(v.chats[0].time).getMinutes()}
              </span>

              <p>پیام: {v.chats[0].message}</p>

            </div>
          </Link>
        )}

        {this.props.chat._id && <div className={styles.chat}>
          <Link to={`/panel/chats/${this.props.chat._id}`}>
            چت کنونی: {this.props.chats[0].message}
          </Link>

          <span>از سایت: {this.props.chat.site.name}</span>

          <span>
            {new Date(this.props.chat.chats[0].time).getHours()}:
            {new Date(this.props.chat.chats[0].time).getMinutes()}
          </span>
        </div>}
      </div>
    );
  }
}

export default connect(
  state => ({
    newChats: state.newChats,
    chat: state.chat
  })
)(HomeChat);
