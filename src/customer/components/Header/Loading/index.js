import React, { Component } from 'react';

class Loading extends Component {
  state = {
    dots: '.'
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        dots: Array.from({
          length: (this.state.dots.length + 1) % 4
        }).map(() => '.').join('')
      });
    }, 300);
  }

  render() {
    return (
      <p>
        در حال بارگذاری {this.state.dots}
      </p>
    );
  }
}

export default Loading;
