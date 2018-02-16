import React, { Component } from 'react';

import Form from './Form';
import Menu from 'Components/Menu';

import styles from './index.less';

class Recovery extends Component {
  render() {
    return (
      <div>
        <Menu />
        <div className={styles.formContainer}>
          <Form />
        </div>
      </div>
    );
  }
}

export default Recovery;
