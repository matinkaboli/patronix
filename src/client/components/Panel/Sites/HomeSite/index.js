import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import izitoast from 'izitoast';

import leaveSite from 'Root/actions/user/site/operator/leave';
import removeSite from 'Root/actions/user/site/remove';
import newSite from 'Root/actions/user/site/new';
import types from 'Root/actions';

import assure from 'Root/js/assure';
import lazy from 'Root/js/lazy';
import bind from 'Root/js/bind';

import Button from 'Root/components/Button';
import Box from 'Root/components/Box';

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

  @bind
  leaveSite(id) { return () => {
    assure(() => {
      this.props.dispatch(leaveSite(id));
    });
  };
  }

  @bind
  removeSite() {
    assure(() => {
      this.props.dispatch(removeSite());
    });
  }

  render() {
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
              <Button
                color='red'
                handleClick={this.removeSite}>
                حذف سایت
              </Button>
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
            </div>
          }
        </Box>

        <Box>
          <div>
            <h3 className={styles.title}>
              {this.props.sites.sites && this.props.sites.sites.length ?
                'لیست سایت هایی که پشتیبانی میکنید:' :
              'شما در سایت های دیگران پشتیبانی نمیکنید'}
            </h3>
            {this.props.sites.sites && this.props.sites.sites.map((v, i) =>
              <div key={i} className={styles.site}>
                <p>{v.name}</p>
                <Button
                  color='red'
                  handleClick={this.leaveSite(v._id)}>
                  ترک کردن
                </Button>
              </div>
            )}
          </div>
        </Box>
      </div>
    );
  }
}

export default lazy(
  withRouter(
    connect(
      state => ({ sites: state.sites })
    )(Sites),
  ),
  types.sites.LOAD
);
