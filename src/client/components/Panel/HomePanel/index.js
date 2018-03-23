import React, { Component } from 'react';
import { connect } from 'react-redux';

import bind from 'Root/js/bind';

import Box from 'Root/components/Box';

import defaultImage from 'Root/images/user-default.png';
import styles from './index.less';


class Index extends Component {
  @bind
  renderImage() {
    if (this.props.user.avatar) {
      return (
        <img
        src={this.props.user.avatar}
        alt='عکس کاربر'
        className={styles.avatarImage} />
      );
    }

    return (
      <img
        src={defaultImage}
        alt='عکس کاربر'
        className={styles.avatarImage} />
    );
  }

  render() {
    return (
      <div>
        <div className={styles.container}>
          <Box>
            {this.renderImage()}
            <h2 className={styles.name}>{this.props.user.name}</h2>
          </Box>
          <Box>
            <p>سایت هات</p>
          </Box>
          <Box>
            <p>چت هات</p>
          </Box>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    user: state.user
  })
)(Index);
