import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import izitoast from 'izitoast';

import bind from 'Root/bind';
import { email } from 'Libs/validator';
import styles from './index.less';

class Form extends Component {
  state = {
    displayValidateError: false
  };

  @bind
  login(e) {
    e.preventDefault();

    if (!e.target.checkValidity()) {
      this.setState({ displayValidateError: true });
      return;
    }
    this.setState({ displayValidateError: false });

    if (email(this.refs.email.value)) {
      // Let's do something about it
    } else {
      izitoast.warning({
        rtl: true,
        title: 'ایمیل اشتباه است'
      });
      this.refs.email.focus();
    }
  }

  render() {
    const { displayValidateError } = this.state;

    return (
      <form
        className={`${styles.form}
        ${displayValidateError ? 'displayValidateError' : ''}`}
        onSubmit={this.login}
        noValidate>

        <input
          type='email'
          ref='email'
          required
          placeholder='ایمیل'/>

          <button type='submit'>بازیابی رمز عبور</button>

      </form>
    );
  }
}

export default withRouter(connect()(Form));
