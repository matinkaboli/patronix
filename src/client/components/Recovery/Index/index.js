import React, { Component } from 'react';

import bind from 'Root/bind';
import recovery from 'Root/actions/recovery/recovery';

class Index extends Component {
  @bind
  recovery() {
    recovery(this.refs.email.value);
  }
  
  render() {
    return (
      <div>
        <input
          type='email'
          ref='email'
          placeholder='ایمیل'/>

          <button
            type='submit'
            onClick={this.recovery}>
            بازیابی رمز عبور
          </button>
        </div>
    );
  }
}

export default Index;
