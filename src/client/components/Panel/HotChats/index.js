import React, { Component } from 'react';
import { connect } from 'react-redux';

import ChatNav, { Section } from '../ChatNav';
import ChatRoom from '../ChatRoom';

import styles from './index.less';

class HotChats extends Component {
  render() {
    return (
      <ChatNav
        rootPath='/panel/hotchats'>
        {this.props.hotChats.map((v, i) =>
          <Section
            key={i}
            path={`/${v.id}`}
            component={ChatRoom}
            componentProps={
              {
                chat: v
              }
            }>
            <div className={styles.side}>
              <img src={v.site.avatar} />
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
