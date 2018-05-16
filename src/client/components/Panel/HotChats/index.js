import React, { Component } from 'react';
import { connect } from 'react-redux';

import ChatNav, { Section } from '../ChatNav';

class HotChats extends Component {
  render() {
    return (
      <ChatNav>
        {this.props.hotChats.map((v, i) =>
          <Section
            key={i}
            path={`/panel/hotchats/${v.id}`}
            render={() => <p>ab</p>}>
            <p>A</p>
          </Section>
        )}
      </ChatNav>
    );
  }
}

export default connect(
  state => ({
    hotChats: state.hotChats
  })
)(HotChats);
