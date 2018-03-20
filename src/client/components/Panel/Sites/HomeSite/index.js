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
import leaveSite from 'Root/actions/user/site/operator/leave';
import styles from './index.less';

class Sites extends Component {
  @bind
  showName(e) {
    console.log(e.target.dataset.id);
  }

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
  leaveSite() {
    izitoast.question({
        timeout: 10000,
        close: false,
        overlay: true,
        toastOnce: true,
        id: 'question',
        zindex: 999,
        rtl: true,
        title: 'مطمئنی؟',
        position: 'center',
        buttons: [
          ['<button><b>اره</b></button>', (instance, toast) => {
            instance.hide(toast, { transitionOut: 'fadeOut' }, 'button');

            // this.props.dispatch(leaveSite())
            console.log();
          }, true],
          ['<button>نه</button>', (instance, toast) => {
            instance.hide(toast, { transitionOut: 'fadeOut' }, 'button');
          }]
        ]
    });
  }

  render() {
    console.log(this.props);
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
            </div>
          }
        </Box>


        <Box>
          <div>
            <h3 className={styles.title}>
              لیست سایت هایی که پشتیبانی میکنید:
            </h3>
            {this.props.sites.length ?
              this.props.sites.sites.map((v, i) =>
              <div key={i} className={styles.site}>
                <p>{v.name}</p>
                <Button
                  color='red'
                  handleClick={this.leaveSite}>
                  ترک کردن
                </Button>
              </div>
            ) : ''}
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
