import React, { Component } from 'react';
import { connect } from 'react-redux';

import PatNav, { Section } from 'Root/components/PatNav';
import Password from './Password';
import Avatar from './Avatar';
import Email from './Email';
import Name from './Name';
import Bio from './Bio';


class Setting extends Component {
  render() {
    return (
      <PatNav rootPath='/panel/setting'>

        <Section path='/avatar' component={Avatar}>
          عکس پروفایل
        </Section>

        <Section path='/name' component={Name}>
          نام
        </Section>

        <Section path='/email' component={Email}>
          ایمیل
        </Section>

        <Section path='/password' component={Password}>
          رمز عبور
        </Section>

        <Section path='/bio' component={Bio}>
          درباره
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
