import React, { Component } from 'react';
import { connect } from 'react-redux';

import Box from 'Root/components/Box';

import styles from './index.less';


class Invitation extends Component {
  render() {
    console.log(this.props.invitations);
    return (
      <Box>
        <h1 className={styles.title}>
          {this.props.invitations.length ?
          'دعوت ها' :
          'شما در هیچ سایتی دعوت نشده اید'}
        </h1>
        {this.props.invitations.map((v, i) =>
          <div key={i}>
            <p>From: {v.from}</p>
            <p>Code: {v.code}</p>
            <hr />
          </div>
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
