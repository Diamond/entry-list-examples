import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: ["a", "b", "c"],
      searchFor: "",
      wip: ""
    };
    this.removeEntry      = this.removeEntry.bind(this);
    this.addEntry         = this.addEntry.bind(this);
    this.updateWIP        = this.updateWIP.bind(this);
    this.updateSearchTerm = this.updateSearchTerm.bind(this);
    this.searchEntries    = this.searchEntries.bind(this);
  }
  removeEntry(entry) {
    var newEntries = this.state.entries.filter(e => {
      return e !== entry;
    });
    this.setState({ entries: newEntries });
  }
  addEntry(entry) {
    this.state.entries.push(entry);
    this.setState({ entries: this.state.entries, wip: "" });
  }
  updateWIP(entry) {
    this.setState({ wip: entry });
  }
  updateSearchTerm(entry) {
    this.setState({ searchFor: entry });
  }
  searchEntries() {
    var searchFor = this.state.searchFor;
    return this.state.entries.filter(entry => {
      return (entry.indexOf(searchFor) > -1);
    });
  }
  render() {
    return (
      <div>
        <h2>Entries</h2><br/>
        <SearchForm updateSearchTerm={this.updateSearchTerm}/>
        <EntryForm addEntry={this.addEntry} updateWIP={this.updateWIP}/>
        <br/>
        <EntryList entries={this.searchEntries()} removeEntry={this.removeEntry}/>
        <br/>
        <h3>New Entry: {this.state.wip}</h3>
      </div>
    );
  }
};

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
  }
  search() {
    this.props.updateSearchTerm(this.refs.search.value);
  }
  render() {
    return (
      <input type="text" placeholder="Search" ref="search" onInput={this.search}/>
    );
  }
};

class EntryList extends React.Component {
  constructor(props) {
    super(props);
    this.renderEntry = this.renderEntry.bind(this);
  }
  renderEntry(entry) {
    return (<EntryItem entry={entry} key={entry} removeEntry={this.props.removeEntry}/>);
  }
  render() {
    return (
      <ul>
        {this.props.entries.map(this.renderEntry)}
      </ul>
    );
  }
};

class EntryItem extends React.Component {
  constructor(props) {
    super(props);
    this.remove = this.remove.bind(this);
  }
  remove() {
    this.props.removeEntry(this.props.entry);
  }
  render() {
    return (
      <li key={this.props.entry}>
        {this.props.entry}
        <button onClick={this.remove}>Remove</button>
      </li>
    );
  }
};

class EntryForm extends React.Component {
  constructor(props) {
    super(props);
    this.updateEntry   = this.updateEntry.bind(this);
    this.addEntry      = this.addEntry.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  addEntry() {
    this.props.addEntry(this.refs.entry.value);
    this.refs.entry.value = "";
  }
  updateEntry() {
    this.props.updateWIP(this.refs.entry.value);
  }
  handleKeyDown(event) {
    if (event.keyCode === 13) {
      this.addEntry();
    }
  }
  render() {
    return (
      <div>
        <input type="text" ref="entry" onInput={this.updateEntry} onKeyDown={this.handleKeyDown}/>
        <button onClick={this.addEntry}>Add</button>
      </div>
    );
  }
};

ReactDOM.render(
  <App/>,
  document.getElementById('container')
);
