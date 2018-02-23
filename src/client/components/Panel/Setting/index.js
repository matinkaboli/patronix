import React, { Component } from 'react';
import { connect } from 'react-redux';
import izitoast from 'izitoast';

import bind from 'Root/bind';
import updateAvatar from 'Root/actions/user/updateAvatar';
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
          title: 'حجم فایل باید حداکثر ۵۱۲ کیلوبایت باشد.'
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
      <p>you dont have avatar</p>
    );
  }

  render() {
    return (
      <div>
        <div className={styles.setting}>
          <p className={styles.settingTitle}>تنظیمات مشخصات کاربر</p>
          <div className={styles.hr} />

          <section className={styles.section}>

            <div className={styles.butttons}>
              <label>
                <input
                  type='file'
                  ref='file'
                  className={styles.avatarInput}
                  onChange={this.updateAvatar} />
                  <p className={styles.updateBtn}>به روز رسانی</p>
              </label>
              <p className={styles.deleteBtn}>حذف</p>
            </div>

            <div className={styles.currentValue}>
              {this.renderImage()}
              <p>عکس کاربر</p>
            </div>
          </section>

          <section className={styles.section}>

            <div>
              <p className={styles.updateBtn}>به روز رسانی</p>

              {/* <input
                type='text'
                ref='name'
                defaultValue={this.props.user.name} /> */}
            </div>

            <div className={styles.currentValue}>
              <p>{this.props.user.name}</p>
              <p>نام</p>
            </div>

          </section>

          <section className={styles.section}>

            <div>
              <p className={styles.updateBtn}>به روز رسانی</p>

              {/* <input
                type='text'
                ref='name'
                defaultValue={this.props.user.name} /> */}
            </div>

            <div className={styles.currentValue}>
              <p>*****</p>
              <p>رمز</p>
            </div>

          </section>

          <section className={styles.section}>

            <div>
              <p className={styles.updateBtn}>به روز رسانی</p>

              {/* <input
                type='text'
                ref='name'
                defaultValue={this.props.user.name} /> */}
            </div>

            <div className={styles.currentValue}>
              <p>{this.props.user.email}</p>
              <p>ایمیل</p>
            </div>

          </section>
        </div>
      </div>
    );
  }
}

export default connect(state => ({ user: state.user }))(Setting);
