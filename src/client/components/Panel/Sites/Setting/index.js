import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import loadSite from 'Root/actions/user/site/load';

import lazy from 'Root/js/lazy';

import PatNav, { Section } from 'Root/components/PatNav';
import InviteOperator from './Operators/Invite';
import Operators from './Operators/List';
import Information from './Information';
import Avatar from './Avatar';
import Token from './Token';
import Name from './Name';


class Site extends Component {
  render() {
    const id = this.props.match.params.id;

    return (
      <PatNav rootPath={`/panel/sites/${id}`} rootProps={{ id }}>

        <Section
          path='/name'
          component={Name}
          componentProps={{
            name: this.props.site.name
          }}>
          نام سایت
        </Section>

        <Section
          path='/token'
          component={Token}
          componentProps={{
            token: this.props.site.token
          }}>
          توکن سایت
        </Section>

        <Section
          path='/operators'
          component={Operators}
          componentProps={{
            operators: this.props.site.operators,
            owner: this.props.site.owner
          }}>
          پشتیبان ها
        </Section>

        <Section
          path='/invite-operator'
          component={InviteOperator}>
          دعوت پشتیبان
        </Section>

        <Section
          path='/information'
          component={Information}
          componentProps={{
            information: this.props.site.information
          }}>
          درباره سایت
        </Section>

        <Section
          path='/avatar'
          component={Avatar}
          componentProps={{
            avatar: this.props.site.avatar
          }}>
          عکس سایت
        </Section>

      </PatNav>
    );
  }
}

const findSite = (state, ownedProps) => ({
  site: state.user.sites.find(
    i => i.id === ownedProps.match.params.id
  )
});

export default lazy(
  withRouter(connect(findSite)(Site)),
  ({ params }) => `query {
    site(id: "${params.id}") {
      id
      token
      information
      avatar
      operators {
        name
        email
        avatar
      }
    }
  }`,
  'cache',
  loadSite
);
