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

  render() {
    return (
      <div>
        <input type='file' ref='file' />
        <button onClick={this.click}>click</button>
      </div>
    );
  }
}

export default Setting;
