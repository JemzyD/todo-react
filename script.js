// class List extends React.Component {
//   constructor(){
//     super()
//     this.changeHandler = this.changeHandler.bind( this );
//   }

//   state = {
//     list : [],
//     word : ""
//   }

//   changeHandler(event){
//     this.setState({word:event.target.value});
//     console.log("change", event.target.value);
//   }

//   render() {
//       // render the list with a map() here

//       console.log("rendering");
//       return (
//         <div className="list">
//           <input onChange={this.changeHandler} value={this.state.word}/>
//           <button>add item</button>
//         </div>
//       );
//   }
// }

// ReactDOM.render(
//     <List/>,
//     document.getElementById('root')
// );

class TodoItem extends React.Component {
  constructor(props){
    super();
    this.handleDelete = this.handleDelete.bind(this);
  }
  
  handleCheck(e){
    console.log('are you working???');
  }
  
  handleDelete(e){
    this.props.onDelete(this.props.value);
  }
  
  render(){
    return <div class="todo-item">
      <input type="checkbox" onClick={this.handleCheck}/>
      {this.props.value}
      <button onClick={this.handleDelete}> Delete</button>
    </div>;
  }
}

class TodoList extends React.Component {
  constructor(props){
    super();
    this.handleDelete = this.handleDelete.bind(this);
  }
  
  handleDelete(item){
    this.props.onDelete(item);
  }
  
  render(){
    const items = this.props.items;
    const elements = items.map((item) => <TodoItem key={id} value={item} onDelete={this.handleDelete} />);
    return <div>{elements}</div>;
  }
}

class TodoApp extends React.Component {
  constructor(){
    super();
    this.handleNew = this.handleNew.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDeleteAll = this.handleDeleteAll.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    
    this.state = {
      items: JSON.parse(localStorage.getItem('items') || "[]"),
      text: "",
    };
  }
  
  handleDelete(item){
    console.log('delete top', item);
    let updatedItems = this.state.items.filter(i => i !== item);
    console.log(updatedItems);
    localStorage.setItem('items', JSON.stringify(updatedItems));
    this.setState({items: updatedItems});
  }
    
  handleSubmit(e){
    e.preventDefault();
    let updatedItems = this.state.items;
    let text = this.state.text;
    updatedItems.push(text);
    let updatedText = '';
    localStorage.setItem('items', JSON.stringify(updatedItems));
    this.setState({items: updatedItems, text: updatedText});
  }
  
  handleNew(e){
    this.setState({text: e.target.value});
  }
  
  handleDeleteAll(e){
    localStorage.clear();
    this.setState({items: []});
  }
  
  render(){
    return  <div class="root">
      <h1>TODO List</h1>
      <form onSubmit={this.handleSubmit}>
        <TodoList items={this.state.items} onDelete={this.handleDelete} />
        <br /><input type="text" value={this.state.text} onChange={this.handleNew} placeholder="Add an item"/>
        <button>add that!</button>
      </form>
      <br />
       <button onClick={this.handleDeleteAll}>Delete Everything</button>
      </div>;
  }  
}

ReactDOM.render(<TodoApp />, document.getElementById('root'));
if(!localStorage){ alert("It aint storing anything!")}
