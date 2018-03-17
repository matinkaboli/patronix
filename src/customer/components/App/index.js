import React, { Component } from 'react';

import Header from 'Root/components/Header';
import Content from 'Root/components/Content';
import styles from './index.less';

class App extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Header />
        <Content />
      </div>
    );
  }
}

export default App;
