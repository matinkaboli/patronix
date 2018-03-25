import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Box from 'Root/components/Box';

import styles from './index.less';


class HomeChat extends Component {
  render() {
    return (
      <Box className={styles.container}>
        <div className={styles.chat}>
          <Link to='/panel/chats/'>سایتییت</Link>
        </div>
      </Box>
    );
  }
}

export default HomeChat;
