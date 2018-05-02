import React, { Component } from 'react';
import { connect } from 'react-redux';
import izitoast from 'izitoast';

import updateAvatar from 'Root/actions/user/avatar/update';
import removeAvatar from 'Root/actions/user/avatar/remove';

import bind from 'Root/js/bind';

import Field from 'Root/components/Panel/Field';
import Button from 'Root/components/Button';

import defaultImage from 'Root/images/user-default.png';
import styles from './index.less';


class Avatar extends Component {
  @bind
  renderImage() {
    if (this.props.avatar) {
      return <img
          src={this.props.avatar}
          alt='عکس کاربر'
          className={styles.avatarImage} />;
    }

    return <img
        src={defaultImage}
        alt='عکس کاربر'
        className={styles.avatarImage} />;
  }

  @bind
  removeAvatar() {
    this.props.dispatch(removeAvatar({}));
  }

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
  openInput() {
    this.refs.file.click();
  }

  render() {
    return (
      <Field>
        <div className={styles.picGroup}>
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
          {
            this.props.avatar &&
            <Button
              handleClick={this.removeAvatar}
              color='red'>
              حذف
            </Button>
          }
        </div>
      </Field>
    );
  }
}

export default connect(
  state => ({
    avatar: state.user.avatar
  })
)(Avatar);
