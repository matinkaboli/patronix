import React, { Component } from 'react';

class Loading extends Component {
  state = {
    dots: '.'
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        dots: Array.from({
          length: (this.state.dots.length + 1) % 4
        }).map(() => '.').join('')
      });
    }, 300);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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
