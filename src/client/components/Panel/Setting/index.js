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
      <PatNav>

        <Section path='/panel/setting/avatar' render={() => <Avatar />}>
          عکس پروفایل
        </Section>

        <Section path='/panel/setting/name' render={() => <Name />}>
          نام
        </Section>

        <Section path='/panel/setting/email' render={() => <Email />}>
          ایمیل
        </Section>

        <Section path='/panel/setting/password' render={() => <Password />}>
          رمز عبور
        </Section>

        <Section path='/panel/setting/bio' render={() => <Bio />}>
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
