import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Box from 'Root/components/Box';
import lazy from 'Root/js/lazy';
import types from 'Root/actions';
import Button from 'Root/components/Button';
import styles from './index.less';

class Sites extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Box>
          <div className={styles.header}>
            <h3>
              لیست سایت های شما:
            </h3>
            <Button>
              افزودن سایت جدید
            </Button>
          </div>
          {this.props.sites.map((v, i) =>
            <div key={i}>
              <p>{v.name}</p>
              <Link to={`/panel/sites/${v.name}`}>
                <Button>
                  تنظیمات سایت
                </Button>
              </Link>
            </div>
          )}
        </Box>

        <Box>
          <div className={styles.header}>
            <h3>
              لیست سایت هایی که شما در آن اوپراتور هستید:
            </h3>
          </div>
        </Box>
      </div>
    );
  }
}

export default lazy({
  component: connect(
    state => ({ sites: state.sites })
  )(Sites),
  type: types.sites.LOAD
});
