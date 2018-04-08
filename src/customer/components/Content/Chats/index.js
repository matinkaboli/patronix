import React, { Component } from 'react';
import { connect } from 'react-redux';

import Chat from './Chat';

import styles from './index.less';


class Chats extends Component {
  render() {
    return (
      <div className={styles.container}>
        {this.props.chats.map((v, i) =>
          <Chat key={i}
            {...v}
          />
        )}
      </div>
    );
  }
}

export default connect(
  state => ({
    chats: state.chats
  })
)(Chats);
