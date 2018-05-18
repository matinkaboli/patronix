import React, { Component } from 'react';

import revokeToken from 'Root/actions/user/site/revokeToken';

import bind from 'Root/js/bind';

import Field from 'Root/components/Panel/Field';
import Button from 'Root/components/Button';

import styles from './index.less';

export default class extends Component {
  @bind
  revokeToken() {
    revokeToken();
  }

  render() {
    return (
      <Field>
        <div>
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

        <div>
          <Button
            color='blue'
            handleClick={this.revokeToken}>
            توکن جدید
          </Button>
        </div>
      </Field>
    );
  }
}
