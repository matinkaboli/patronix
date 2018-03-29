import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Box from 'Root/components/Box';

import styles from './index.less';


class HomeChat extends Component {
  render() {
    return (
      <Box className={styles.container}>
        {this.props.chats.map((v, i) =>
          <div className={styles.chat} key={i}>

            <Link to={`/panel/chats/${v._id}`}>{v.messages[0].message}</Link>

            <span>از سایت: {v.from}</span>

            <span>{new Date().getHours()}:{new Date().getMinutes()}</span>

          </div>
        )}
      </Box>
    );
  }
}

export default connect(
  state => ({
    chats: state.chats
  })
)(HomeChat);
