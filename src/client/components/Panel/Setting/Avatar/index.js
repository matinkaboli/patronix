import React, { Component } from 'react';
import { connect } from 'react-redux';

import updateAvatar from 'Root/actions/user/avatar/update';
import removeAvatar from 'Root/actions/user/avatar/remove';

import { image } from 'Root/js/validator';
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
    const reader = new FileReader();
    const file = this.refs.file.files[0];

    reader.addEventListener('loadend', () => {
      if (!image(file)) {
        return;
      }

      this.props.dispatch(updateAvatar({
        type: file.type.split('/')[1],
        size: file.size,
        file: reader.result,
      }));
    });

    reader.readAsBinaryString(file);
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
            ref='file'
            type='file'
            className={styles.avatarInput}
            onChange={this.updateAvatar}
          />

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
