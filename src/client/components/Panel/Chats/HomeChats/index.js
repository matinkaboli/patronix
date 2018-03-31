import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Box from 'Root/components/Box';

import styles from './index.less';


class HomeChat extends Component {
  render() {
    return (
      <Box className={styles.container}>
        {this.props.newChats.length === 0 && <h1 className={styles.title}>
          چت جدیدی وجود ندارد
        </h1>}

        {this.props.newChats.map((v, i) =>
          <div className={styles.chat} key={i}>

            <Link to={`/panel/chats/${v._id}`}>{v.message.text}</Link>

            <span>از سایت: {v.from}</span>

            <span>
              {new Date(v.message.time).getHours()}:
              {new Date(v.message.time).getMinutes()}
            </span>
          </div>
        )}

        {this.props.chat._id && <div className={styles.chat}>
          <Link to={`/panel/chats/${this.props.chat._id}`}>
            چت کنونی: {this.props.chat.message.text}
          </Link>

          <span>از سایت: {this.props.chat.from}</span>

          <span>
            {new Date(this.props.chat.message.time).getHours()}:
            {new Date(this.props.chat.message.time).getMinutes()}
          </span>
        </div>}
      </Box>
    );
  }
}

export default connect(
  state => ({
    newChats: state.newChats,
    chat: state.chat
  })
)(HomeChat);
