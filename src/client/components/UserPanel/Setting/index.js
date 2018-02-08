import React, { Component } from 'react';
import bind from 'Root/bind';
import socket from 'Root/socket';

class Setting extends Component {
  @bind
  click() {
    let reader = new FileReader();

    reader.addEventListener('loadend', () => {
      socket.emit('uploadAvatar', reader.result);
    });

    reader.readAsBinaryString(this.refs.file.files[0]);
  }

  @bind
  renderImage() {
    if (this.props.data.avatar) {
      return (
        <img src={this.props.data.avatar} />
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
          <button onClick={this.click}>click</button>
        </div>
      </div>
    );
  }
}

export default Setting;
