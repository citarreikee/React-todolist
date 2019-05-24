import React from 'react';
import logo from './logo.svg';
import './App.css';


class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDone = this.handleDone.bind(this)
  }
  render() {
    return (
      <div>
        <h3>&emsp;&emsp;&emsp;Todo List</h3>
        <ol>
        {this.state.items.map(item => (
          <li key={item.id} >
            <input  type="checkbox" onChange={() => this.handleDone(item.id)} checked={item.done}/>
            <div style={item.style}>&emsp;{item.text}&emsp;</div>
            <button  onClick={() => this.handleDelete(item.id)}>delete</button>
          </li>
        ))}
        </ol>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            value={this.state.text}
          />
          <button>
            Save new task
          </button>
        </form>
      </div>
    );
  }
  handleDelete(id) {
    this.setState(prevState => ({
      items: prevState.items.filter(item => item.id != id)
    }))
  }
  handleChange(e) {
    this.setState({ text: e.target.value });
  }
  handleDone(id) {
    let prevState = this.state
    for(let item of prevState.items) {
      if(item.id == id){
        item.done = !item.done
        item.style = item.done? {display:'inline', textDecoration:'line-through',color:'gray'}:{display:'inline', textDecoration:'none',color:'black'}
      }
    }
    this.setState({
      items: prevState.items
    })
  }
  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now(),
      done: false,
      style: {display:'inline', textDecoration:'none',color:'black'}
    };
    this.setState(prevState => ({
      items: prevState.items.concat(newItem),
      text: ''
    }));
  }
}
//ReactDOM.render(<TodoList />, mountNode);

export default TodoList;
