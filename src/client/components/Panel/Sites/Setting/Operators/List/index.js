import React, { Component, Fragment } from 'react';

import removeOperator from 'Root/actions/user/site/operator/remove';

import { getState } from 'Root/store';
import assure from 'Root/js/assure';
import bind from 'Root/js/bind';

import Field from 'Root/components/Panel/Field';
import Button from 'Root/components/Button';

import styles from './index.less';


export default class List extends Component {
  @bind
  removeOperator(email) {
    return () => {
      assure(() => {
        removeOperator(this.props.id, email);
      });
    };
  }

  render() {
    const user = getState().user.email;

    return (
      <Fragment>
        {this.props.operators ?
          this.props.operators.map((v, i) =>
          <Field key={i}>

            <div className={styles.userInfo}>
              <p>نام: {v.name}</p>
              <p>ایمیل: {v.email}</p>
            </div>

            {user === v.email ? null :
              <div>
                <Button
                  color='red'
                  handleClick={this.removeOperator(v.email)}>
                    حذف پشتیبان
                </Button>
              </div>
            }

          </Field>
        ) : null
        }
      </Fragment>
    );
  }
}
