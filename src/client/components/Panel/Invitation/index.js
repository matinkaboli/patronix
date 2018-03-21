import React, { Component } from 'react';
import { connect } from 'react-redux';

import Field from 'Root/components/Panel/Field';
import Button from 'Root/components/Button';
import Box from 'Root/components/Box';

import styles from './index.less';


class Invitation extends Component {
  render() {
    return (
      <Box>
        <h1 className={styles.title}>
          {this.props.invitations.length ?
          'دعوت ها' :
          'شما در هیچ سایتی دعوت نشده اید'}
        </h1>
        {this.props.invitations.map((v, i) =>
          <Field key={i}>
            <div>
              <p>از طرف: </p>
              <p>{v.from}</p>
            </div>

            <div>
              <Button
                color='blue'>
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
