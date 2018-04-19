import React, { Component } from 'react';
import { connect } from 'react-redux';

import bind from 'Root/js/bind';
import Box from 'Root/components/Box';
import url from 'Root/url';
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
    const hasSite = this.props.sites.site || this.props.sites.sites.length;

    return (
      <div className={styles.container}>
        <Box>
          <h1 className={styles.title}>اطلاعات شما</h1>
          <p>{this.props.user.name}</p>
          <p>{this.props.user.email}</p>
          {this.renderImage()}
        </Box>

        {hasSite ? <Box>
          {this.props.sites.site ?
          <h1 className={styles.title}>سایت های شما</h1> : ''}

          {this.props.sites.site ? <div>
            <p>نام سایت: {this.props.sites.site.name}</p>
          </div> : ''}

          {this.props.sites.sites.length ?
            <h1 className={styles.title}>سایت هایی که پشتیبانی میکنید</h1> :
          ''}

          {this.props.sites.sites && this.props.sites.sites.map((v, i) =>
            <p key={i}>نام سایت: {v.name}</p>
          )}
        </Box> : ''}

        {this.props.sites.site ? <Box>
          <h1 className={styles.title}>نحوه استفاده</h1>
          <p>کد زیر را داخل HTML سایت خود قرار دهید</p>
          <code className={styles.script}>
            {`<script
            id='patronix-data'
            token=${this.props.sites.site.token}
            src="${url}/static/js/customer.js"
            ></script>`}
          </code>
        </Box> : ''}
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
