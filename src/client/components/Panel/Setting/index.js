import React, { Component } from 'react';
import { connect } from 'react-redux';
import izitoast from 'izitoast';

import bind from 'Root/bind';
import Field from 'Root/components/Panel/Field';
import updateAvatar from 'Root/actions/user/avatar/update';
import styles from './index.less';
import defaultImage from 'Root/images/user-default.png';
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

  render() {
    let profileImage = null;

    if (this.props.user.avatar) {
      profileImage = <p className={styles.deleteBtn}>حذف</p>;
    }
    const fields = [
      {
        currentValue: this.props.user.name,
        name: 'نام'
      },
      {
        currentValue: '******',
        name: 'رمز عبور'
      },
      {
        currentValue: this.props.user.email,
        name: 'ایمیل'
      }
    ];

    return (
      <div>
        <div className={styles.setting}>
          <p className={styles.settingTitle}>تنظیمات مشخصات کاربر</p>
          <div className={styles.hr} />

          <section className={styles.section}>

            <div>
              <label>
                <input
                  type='file'
                  ref='file'
                  className={styles.avatarInput}
                  onChange={this.updateAvatar} />
                  <p className={styles.updateBtn}>به روز رسانی</p>
              </label>
              { profileImage }
            </div>

            <div className={styles.currentValue}>
              {this.renderImage()}
              <p>عکس کاربر</p>
            </div>
          </section>

          <Field fields={fields} />
        </div>
      </div>
    );
  }
}

export default connect(state => ({ user: state.user }))(Setting);
