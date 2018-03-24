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
            <h1 className={styles.title}>اطلاعات شما</h1>
            <p>{this.props.user.name}</p>
            <p>{this.props.user.email}</p>
            {this.renderImage()}
          </Box>

          <Box>
            <h1 className={styles.title}>سایت ها</h1>
            <hr />
          </Box>

          <Box>
            <h1 className={styles.title}>نحوه استفاده</h1>
            <p>کد زیر را داخل HTML سایت خود قرار دهید</p>
            <code className={styles.script}>
              {`<div id='patronix-land'></div>
              <script
                id='patronix-data'
                token=${this.props.user.name}
                src="${this.props.user.name}/static/js/customer.js">
              </script>`}
            </code>
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
