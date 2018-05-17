import React, { Component } from 'react';

import revokeToken from 'Root/actions/user/site/revokeToken';

import bind from 'Root/js/bind';

import Field from 'Root/components/Panel/Field';
import Button from 'Root/components/Button';

import styles from './index.less';

class Token extends Component {
  @bind
  revokeToken() {
    this.props.dispatch(revokeToken());
  }

  render() {
    return (
      <Field>
        <div>
          <p>{this.props.token}</p>
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


export default Token;
