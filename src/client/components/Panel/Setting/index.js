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
        <img src={this.props.user.avatar} className={styles.avatarImage} />
      );
    }

    return (
      <img src={defaultImage} className={styles.avatarImage} />
    );
  }

  @bind
  openInput() {
    this.refs.file.click();
  }

  @bind
  update(el) {
    const { dispatch } = this.props;

    if (el === 'name') {
      dispatch(updateName({
        name: this.refs.name.value
      }));
    } else if (el === 'pass') {
      updatePass({
        old: this.refs.oldpass.value,
        fresh: this.refs.freshpass.value
      });
    } else {
      if (email(this.refs.email.value)) {
        dispatch(updateEmail({
          email: this.refs.email.value,
          password: this.refs.password.value
        }));
      } else {
        izitoast.warning({
          rtl: true,
          title: 'ایمیل صحیح نمیباشد'
        });
      }
    }
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
      <Box>
        <h3 className={styles.title}>تنظیمات</h3>

        <Field>
          <div>
            <div>عکس کاربر</div>
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

        <Field>
          <div className={styles.currentValue}>
            <div>نام</div>
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
              handleClick={() => { this.update('name'); }}>
              به روز رسانی
            </Button>
          </div>
        </Field>

        <Field>
          <div>
            <div>رمز عبور</div>
            <input
              type='text'
              ref='oldpass'
              className={styles.fieldInput}
              placeholder='رمز کنونی'
            />
            <input
              type='text'
              ref='freshpass'
              className={styles.fieldInput}
              placeholder='رمز کنونی'
            />
          </div>

          <div>
            <Button
              color='blue'
              handleClick={() => { this.update('pass'); }}>
              به روز رسانی
            </Button>
          </div>
        </Field>

        <Field>
          <div>
            <div>ایمیل</div>
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
              defaultValue={this.props.user.email}
            />
          </div>

          <div>
            <Button
              color='blue'
              handleClick={() => { this.update('email'); }}>
              به روز رسانی
            </Button>
          </div>
        </Field>
      </Box>
    );
  }
}

export default lazy({
  component: connect(
    state => ({ user: state.user })
  )(Setting),
  type: types.user.LOAD
});
