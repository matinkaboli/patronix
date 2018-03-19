import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from 'Root/components/Header';
import Content from 'Root/components/Content';
import toggle from 'Root/js/toggle';

import styles from './index.less';

class App extends Component {
  render() {
    return (
      <div
        className={toggle(styles, this.props.appStatus, 'container')}>
        <Header />
        <Content />
      </div>
    );
  }
}

export default connect(
  state => ({
    appStatus: state.appStatus
  })
)(App);
