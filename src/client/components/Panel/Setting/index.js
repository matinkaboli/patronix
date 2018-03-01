import React, { Component } from 'react';
import { connect } from 'react-redux';
import izitoast from 'izitoast';

import bind from 'Root/js/bind';
import lazy from 'Root/js/lazy';
import Field from 'Root/components/Panel/Field';
import Button from 'Root/components/Button';
import Box from 'Root/components/Box';
import updateAvatar from 'Root/actions/user/avatar/update';
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

  showName() {
    console.log('Hello');
  }

  render() {
    let profileImage = null;

    if (this.props.user.avatar) {
      profileImage = <Button
        color='red'
        handleClick={this.showName.bind(this)}>
        حذف
      </Button>;
    }

    return (
      <Box>
        <h3 className={styles.title}>تنظیمات مشخصات کاربر</h3>

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

            <div onClick={this.openInput}>
              <Button
                color='grey'
                handleClick={this.showName.bind(this)}>
                به روز رسانی
              </Button>
            </div>
            { profileImage }
          </div>
        </Field>

        <Field>
          <div>
            <div>نام</div>
            <p>{this.props.user.name}</p>
          </div>

          <div>
            <Button
              color='grey'
              handleClick={this.showName.bind(this)}>
              به روز رسانی
            </Button>
          </div>
        </Field>

        <Field>
          <div>
            <div>رمز عبور</div>
            <p>******</p>
          </div>

          <div>
            <Button
              color='grey'
              handleClick={this.showName.bind(this)}>
              به روز رسانی
            </Button>
          </div>
        </Field>

        <Field>
          <div>
            <div>ایمیل</div>
            <p>{this.props.user.email}</p>
          </div>

          <div>
            <Button
              color='grey'
              handleClick={this.showName.bind(this)}>
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
