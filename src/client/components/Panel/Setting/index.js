import React, { Component } from 'react';
import izitoast from 'izitoast';
import { connect } from 'react-redux';

import updateEmail from 'Root/actions/user/email';
import updateName from 'Root/actions/user/name';
import updatePass from 'Root/actions/user/pass';

import { email } from 'Root/js/validator';
import bind from 'Root/js/bind';

import PatNav, { Section } from 'Root/components/PatNav';
import Avatar from './Avatar';

class Setting extends Component {
  @bind
  updateName() {
    if (!this.refs.name.value) {
      izitoast.warning({
        rtl: 'true',
        title: 'مقادیر کافی نمیباشند'
      });
      return;
    }

    const { dispatch } = this.props;

    dispatch(updateName({
      name: this.refs.name.value
    }));
  }

  @bind
  updatePass() {
    if (!this.refs.oldpass.value || !this.refs.freshpass.value) {
      izitoast.warning({
        rtl: true,
        title: 'مقادیر کافی نیست'
      });
      return;
    }

    updatePass({
      old: this.refs.oldpass.value,
      fresh: this.refs.freshpass.value
    });
  }

  @bind
  updateEmail() {
    if (
      !email(this.refs.email.value) ||
      !this.refs.email.value ||
      !this.refs.password.value) {

      izitoast.warning({
        rtl: true,
        title: 'مقادیر صحیح نمیباشند'
      });
      return;
    }

    const { dispatch } = this.props;

    dispatch(updateEmail({
      email: this.refs.email.value,
      password: this.refs.password.value
    }));
  }

  render() {
    return (
      <PatNav>
        <Section
          name='first'
          render={() => <Avatar />}
        >
          عکس پروفایل
        </Section>
        {/* <Section
          name='second'
          render={this.shit}
        >
          نام
        </Section> */}
      </PatNav>
    );
  }
}

export default connect(
  state => ({
    user: state.user
  })
)(Setting);

/*
let profileImage = null;

if (this.props.user.avatar) {
  profileImage = <Button
    handleClick={this.removeAvatar}
    color='red'>
    حذف
  </Button>;
}

return (
  <div className={styles.container}>
    <Box>
      <h3 className={styles.title}>عکس</h3>

      <Field>
        <div>
          <p>عکس</p>
          {this.renderImage()}
        </div>

        <div>
          <input
            type='file'
            ref='file'
            className={styles.avatarInput}
            onChange={this.updateAvatar} />
            <Button
              handleClick={this.openInput}
              color='blue'>
              به روز رسانی
            </Button>
            { profileImage }
          </div>
        </Field>
      </Box>

      <Box>
        <h3 className={styles.title}>نام</h3>
        <Field>
          <div className={styles.currentValue}>
            <p>نام</p>
            <input
              type='text'
              placeholder='نام'
              ref='name'
              className={styles.fieldInput}
              defaultValue={this.props.user.name}
            />
          </div>

          <div>
            <Button
              color='blue'
              handleClick={this.updateName}>
              به روز رسانی
            </Button>
          </div>
        </Field>
      </Box>

      <Box>
        <h3 className={styles.title}>ایمیل</h3>
        <Field>
          <div>
            <p>ایمیل</p>
            <input
              type='email'
              ref='email'
              className={styles.fieldInput}
              placeholder='ایمیل'
              defaultValue={this.props.user.email}
            />
            <input
              type='password'
              ref='password'
              className={styles.fieldInput}
              placeholder='رمز'
            />
          </div>

          <div>
            <Button
              color='blue'
              handleClick={this.updateEmail}>
              به روز رسانی
            </Button>
          </div>
        </Field>
      </Box>

      <Box>
        <h3 className={styles.title}>رمز عبور</h3>
        <Field>
          <div>
            <p>رمز</p>
            <input
              type='password'
              ref='oldpass'
              className={styles.fieldInput}
              placeholder='رمز کنونی'
            />
            <input
              type='password'
              ref='freshpass'
              className={styles.fieldInput}
              placeholder='رمز جدید'
            />
          </div>

          <div>
            <Button
              color='blue'
              handleClick={this.updatePass}>
              به روز رسانی
            </Button>
          </div>
        </Field>
      </Box>
  </div>
);
 */
