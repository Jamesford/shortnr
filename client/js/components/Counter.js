var React = require('react');

var Counter = React.createClass({
  incrementCount: function() {
    this.setState({
      count: this.state.count + 1
    });
  },
  decrementCount: function() {
    this.setState({
      count: this.state.count - 1
    });
  },
  incrementCount5: function() {
    this.setState({
      count: this.state.count + 5
    });
  },
  decrementCount5: function() {
    this.setState({
      count: this.state.count - 5
    });
  },
  getInitialState: function() {
    return {
      count: parseInt(this.props.count) || 0
    };
  },
  render: function() {
    return (
      <div>
        <h3>Count: <span>{this.state.count}</span></h3>
        <button type='button' onClick={this.incrementCount5}>+5</button>
        <button type='button' onClick={this.incrementCount}>+1</button>
        <button type='button' onClick={this.decrementCount}>-1</button>
        <button type='button' onClick={this.decrementCount5}>-5</button>
      </div>
    );
  }
});

module.exports = Counter;