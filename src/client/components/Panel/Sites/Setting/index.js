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
      <PatNav
        rootPath={`/panel/sites/${id}`}
        rootProps={{
          id
        }}>
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
          render={() => <Token
            token={this.props.site.token}
          />}>
          توکن سایت
        </Section>

        <Section
          path='/operators'
          render={() => <Operators
            owner={this.props.site.owner}
            operators={this.props.site.operators}
          />}>
          پشتیبان ها
        </Section>

        <Section
          path='/invite-operator'
          render={() => <InviteOperator />}>
          دعوت پشتیبان
        </Section>

        <Section
          path='/information'
          render={() => <Information
            information={this.props.site.information}
          />}>
          درباره سایت
        </Section>

        <Section
          path='/avatar'
          render={() => <Avatar
            avatar={this.props.site.avatar}
          />}>
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
