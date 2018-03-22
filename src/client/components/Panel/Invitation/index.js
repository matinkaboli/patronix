import React, { Component } from 'react';
import { connect } from 'react-redux';

import acceptOperator from 'Root/actions/user/site/operator/accept';

import bind from 'Root/js/bind';

import Field from 'Root/components/Panel/Field';
import Button from 'Root/components/Button';
import Box from 'Root/components/Box';

import styles from './index.less';


class Invitation extends Component {
  @bind
  accept(code) { return () => {
    this.props.dispatch(acceptOperator(code));
  };
  }

  render() {
    return (
      <Box>
        <h1 className={styles.title}>
          {this.props.invitations && this.props.invitations.length ?
          'دعوت ها' :
          'شما در هیچ سایتی دعوت نشده اید'}
        </h1>
        {this.props.invitations && this.props.invitations.map((v, i) =>
          <Field key={i}>
            <div>
              <p>از طرف: </p>
              <p>{v.from}</p>
            </div>

            <div>
              <Button
                color='blue'
                handleClick={this.accept(v.code)}>
                پذیرفتن
              </Button>
              <Button
                color='red'>
                رد کردن
              </Button>
            </div>
          </Field>
        )}
      </Box>
    );
  }
}

export default connect(
  state => ({
    invitations: state.invitations
  })
)(Invitation);
