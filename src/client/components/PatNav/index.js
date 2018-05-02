import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';

import styles from './index.less';


export default class extends Component {
  state = {
    current: '',
    els: [],
  }

  componentWillMount() {
    let children = Children.map(
      this.props.children,
      i => ({
        name: i.props.name,
        children: i.props.children
      })
    );

    this.setState({
      current: children[0].name,
      els: children
    });
  }

  click(name) {
    return () => {
      this.setState({
        current: name
      });
    };
  }

  render() {
    let content;
    let children = Children.toArray(this.props.children);
    for (let child of children) {
      if (child.props.name === this.state.current) {
        content = child.props.render;
        break;
      }
    }

    return (
      <div className={styles.container}>
        <div className={styles.side}>
          {this.state.els.map((v, i) =>
            <p
              className={
                v.name === this.state.current && 'active' || ''
              }
              key={i}
              onClick={this.click(v.name)}>
              {v.children}
            </p>
          )}
        </div>

        <div className={styles.content}>
          {content()}
        </div>
      </div>
    );
  }
}

export const Section = () => {};

Section.propTypes = {
  name: PropTypes.string.isRequired
};
