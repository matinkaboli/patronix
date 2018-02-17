import React, { Component } from 'react';

import Menu from 'Root/components/Menu';
import bind from 'Root/bind';
import recovery from 'Root/actions/recovery/recovery';

import styles from './index.less';

class Recovery extends Component {
  @bind
  recovery() {
    recovery(this.refs.email.value);
  }

  render() {
    return (
      <div>
        <Menu />
        <div className={styles.formContainer}>
          <input
            type='email'
            ref='email'
            placeholder='ایمیل'/>

            <button
              type='submit'
              onClick={this.recovery}>
              بازیابی رمز عبور
            </button>
        </div>
      </div>
    );
  }
}

export default Recovery;
