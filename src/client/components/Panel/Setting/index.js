import React, { Component } from 'react';
import Rodal from 'rodal';
import izitoast from 'izitoast';
import { connect } from 'react-redux';

import bind from 'Root/js/bind';
import lazy from 'Root/js/lazy';
import Field from 'Root/components/Panel/Field';
import Button from 'Root/components/Button';
import Box from 'Root/components/Box';
import updateAvatar from 'Root/actions/user/avatar/update';
import name from 'Root/actions/user/info/name';
import types from 'Root/actions';
import defaultImage from 'Root/images/user-default.png';
import styles from './index.less';
import 'rodal/lib/rodal.css';

class Setting extends Component {
  state = {
    nameVisible: false,
    passVisible: false,
    emailVisible: false
  };

  @bind
  show(el) {
    if (el === 'name') {
      this.setState({ nameVisible: true });
    } else if (el === 'pass') {
      this.setState({ passVisible: true });
    } else {
      this.setState({ emailVisible: true });
    }
  }

  @bind
  hide(el) {
    if (el === 'name') {
      this.setState({ nameVisible: false });
    } else if (el === 'pass') {
      this.setState({ passVisible: false });
    } else {
      this.setState({ emailVisible: false });
    }
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
    let { dispatch } = this.props;

    if (el === 'name') {
      dispatch(name({
        name: this.refs[el].value
      }));
    } else if (name === 'pass') {
      console.log(this.refs[el].value); // Pass
    } else {
      console.log(this.refs[el].value); // Email
    }
  }

  render() {
    let profileImage = null;

    if (this.props.user.avatar) {
      profileImage = <Button
        color='red'>
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
                color='grey'>
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
              handleClick={() => { this.show('name'); }}>
              به روز رسانی
            </Button>
            <Rodal
              visible={this.state.nameVisible}
              animation='flip'
              onClose={() => { this.hide('name'); }}>

              <input
                type='text'
                placeholder='نام'
                ref='name'
                className={styles.fieldInput}
                defaultValue={this.props.user.name}
              />
              <Button
                color='blue'
                handleClick={() => {
                  this.hide('name');
                  this.update('name');
                }}>
                به روز رسانی
              </Button>
            </Rodal>
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
              handleClick={() => { this.show('pass'); }}>
              به روز رسانی
            </Button>
            <Rodal
              visible={this.state.passVisible}
              animation='flip'
              onClose={() => { this.hide('pass'); }}>

              <input
                type='text'
                ref='pass'
                className={styles.fieldInput}
                placeholder='رمز'
              />
              <Button
                color='blue'
                handleClick={() => {
                  this.hide('pass');
                  this.update('pass');
                }}>
                به روز رسانی
              </Button>
            </Rodal>
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
              handleClick={() => { this.show('email'); }}>
              به روز رسانی
            </Button>
            <Rodal
              visible={this.state.emailVisible}
              animation='flip'
              onClose={() => { this.hide('email'); }}>

              <input
                type='email'
                ref='email'
                className={styles.fieldInput}
                placeholder='ایمیل'
                defaultValue={this.props.user.email}
              />
              <Button
                color='blue'
                handleClick={() => {
                  this.hide('email');
                  this.update('email');
                }}>
                به روز رسانی
              </Button>
            </Rodal>
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
