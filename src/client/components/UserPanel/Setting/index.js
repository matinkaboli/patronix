import React, { Component } from 'react';
import { connect } from 'react-redux';
import izitoast from 'izitoast';

import bind from 'Root/bind';
import setAvatar from 'Root/actions/setting/setAvatar';

class Setting extends Component {
  @bind
  setAvatar() {
    let reader = new FileReader();
    let file = this.refs.file.files[0];
    let { dispatch } = this.props;

    reader.addEventListener('loadend', () => {
      if (file.size > 512000) {
        izitoast.warning({
          rtl: true,
          title: 'حجم فایل باید حداکثر ۵۱۲ کیلوبایت باشد.'
        });

        return;
      }

      if (!['jpg', 'png'].includes(file.type)) {
        izitoast.warning({
          rtl: true,
          title: 'فرمت فایل باید jpg یا png باشد'
        });

        return;
      }

      dispatch(setAvatar({
        type: file.type.split('/')[1],
        size: file.size,
        file: reader.result
      }));
    });

    reader.readAsBinaryString(this.refs.file.files[0]);
  }

  @bind
  renderImage() {
    if (this.props.setting.avatar) {
      return (
        <img src={this.props.setting.avatar} />
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
      </div>
    );
  }
}

export default connect(state => ({ setting: state.setting }))(Setting);
