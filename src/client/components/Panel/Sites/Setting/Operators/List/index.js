import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import removeOperator from 'Root/actions/user/site/operator/remove';

import assure from 'Root/js/assure';
import bind from 'Root/js/bind';

import Field from 'Root/components/Panel/Field';
import Button from 'Root/components/Button';

class List extends Component {
  @bind
  removeOperator(email) {
    return () => {
      assure(() => {
        this.props.dispatch(removeOperator(email));
      });
    };
  }

  render() {
    return (
      <Fragment>
        {this.props.operators ?
          this.props.operators.map((v, i) =>
          <Field key={i}>
            <div>
              <p>نام: {v.name}</p>
              <p>ایمیل: {v.email}</p>
            </div>

            {this.props.owner === v._id ? '' :
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


export default connect(
  state => ({
    operators: state.site.operators,
    owner: state.site.owner
  })
)(List);
