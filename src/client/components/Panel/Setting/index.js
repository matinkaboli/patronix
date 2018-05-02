import React, { Component } from 'react';
import { connect } from 'react-redux';

import PatNav, { Section } from 'Root/components/PatNav';
import Password from './Password';
import Avatar from './Avatar';
import Email from './Email';
import Name from './Name';

class Setting extends Component {
  render() {
    return (
      <PatNav>

        <Section name='avatar' render={() => <Avatar />}>
          عکس پروفایل
        </Section>

        <Section name='name' render={() => <Name />}>
          نام
        </Section>

        <Section name='email' render={() => <Email />}>
          ایمیل
        </Section>

        <Section name='password' render={() => <Password />}>
          رمز عبور
        </Section>
      </PatNav>
    );
  }
}

export default connect(
  state => ({
    user: state.user
  })
)(Setting);
