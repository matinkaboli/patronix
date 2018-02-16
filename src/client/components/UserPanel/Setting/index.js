import React, { Component } from 'react';
import { connect } from 'react-redux';

import bind from 'Root/bind';
import socket from 'Root/socket';

class Setting extends Component {
  @bind
  upload() {
    let reader = new FileReader();
    let file = this.refs.file.files[0];

    reader.addEventListener('loadend', () => {
      socket.emit('uploadAvatar', {
        type: file.type.split('/')[1],
        size: file.size,
        file: reader.result
      });
    });

    reader.readAsBinaryString(this.refs.file.files[0]);
  }

  @bind
  renderImage() {
    if (this.props.setting.avatar.url) {
      return (
        <img src={this.props.data.avatar.url} />
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
          <button onClick={this.upload}>upload</button>
        </div>
      </div>
    );
  }
}

export default connect(state => ({ setting: state.setting }))(Setting);
