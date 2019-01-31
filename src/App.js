import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state =  {
      text : "",
      list:[],
      btnVal: 'Add',
      newText: '',
    }
    this.add = this.add.bind(this);
    this.setText = this.setText.bind(this);
    this.search = this.search.bind(this);
  }
  
  setText(e){
    this.setState({
      myText : e.target.value,
    })
  }
  add(){
    const {myText, list, newText, btnVal} = this.state;
    const newList = list;
    if(btnVal === 'Add'){
      newList.push(myText);
    }
    else{
      newList.splice(newText,1,myText);
      this.setState({
        btnVal:'Add',
        newText:'',
      })
    }
      
    this.setState({
      myText:"",
      list:newList,
    })
  }
  
  delete(index){
    const {list} = this.state;
    const newList = list;
    
    newList.splice(index,1);
    this.setState({
      list:newList,
      myText:"",
    })
  }
  
  
  edit(index, elem){
    this.setState({
      myText : elem,
      btnVal : 'Update',
      newText:index,
    })
  }

  search(e){
    const val = e.target.value;
    const {list} = this.state;
    const searchList = list.filter((item)=>item.toLowerCase().substring(0,val.length) === val.toLowerCase());
    //console.log(searchList);
    this.setState({
      searchList, isSearching : !!val
    })
    
  }
  render() {
    const {myText,list,btnVal,isSearching,searchList} = this.state;
    const actualList = isSearching ? searchList : list;
    return (
      <div className="App">
        <div className="App-header">
        <h4>ToDo List {isSearching && <span>Searching...</span>}</h4>
        <input className="searchInput" placeholder="Search from list..." onChange={this.search}/>
        <input onChange={this.setText} placeholder="Add item.." value={myText}/>
        {myText && <button className="addUpdateBtn" onClick={this.add}>{btnVal}</button>}
        {actualList.length === 0 && <p>No Records!</p>}
        <ul>{
        actualList.map((item, index)=>{
          return <li key={Math.random() * index}>{item} <button className="editBtn" onClick={this.edit.bind(this, index, item)}>Edit</button> | <button className="deleteBtn" onClick={this.delete.bind(this, index)}>Delete</button></li>
        })}
        </ul>
        </div>
      </div>
    );
  }
}

export default App;