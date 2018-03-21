import React, { Component } from 'react';
import { connect } from 'react-redux';

import Box from 'Root/components/Box';


class Invitation extends Component {
  render() {
    console.log(JSON.stringify(this.props, null, 2));
    return (
      <Box>
        <h1>Hello Babe</h1>
      </Box>
    );
  }
}

export default connect(
  state => ({
    state
  })
)(Invitation);
