import React, { Component } from 'react';
import { connect } from 'react-redux';
import izitoast from 'izitoast';
import { withRouter } from 'react-router-dom';

import inviteOperator from 'Root/actions/user/site/operator/invite';
import removeOperator from 'Root/actions/user/site/operator/remove';
import revokeToken from 'Root/actions/user/site/revokeToken';
import updateName from 'Root/actions/user/site/name';
import loadSite from 'Root/actions/user/site/load';

import { email } from 'Root/js/validator';
import assure from 'Root/js/assure';
import bind from 'Root/js/bind';
import lazy from 'Root/js/lazy';

import Field from 'Root/components/Panel/Field';
import Button from 'Root/components/Button';
import Box from 'Root/components/Box';
import PNav, { Section } from 'Root/components/PNav';

import styles from './index.less';


class Site extends Component {
  @bind
  updateName() {
    if (!this.refs.name.value) {
      izitoast.warning({
        rtl: true,
        title: 'مقادیر کافی نیستند'
      });
      return;
    }

    this.props.dispatch(updateName(this.refs.name.value));
  }

  @bind
  revokeToken() {
    this.props.dispatch(revokeToken());
  }

  @bind
  removeOperator(email) {
    return () => {
      assure(() => {
        this.props.dispatch(removeOperator(email));
      });
    };
  }

  @bind
  newOperator() {
    if (!this.refs.newOperator.value) {
      izitoast.warning({
        rtl: true,
        title: 'مقادیر کافی نیستند'
      });
      return;
    }

    if (!email(this.refs.newOperator.value)) {
      izitoast.error({
        rtl: true,
        title: 'ایمیل صحیح نمیباشد'
      });
      return;
    }

    inviteOperator(this.refs.newOperator.value);

    this.refs.newOperator.value = '';
  }

  render() {
    const id = this.props.match.params.id;
    return (
      <PNav>
        <Section
          path={`/panel/sites/${id}/name`}
          render={() => 'there'}>
          Hello
        </Section>

        <Section
          path={`/panel/sites/${id}/reza`}
          render={() => 'there'}>
          reza
        </Section>

        <Section
          path={`/panel/sites/${id}/mamad`}
          render={() => 'there'}>
          mamad
        </Section>
      </PNav>
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

/*
<div className={styles.container}>
  <Box>
    <h3 className={styles.title}>نام سایت</h3>

    <Field>
      <div>
        <p>نام سایت</p>
        <input
          type='text'
          ref='name'
          className={styles.fieldInput}
          placeholder='نام سایت'
          defaultValue={this.props.site.name}
        />
      </div>

      <div>
        <Button
          color='blue'
          handleClick={this.updateName}>
          به روز رسانی
        </Button>
      </div>
    </Field>
  </Box>

  <Box>
    <h3 className={styles.title}>توکن سایت</h3>
    <Field>
      <div>
        <p>توکن</p>
        <p>{this.props.site.token}</p>
        <code className={styles.script}>
        {`<script
        id='patronix-data'
        token=${this.props.site.token}
        src="${localStorage.getItem('patronixUrl')}/static/js/customer.js"
        ></script>`}
        </code>
      </div>

      <div>
        <Button
          color='blue'
          handleClick={this.revokeToken}>
          توکن جدید
        </Button>
      </div>
    </Field>
  </Box>

  <Box>
    <h3 className={styles.title}>پشتیبان ها</h3>
    {this.props.site.operators ?
      this.props.site.operators.map((v, i) =>
      <Field key={i}>
        <div>
          <p>نام: {v.name}</p>
          <p>ایمیل: {v.email}</p>
        </div>

        {this.props.site.owner === v._id ? '' : <div>
          <Button
            color='red'
            handleClick={this.removeOperator(v.email)}>
            حذف پشتیبان
          </Button>
        </div>}
      </Field>
      ) : ''
    }
  </Box>

  <Box>
    <h3 className={styles.title}>دعوت پشتیبان</h3>
    <Field>
      <div>
        <input
          type='email'
          ref='newOperator'
          placeholder='ایمیل پشتیبان'
          className={styles.fieldInput}
        />
      </div>

      <div>
        <Button
          color='blue'
          handleClick={this.newOperator}>
          اضافه کردن
        </Button>
      </div>
    </Field>
  </Box>
</div>
 */
