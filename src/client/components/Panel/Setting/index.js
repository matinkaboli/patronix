import React, { Component } from 'react';
import { connect } from 'react-redux';
import izitoast from 'izitoast';

import bind from 'Root/bind';
import setAvatar from 'Root/actions/user/setAvatar';

class Setting extends Component {
  @bind
  setAvatar() {
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

      dispatch(setAvatar({
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
        <img src={this.props.user.avatar} />
      );
    }

    else {
      return (
        <p>you dont have avatar</p>
      );
    }
  }

  render() {
    return (
      <div>
        <div>
          {this.renderImage()}
          <input type='file' ref='file' />
          <button onClick={this.setAvatar}>upload</button>
        </div>

        <div>
          <input
            type='text'
            ref='fname'
            defaultValue={this.props.user.name.first} />
          <input
            type='text'
            ref='lname'
            defaultValue={this.props.user.name.last} />
        </div>
      </div>
    );
  }
}

export default connect(state => ({ user: state.user }))(Setting);
