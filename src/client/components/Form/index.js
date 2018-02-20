import React, { Component } from 'react';

import bind from 'Root/bind';
import styles from './index.less';

class Form extends Component {
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
        method={this.props.method}
        className={`${styles.form} ${this.props.formStyle}
        ${displayValidateError ? 'displayValidateError' : ''}`}
        onSubmit={this.checkInputsValidate}
        noValidate>

        <fieldset>
          {this.props.inputs.map((v, i) =>
            <div key={i}>
              <v.tag {...v.attrs} />
            </div>
          )}
        </fieldset>

      <button
        type='submit'
        className={styles.button}>
        { this.props.submitValue }
      </button>

      </form>
    );
  }
}

export default Form;
