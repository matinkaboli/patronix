import React, { Component } from 'react';

import revokeToken from 'Root/actions/user/site/revokeToken';

import bind from 'Root/js/bind';

import Button from 'Root/components/Button';

import styles from './index.less';

export default class extends Component {
  @bind
  revokeToken(id) {
    revokeToken(id);
  }

  render() {
    return (
      <div>
        <p>توکن فعلی شما</p>

        <p />

        <code className={styles.script}>
          {this.props.token}
        </code>

        <p />

        <Button
          color='blue'
          handleClick={() => { this.revokeToken(this.props.id); }}>
          توکن جدید
        </Button>

        <p />

        <p>
          برای استفاده از سایت، تکه کد زیر را به اخر کد
          HTML سایتتان اضافه کنید
        </p>

        <code className={styles.script}>
          {
          `<script
          id='patronix-data'
          token=${this.props.token}
          src="${localStorage.getItem('patronixUrl')}/static/js/customer.js"
          ></script>`
          }
        </code>
      </div>
    );
  }
}
