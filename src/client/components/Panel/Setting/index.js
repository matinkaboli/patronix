import React, { Component } from 'react';
import izitoast from 'izitoast';
import { connect } from 'react-redux';

import bind from 'Root/js/bind';
import { email } from 'Root/js/validator';
import lazy from 'Root/js/lazy';
import Field from 'Root/components/Panel/Field';
import Button from 'Root/components/Button';
import Box from 'Root/components/Box';
import updateAvatar from 'Root/actions/user/avatar/update';
import removeAvatar from 'Root/actions/user/avatar/remove';
import updateName from 'Root/actions/user/name';
import updatePass from 'Root/actions/user/pass';
import updateEmail from 'Root/actions/user/email';
import types from 'Root/actions';
import defaultImage from 'Root/images/user-default.png';
import styles from './index.less';

class Setting extends Component {
  @bind
  updateAvatar() {
    let reader = new FileReader();
    let file = this.refs.file.files[0];
    let type = file.type.split('/')[1];
    let { dispatch } = this.props;

    reader.addEventListener('loadend', () => {
      if (file.size > 1048576) {
        izitoast.warning({
          rtl: true,
          title: 'حجم فایل حداکثر می تواند ۱ مگابایت باشد.'
        });

        return;
      }

      if (!['jpg', 'jpeg', 'png'].includes(type)) {
        izitoast.warning({
          rtl: true,
          title: 'فرمت فایل باید jpg یا png باشد'
        });

        return;
      }

      dispatch(updateAvatar({
        type,
        size: file.size,
        file: reader.result
      }));
    });

    reader.readAsBinaryString(this.refs.file.files[0]);
  }

  @bind
  removeAvatar() {
    this.props.dispatch(removeAvatar({}));
  }

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

  @bind
  openInput() {
    this.refs.file.click();
  }

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
                  به روز رسانیaaaaaaaaaaaaaaaaaaaaaa
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
  }
}

export default lazy(
  connect(
    state => ({ user: state.user })
  )(Setting),
  types.user.LOAD
);
