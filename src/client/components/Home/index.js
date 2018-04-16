import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


import am from 'Root/images/am.jpeg';
import mk from 'Root/images/mk.jpg';
import styles from './index.less';


class Home extends Component {
  render() {
    let links;

    if (this.props.logged) {
      links =
      <Fragment>
        <li><Link to='/panel'>داشبورد</Link></li>
      </Fragment>;
    } else {
      links =
      <Fragment>
          <li><Link to='/login'>ورود</Link></li>
          <li><Link to='/signup'>ثبت نام</Link></li>
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
              سعی می کنیم بهترین امکانات را در اختیار شما قرار بدهیم
            </h1>
          </div>

          <h1 className={styles.centered}>توسعه دهندگان</h1>

          <div className={styles.authors}>
            <div className={styles.author}>
              <img src={am} className={styles.authorImage} />
              <Link to='https://github.com/amovah'>علی موحدی</Link>
            </div>

            <div className={styles.author}>
              <img src={mk} className={styles.authorImage} />
              <Link to='https://github.com/matinkaboli'>متین کابلی</Link>
            </div>
          </div>
        </aside>
      </div>
    );
  }
}

export default connect(
  state => ({ logged: state.user.logged })
)(Home);
