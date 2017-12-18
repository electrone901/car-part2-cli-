
import React from 'react';
import $ from 'jquery';
import {Link} from 'react-router'

const SearchByTitle = React.createClass({
  getInitialState(){
    return {
      post:[],
      inputToSearch: '',
    }
  },

  submitNewPost: function (e) {
    e.preventDefault();
    this.refs.form.reset()
    var inputToSearch = this.state.inputToSearch;
    $.ajax({
  		url: "/api/post/search/" + inputToSearch,
  		method:'GET'
  	})
    .done((data)=>this.setState({post:data}))
  },

	handleChange: function(e) {
	this.setState({inputToSearch: e.currentTarget.value})
  },

 
  render(){
    let searchResult;
    if(this.state.inputToSearch) {
      if(this.state.post[0]) {
        searchResult = <div>Results for <strong>{this.state.inputToSearch}</strong></div>
      } else {
        searchResult = <div>Sorry not results for <strong>{this.state.inputToSearch}</strong></div>
      }

    } 
    return(
      <div className='container' style={{minHeight: '450px'}}>
        <center>
          <form onSubmit={this.submitNewPost} ref="form">
            <input className='input-search-searchComponent' type="text" placeholder="Quick Search" onChange={this.handleChange} required="required"  autoFocus></input><br/>

            <button type="submit" className="btn btn-success">Search</button>
          </form>
        </center>
        {searchResult}
        <div className='middle'>
          {this.state.post.map((ele,i)=>{
            return <div key={i} className='gallery'>
            	<Link to={'/posts/' +ele.id}><img src={ele.image} className='itemGallery'/></Link>
            	<Link to={'/posts/' + ele.id}><h4 className='img-title'>{ele.title}</h4> </Link>
            </div>
          })}
        </div>

        <div className="searchEmpty-container"></div>
      </div>
    )
  }

})

export default SearchByTitle;







