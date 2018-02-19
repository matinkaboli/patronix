import React, { Component } from 'react';
import { connect } from 'react-redux';

import Menu from 'Root/components/Menu';
import Form from 'Root/components/Form';
import bind from 'Root/bind';
import recovery from 'Root/actions/recovery/recovery';

import styles from './index.less';

class Recovery extends Component {
  @bind
  recovery(e) {
    recovery(e.target.email.value);
  }

  render() {
    const inputs = [
      {
        type: 'email',
        placeholder: 'ایمیل',
        name: 'email',
        required: true
      }
    ];

    return (
      <div>
        <Menu />
        <div className={styles.formContainer}>

          <Form
            inputs={inputs}
            submitValue='بازیابی رمز عبور'
            submitFunction={this.recovery} />
        
        </div>
      </div>
    );
  }
}

export default connect(state => ({ recovery: state.recovery }))(Recovery);
