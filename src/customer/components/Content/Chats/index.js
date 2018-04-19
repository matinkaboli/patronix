import React, { Component } from 'react';
import { connect } from 'react-redux';

import Chat from './Chat';

import styles from './index.less';


class Chats extends Component {
  componentDidUpdate() {
    this.refs.content.scroll(0, this.refs.content.scrollHeight);
  }

  render() {
    return (
      <div className={styles.container} ref='content'>
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
