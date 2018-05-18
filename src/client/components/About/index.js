import React, { Component } from 'react';

import Box from 'Root/components/Box';

import styles from './index.less';


export default class extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Box>
          <h1>پیترونیکس، اولین سامانه ایرانی ارائه دهنده پشتیبانی آنلاین</h1>
          <h3>ایمنی</h3>
          <p>در Patronix به ایمنی توجه بسیاری شده و توسعه دهندگان همواره سعی در
          ایمن تر کردنش میکننند. تمام اطلاعات مهم شما رمز گذاری میشود!
          </p>
          <h3>سرعت</h3>
          <p>در Patronix از تکنولوژی های روز دنیا استفاده شده است که سرعت
          بسیار زیادی دارند و همچنین تمامی ارتباطات از نوع real-time میباشد</p>
          <p>بهترین تجربه رابط کاربری را با مرورگر های بروز مانند
          Chrome یا Firefox داشته باشید</p>

          <h1>توسعه دهندگان</h1>
          <h3>علی موحدی</h3>
          <p>برنامه نویس سمت سرور و کلاینت</p>
          <h3>محمد متین کابلی</h3>
          <p>برنامه نویس و طراح سمت کلاینت</p>

          <h1>تکنولوژی های مورد استفاده در Patronix</h1>

          <p>زبان برنامه نویسی سمت سرور:
          <a href='https://nodejs.org'>Node.js</a></p>

          <p>فریم ورک سمت کلاینت:
          <a href='https://reactjs.org'>React.js</a></p>

          <p>راه ارتباطی بین سرور و کلاینت:
          <a href='http://socket.io'>Socket.io</a></p>

          <p>مدیریت ورژن:
          <a href='https://git-scm.com'>Git</a></p>

          <p>پایگاه داده:
          <a href='http://mongodb.com/'>MongoDB</a></p>

          <p>ماژول باندلر:
          <a href='https://webpack.js.org/'>Webpack</a></p>

          <p>نگهدار state:
          <a href='https://redux.js.org/'>Redux</a></p>
      </Box>
      </div>
    );
  }
}
