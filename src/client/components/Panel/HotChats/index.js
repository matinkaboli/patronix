import React, { Component } from 'react';
import { connect } from 'react-redux';

import ChatNav, { Section } from '../ChatNav';

import styles from './index.less';

class HotChats extends Component {
  render() {
    return (
      <ChatNav
        rootPath='/panel/hotchats'>
        {this.props.hotChats.map((v, i) =>
          <Section
            key={i}
            path={v.id}
            component={() => <p>ab</p>}>
            <div className={styles.side}>
              <img src='/static/uploads/5af67c7040c1971844ffc054.jpeg' />
              <div>
                <p>
                  نام سایت :‌ {v.site.name}
                </p>
                <p>
                  مالک : {v.site.owner.name}
                </p>
              </div>
              <span className={styles.time}>{
                (() => {
                  let time = new Date(v.chats.slice(-1)[0].time);

                  return `${time.getHours()}:${time.getMinutes()}`;
                })()
              }</span>
            </div>
          </Section>
        )}
      </ChatNav>
    );
  }
}

export default connect(
  state => ({
    hotChats: state.hotChats
  })
)(HotChats);
