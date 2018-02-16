import React, { Component } from 'react';
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
    if (this.props.data.avatar.url) {
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

export default Setting;
