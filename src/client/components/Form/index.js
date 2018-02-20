import React, { Component } from 'react';
import PropTypes from 'prop-types';

import bind from 'Root/bind';
import styles from './index.less';

class Form extends Component {
  static propTypes = {
    formStyle: PropTypes.string,
    inputs: PropTypes.arrayOf(PropTypes.shape({
      tag: PropTypes.string.isRequired,
      attrs: PropTypes.object.isRequired
    })).isRequired
  }

  state = {
    displayValidateError: false
  };

  @bind
  checkInputsValidate(e) {
    e.preventDefault();

    if (!e.target.checkValidity()) {
      this.setState({ displayValidateError: true });
      return;
    }
    this.setState({ displayValidateError: false });

    this.props.submitFunction(e);
  }

  render() {
    const { displayValidateError } = this.state;

    return (
      <form
        className={`${styles.form} ${this.props.formStyle}
        ${displayValidateError ? 'displayValidateError' : ''}`}
        onSubmit={this.checkInputsValidate}
        noValidate>

        <fieldset>
          {this.props.inputs.map((v, i) =>
            <div key={i}>
              {(() => {
                if (v.tag === 'button') {
                  return (
                    <v.tag {...v.attrs} className={styles.button}>
                      { v.html }
                    </v.tag>
                  );
                } else {
                  return <v.tag {...v.attrs} />;
                }
              })()}
            </div>
          )}
        </fieldset>
      </form>
    );
  }
}

export default Form;
