import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import izitoast from 'izitoast';

import leaveSite from 'Root/actions/user/site/operator/leave';
import removeSite from 'Root/actions/user/site/remove';
import newSite from 'Root/actions/user/site/new';

import assure from 'Root/js/assure';
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
  leaveSite(id) {
    return () => {
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

  @bind
  ownedSite() {
    return (
      <Box>
        <h3 className={styles.title}>لیست سایت های شما:</h3>
        {this.props.ownedSite.map((v, i) =>
          <div key={i} className={styles.site}>
            <p>نام سایت: {v.name}</p>
            <div>
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
          </div>
        </div>
      )}
      </Box>
    );
  }

  @bind
  createNewSite() {
    return (
      this.props.ownedSite.length <= 2 &&
      <Box>
        <h3 className={styles.title}>افزودن سایت جدید</h3>
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
    </Box>
    );
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.rightSide}>
          {this.ownedSite()}
          {this.createNewSite()}
        </div>
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

export default withRouter(
  connect(
    state => ({
      ownedSite: state.user.sites,
      sites: state.sites
    })
  )(Sites),
);
