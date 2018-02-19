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
  }

  render() {
    const { displayValidateError } = this.state;

    return (
      <form
        method='post'
        className={`${styles.form} ${this.props.formStyle}
        ${displayValidateError ? 'displayValidateError' : ''}`}
        onSubmit={e => {
          this.props.submitFunction(e, this.refs);
          this.checkInputsValidate(e);
        }}
        noValidate>

        {this.props.inputs.map((v, i) =>
          <input
            type={v.type}
            value={v.value}
            key={i}
            name={v.name}
            placeholder={v.placeholder}
            required={v.required} />
        )}

      <button type='submit'>{ this.props.submitValue }</button>

      </form>
    );
  }
}

export default Form;
