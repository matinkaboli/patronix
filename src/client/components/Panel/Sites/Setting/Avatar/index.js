import React, { Component } from 'react';

import updateAvatar from 'Root/actions/user/site/avatar/update';
import removeAvatar from 'Root/actions/user/site/avatar/remove';


import { image } from 'Root/js/validator';
import bind from 'Root/js/bind';

import Field from 'Root/components/Panel/Field';
import Button from 'Root/components/Button';

import defaultImage from 'Root/images/user-default.png';
import styles from './index.less';


export default class extends Component {
  @bind
  renderImage() {
    if (this.props.avatar) {
      return <img
        alt='عکس کاربر'
        src={this.props.avatar}
        className={styles.avatarImage}
      />;
    }

    return <img
      alt='عکس کاربر'
      src={defaultImage}
      className={styles.avatarImage}
    />;
  }

  @bind
  removeAvatar() {
    removeAvatar(this.props.id);
  }

  @bind
  updateAvatar() {
    const reader = new FileReader();
    const file = this.refs.file.files[0];

    reader.addEventListener('loadend', () => {
      if (!image(file)) {
        return;
      }

      updateAvatar(
        this.props.id,
        {
        type: file.type.split('/')[1],
        size: file.size,
        file: reader.result,
        }
      );
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
        <div>
          {this.renderImage()}
        </div>

        <div>
          <input
            ref='file'
            type='file'
            onChange={this.updateAvatar}
            className={styles.avatarInput}
          />

          <Button handleClick={this.openInput} color='blue'>
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
