var React = require("react");
var ReactDOM = require("react-dom");

var App = React.createClass({
  getInitialState: function() {
    return {
      entries: ["a", "b", "c"],
      wip: ""
    };
  },
  removeEntry: function(entry) {
    var newEntries = this.state.entries.filter(function (e) {
      return e !== entry;
    });
    this.setState({ entries: newEntries });
  },
  addEntry: function(entry) {
    this.state.entries.push(entry);
    this.setState({ entries: this.state.entries, wip: "" });
  },
  updateWIP: function(entry) {
    this.setState({ wip: entry });
  },
  render: function() {
    return (
      <div>
        <h2>Entries</h2><br/>
        <EntryForm addEntry={this.addEntry} updateWIP={this.updateWIP}/>
        <br/>
        <EntryList entries={this.state.entries} removeEntry={this.removeEntry}/>
        <br/>
        <h3>New Entry: {this.state.wip}</h3>
      </div>
    );
  }
});

var EntryList = React.createClass({
  renderEntry: function(entry) {
    return (<EntryItem entry={entry} key={entry} removeEntry={this.props.removeEntry}/>);
  },
  render: function() {
    return (
      <ul>
        {this.props.entries.map(this.renderEntry)}
      </ul>
    );
  }
});

var EntryItem = React.createClass({
  remove: function() {
    this.props.removeEntry(this.props.entry);
  },
  render: function() {
    return (
      <li key={this.props.entry}>
        {this.props.entry}
        <button onClick={this.remove}>Remove</button>
      </li>
    );
  }
});

var EntryForm = React.createClass({
  addEntry: function() {
    this.props.addEntry(this.refs.entry.value);
    this.refs.entry.value = "";
  },
  updateEntry: function() {
    this.props.updateWIP(this.refs.entry.value);
  },
  render: function() {
    return (
      <div>
        <input type="text" ref="entry" onInput={this.updateEntry}/>
        <button onClick={this.addEntry}>Add</button>
      </div>
    );
  }
});

ReactDOM.render(
  <App/>,
  document.getElementById('container')
);
