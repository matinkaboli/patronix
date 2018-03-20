import React, { Component } from 'react';
import { connect } from 'react-redux';
import izitoast from 'izitoast';

import Box from 'Root/components/Box';
import lazy from 'Root/js/lazy';
import types from 'Root/actions';
import bind from 'Root/js/bind';
import Button from 'Root/components/Button';
import Field from 'Root/components/Panel/Field';
import updateName from 'Root/actions/user/site/name';
import revokeToken from 'Root/actions/user/site/revokeToken';
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

  render() {
    return (
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
                defaultValue={this.props.sites.name}
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
              <p>{this.props.sites.token}</p>
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
      </div>
    );
  }
}

export default lazy(
  connect(
    state => ({
      sites: state.sites.site
    })
  )(Site),
  types.sites.LOAD
);
