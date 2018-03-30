import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import styles from './index.less';


class Home extends Component {
  render() {
    let links;

    if (this.props.logged) {
      links =
      <Fragment>
        <li><Link to='/panel'>داشبورد</Link></li>
        <li><Link to='/about'>درباره ما</Link></li>
      </Fragment>;
    } else {
      links =
      <Fragment>
          <li><Link to='/login'>ورود</Link></li>
          <li><Link to='/signup'>ثبت نام</Link></li>
          <li><Link to='/about'>درباره ما</Link></li>
      </Fragment>;
    }

    return (
      <div>
        <div className={styles.header}>
          <h1><Link to='/' className={styles.titleName}>Patronix</Link></h1>
          <div className={styles.normalLinks}>
            <ul>
              { links }
            </ul>
          </div>
          <p className={styles.responsiveLinks}>لینک ها</p>
        </div>
        <aside className={styles.aside}>
          <div className={`${styles.bg} ${styles.bg1} ${styles.headTitle}`}>
            <h1>ارائه دهنده پشتیبانی آنلاین</h1>
            <p>
              با این سرویس شما بدون نیاز به تغییری در سایت و افزودن
              بار اضافی به سایتتان، به آسانی می توانید پیشتیبانی آنلاین را به
            	سایتتان بیفزایید و آن را به راحتی مدیریت کنید.
            </p>
          </div>
          <div className={styles.about1}>
            <div className={styles.column}>
              <h1>سرعت خوب</h1>
              <p className={styles.detailColumn}>
                ما با استفاده از تکنولوژی های روز
                سعی داریم که بیشترین سرعت رو
                به شما ارایه بدیم.
               </p>
            </div>
            <div className={styles.column}>
              <h1>
                رایگان
              </h1>
              <p className={styles.detailColumn}>
                امکانات زیادی سعی شده است که در اختیار شما قرار بگیرد
                و بیشتر آن ها رایگان است و نیازی نیست هزینه ای پرداخت کنید.
               </p>
            </div>
            <div className={styles.column}>
              <h1>
                راحت
              </h1>
              <p className={styles.detailColumn}>
                با محیط کاربری که در اختیار شما گذاشته ایم
                شما به راحتی و آسانی می توانید با سایت
                ارتباط برقرار کنید و از آن استفاده کنید.
               </p>
            </div>
          </div>
          <div className={`${styles.bg} ${styles.bg2}`}>
            <h1>
              سعی می کنیم بهترین امکانات را در اختیار شما قرار بدهیم.
            </h1>
          </div>
          <div className={styles.about2}>
            <h1>Contact Us</h1>
            <p>Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
            nullam scelerisque id nunc nec volutpat.
            Etiam pellentesque tristique arcu,
            non consequat magna fermentum ac.
            Cras ut ultricies eros.
            Maecenas eros justo, ullamcorper a sapien id,
            viverra ultrices eros. Morbi sem neque,
            posuere et pretium eget, bibendum sollicitudin lacus.
            Aliquam eleifend sollicitudin diam,
            eu mattis nisl maximus sed.
            Nulla imperdiet semper molestie.
            Morbi massa odio, condimentum sed ipsum ac,
            gravida ultrices erat. Nullam eget dignissim mauris,
            non tristique erat.
            Vestibulum ante ipsum primis in faucibus
            orci luctus et ultrices posuere cubilia Curae;
            </p>
          </div>
          <div className={`${styles.bg} ${styles.bg3}`}>
            <h1>
              A modern responsive front-end
              framework based on Material Design
            </h1>
          </div>
        </aside>
      </div>
    );
  }
}

export default connect(
  state => ({ logged: state.user.logged })
)(Home);
