import React, { Component } from 'react';

import Menu from 'Root/components/Menu';

class Denied extends Component {
  render() {
    return (
      <div>
        <Menu />
        <h1>شما اجازه ورود به این صفحه را ندارید</h1>
      </div>
    );
  }
}

export default Denied;
