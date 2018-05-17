import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import loadSite from 'Root/actions/user/site/load';

import lazy from 'Root/js/lazy';

import PatNav, { Section } from 'Root/components/PatNav';
import InviteOperator from './Operators/Invite';
import Operators from './Operators/List';
import Token from './Token';
import Name from './Name';


class Site extends Component {
  render() {
    const id = this.props.match.params.id;
    return (
      <PatNav>
        <Section
          path={`/panel/sites/${id}/name`}
          render={() => <Name name={this.props.site.name} />}>
          نام سایت
        </Section>

        <Section
          path={`/panel/sites/${id}/token`}
          render={() => <Token />}>
          توکن سایت
        </Section>

        <Section
          path={`/panel/sites/${id}/operators`}
          render={() => <Operators />}>
          پشتیبان ها
        </Section>

        <Section
          path={`/panel/sites/${id}/invite-operator`}
          render={() => <InviteOperator />}>
          دعوت پشتیبان
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
