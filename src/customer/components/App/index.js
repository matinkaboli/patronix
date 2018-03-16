import React, { Component } from 'react';

import Header from 'Root/components/Header';
import styles from './index.less';

class App extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Header />
      </div>
    );
  }
}

export default App;
