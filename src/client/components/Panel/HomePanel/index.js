import React, { Component } from 'react';
import { connect } from 'react-redux';

import bind from 'Root/js/bind';
import Box from 'Root/components/Box';
import defaultImage from 'Root/images/user-default.png';
import styles from './index.less';


class Index extends Component {
  @bind
  renderImage() {
    return this.props.user.avatar ?
    <img
      src={this.props.user.avatar}
      alt='عکس کاربر'
      className={styles.avatarImage} /> :
    <img
      src={defaultImage}
      alt='عکس کاربر'
      className={styles.avatarImage} />;
  }

  render() {
    return (
      <div className={styles.container}>
        <Box>
          <h1 className={styles.title}>اطلاعات شما</h1>
          <p>{this.props.user.name}</p>
          <p>{this.props.user.email}</p>
          {this.renderImage()}
        </Box>
      </div>
    );
  }
}

export default connect(
  state => ({
    user: state.user,
    sites: state.sites
  })
)(Index);
