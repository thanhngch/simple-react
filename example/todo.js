class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: 'thu phat' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  clickRemove(id) {
    let i = 0;
    let newStateItems = this.state.items.slice();
    for (; i < this.state.items.length; i++) {
      if (id == this.state.items[i].id) {
        newStateItems.splice(i, 1); // remove 
        break;
      }
    }
    this.setState(prevState => ({
      items: newStateItems,
      text: prevState.text
    }));
  }
  render() {
    return (
      <div>
        <h3>TODO</h3>
        <TodoList items={this.state.items} clickRemove={(id) => this.clickRemove(id)}/>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input
            onInput={this.handleChange.bind(this)}
            autofocus="autofocus"
            value={this.state.text}
            id="input"
          />
          <button>
            Add #{this.state.items.length + 1}
          </button>
        </form>
      </div>
    );
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now()
    };
    this.setState(prevState => ({
      items: prevState.items.concat(newItem),
      text: ''
    }));
  }
}

class TodoList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.items.map(item => (
          <li key={item.id}>
            {item.text} &nbsp;
            <a href="#" onClick={() => this.props.clickRemove(item.id)}>Remove</a>
          </li>
        ))}
      </ul>
    );
  }
}

ReactDOM.render(<div className="todoApp">
  <TodoApp />
</div>
, document.getElementById('root'));