import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import izitoast from 'izitoast';

import Box from 'Root/components/Box';
import lazy from 'Root/js/lazy';
import types from 'Root/actions';
import bind from 'Root/js/bind';
import Button from 'Root/components/Button';
import newSite from 'Root/actions/user/site/new';
import styles from './index.less';

class Sites extends Component {
  @bind
  newSite() {
    if (!this.refs.new.value) {
      izitoast.warning({
        rtl: true,
        title: 'مقادیر کافی نیستند'
      });

      return;
    }

    this.props.dispatch(newSite(this.refs.new.value));
  }

  render() {
    console.log('Props: ', this.props.sites);
    return (
      <div className={styles.container}>
        <Box>
          <h3 className={styles.title}>لیست سایت های شما:</h3>
          <br />
          {this.props.sites.site ?
            <div className={styles.site}>
              <p>نام سایت: {this.props.sites.site.name}</p>
              <Link to='/panel/sites/setting'>
                <Button color='blue'>
                  تنظیمات سایت
                </Button>
              </Link>
            </div> :
            <div className={styles.site}>
              <input
                type='text'
                ref='new'
                placeholder='افزودن سایت جدید'
                className={styles.newSite}
              />
              <Button
                color='blue'
                handleClick={this.newSite}>
                افزودن
              </Button>
              <h3 className={styles.title} />
            </div>
          }
        </Box>

        <Box>
          <div>
            <h3 className={styles.title}>
              لیست سایت هایی که شما در آن اوپراتور هستید:
            </h3>
          </div>
        </Box>
      </div>
    );
  }
}

export default lazy(
  connect(
    state => ({ sites: state.sites })
  )(Sites),
  types.sites.LOAD
);
