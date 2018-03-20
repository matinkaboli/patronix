import React, { Component } from 'react';
import { connect } from 'react-redux';

import Box from 'Root/components/Box';
import lazy from 'Root/js/lazy';
import types from 'Root/actions';
import bind from 'Root/js/bind';
import Button from 'Root/components/Button';
import Field from 'Root/components/Panel/Field';
import styles from './index.less';

class Site extends Component {
  @bind
  updateName() {
    console.log('Name updated');
  }

  render() {
    return (
      <div>
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
