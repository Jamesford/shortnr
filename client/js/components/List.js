var React = require('react');

var Item = React.createClass({
  render: function() {
    return (
      <li className={this.props.item}>{this.props.item}</li>
    );
  }
});

var List = React.createClass({
  render: function() {
    return (
      <ul>
        {
          this.props.items.map(function(item) {
            return <Item key={item} item={item} />
          })
        }
      </ul>
    );
  }
});

module.exports = List;