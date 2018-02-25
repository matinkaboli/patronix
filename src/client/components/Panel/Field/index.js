import React, { Component } from 'react';

import styles from './index.less';

class Field extends Component {
  render() {
    return (
      <React.Fragment>
            {this.props.fields.map((v, i) =>
                (() =>
                  <div key={i} className={styles.section}>
                    <div>
                      <p className={styles.updateBtn}>به روز رسانی</p>
                    </div>

                    <div className={styles.currentValue}>
                      <p>{ v.currentValue }</p>
                      <p>{ v.name }</p>
                    </div>
                  </div>
                )()
            )}
      </React.Fragment>
    );
  }
}

export default Field;
