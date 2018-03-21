import React, { Component } from 'react';
import { connect } from 'react-redux';

import Box from 'Root/components/Box';


class Invitation extends Component {
  render() {
    return (
      <Box>
        {this.props.invitations.map((v, i) => {
          <div key={i}>
            <p>From: {v.from}</p>
            <p>Code: {v.code}</p>
            <hr />
          </div>;
        })}
      </Box>
    );
  }
}

export default connect(
  state => ({
    invitations: state.invitations
  })
)(Invitation);
