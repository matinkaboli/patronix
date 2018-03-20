import React, { Component } from 'react';
import { connect } from 'react-redux';
import izitoast from 'izitoast';

import { email } from 'Root/js/validator';
import Box from 'Root/components/Box';
import lazy from 'Root/js/lazy';
import types from 'Root/actions';
import bind from 'Root/js/bind';
import Button from 'Root/components/Button';
import Field from 'Root/components/Panel/Field';
import updateName from 'Root/actions/user/site/name';
import revokeToken from 'Root/actions/user/site/revokeToken';
import inviteOperator from 'Root/actions/user/site/operator/invite';
import removeOperator from 'Root/actions/user/site/operator/remove';
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
  removeOperator() { return email => () => {
    this.props.dispatch(removeOperator(email));
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
          {this.props.site.operators.length ?
            this.props.site.operators.map((v, i) =>
            <Field key={i}>
              <div>
                <p>نام: {v.name}</p>
                <p>ایمیل: {v.email}</p>
              </div>

              <div>
                <Button
                  color='red'
                  handleClick={this.removeOperator()(v.email)}>
                  حذف پشتیبان
                </Button>
              </div>
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
                color='black'
                handleClick={this.newOperator}>
                اضافه کردن
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
      site: state.sites.site
    })
  )(Site),
  types.sites.LOAD
);
