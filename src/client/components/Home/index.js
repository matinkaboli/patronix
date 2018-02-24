import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import styles from './index.less';

class Home extends Component {
  render() {
    let links;

    if (this.props.logged) {
      links =
      <React.Fragment>
        <li><Link to='/panel'>داشبورد</Link></li>
        <li><Link to='/about'>درباره ما</Link></li>
      </React.Fragment>;
    } else {
      links =
      <React.Fragment>
          <li><Link to='/login'>ورود</Link></li>
          <li><Link to='/signup'>ثبت نام</Link></li>
          <li><Link to='/about'>درباره ما</Link></li>
        </React.Fragment>;
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
          <div className={`${styles.bg} ${styles.bg1}`}>
            <h1>ارائه دهنده پشتیبانی آنلاین</h1>
          </div>
          <div className={styles.about1}>
            <div className={styles.column}>
              <div className="icon-bolt icon">
                &nbsp;
              </div>
              <h1>Speeds up development</h1>
              <p className={styles.detailColumn}>We did most of the heavy
                lifting for you to provide a default
                 stylings that incorporate our custom
                 components. Additionally, we refined animations and
                 transitions to provide a smoother experience for developers.
               </p>
            </div>
            <div className={styles.column}>
              <div className="icon-users icon">
                &nbsp;
              </div>
              <h1>Speeds up development</h1>
              <p className={styles.detailColumn}>
                We have provided detailed documentation
                as well as specific code examples to help new use
                rs get started. We are also always open to
                 feedback and can answer any
                questions a user may have about Materialize.
               </p>
            </div>
            <div className={styles.column}>
              <div className="icon-cog icon">
                &nbsp;
              </div>
              <h1>Speeds up development</h1>
              <p className={styles.detailColumn}>
                By utilizing elements and principles
                of Material Design, we were able to create
                 a framework that incorporates components
                  and animations that provide more feedback
                   to users. Additionally, a single underlying
                    responsive system across all platforms
                    allow for a more unified user experience.
               </p>
            </div>
          </div>
          <div className={`${styles.bg} ${styles.bg2}`}>
            <h1>
              A modern responsive front-end framework based on Material Design
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
