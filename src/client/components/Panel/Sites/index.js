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
    return (
      <div className={styles.container}>
        <Box>
          <h3 className={styles.title}>لیست سایت های شما:</h3>
          <br />
          <div className={styles.site}>
           <p>نام سایت: {this.props.sites.site.name}</p>
           <Link to={`/panel/sites/${this.props.sites.site.name}`}>
             <Button color='black'>
               تنظیمات سایت
             </Button>
           </Link>
          </div>
          <h3 className={styles.title} />
          <div className={styles.site}>
            <input
              type='text'
              ref='new'
              placeholder='افزودن سایت جدید'
              className={styles.newSite}
            />
            <Button
              color='black'
              handleClick={this.newSite}>
              افزودن
            </Button>
          </div>
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
