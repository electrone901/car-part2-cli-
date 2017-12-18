// ManageAdSinglePost allows user tu edit/update a post
import React from 'react';
import {browserHistory} from 'react-router';
import $ from 'jquery';


// gets postId as props from manageAd.js. ManageAdSinglePost will use postId to fetch the post info 
const ManageAdSinglePost = React.createClass({
	getInitialState() {
	 return ({
	 	post: [],
	 	title: '',
	  image: '',	  
	  body: '',	  	  
	  tags: '',	
	  price: '',  
	  phone: '', 
	  year: '',
	  brand: '',
	  location: '',    
	  payments_accepted: '',
	  userId: '',
	  editing: false,
	  inputText: false,
	 })
	},

	// fetch the post info with the postId passed as props. Then sets state for every property and then it is render.
	componentDidMount: function () {
		$.ajax({
			url:'/api/post/' + this.props.params.postId,
			method:'GET'
		})
		.done((data)=>{
			console.log('data', data)
			this.setState({
				post:data,
				title: data.title,
				body: data.body,
				tags: data.tags,	
			  price: data.price,  
			  phone: data.phone, 
			  year: data.year,
			  brand: data.brand,
			  location: data.location,    
			  payments_accepted: data.payments_accepted, 
			})
		})
	},


	// submit updates to database once the user clicks save
	submitUpdate(e){
		e.preventDefault();

		let stateTemp = this.state;
		let propTemp = this.props;

		function auto(input, stateTemp, propTemp) {
			if(stateTemp[input] === ""){
				console.log("if ", stateTemp[input])

			} else {
				console.log("else", stateTemp[input])
				$.ajax({
				  url:'/api/post/' + propTemp.params.postId,
				  type: 'PUT',
				  data: {
				  	[input]:stateTemp[input]
				  }
				})
			}
		}

		// holds all properties
		let listFeatures = ["title","image","body","author","tags", "price", "phone", "year", "brand", "location", "payments_accepted"];

		// calling every properties in the listFeatures
		listFeatures.forEach((ele) => {
			auto([ele],stateTemp,propTemp);
		})






		
		//passing postId as props and redirect to post
		browserHistory.push(`/posts/${this.props.params.postId}`)
	},

	// captures user's updates and set them in the state 
	handleEditingChange(inputField, e){
		e.preventDefault();
		console.log(e.target.value)
	  this.setState({
	  	[inputField]: e.target.value,
	  	postId: this.state.post.id,
	  })
	},

	//makes the input text appear to update the post
	handleEditing (e) {
		this.setState({ 
			editing: true, 
			inputText: true,
		});
	},

	//makes the input text disappear 
	cancelEditing (e) {
		this.setState({ 
			editing: false, 
			inputText: false,
		});
	},

render() {
	console.log('one post ', this.state)
	console.log('this.state.post.author:', this.state.post.author)

	return(
		<div className="container" style={{font: 'bold 20px/1.3 PT Sans sans-serif', letterSpacing:'0.1em'}}>
			<h1>Edit Post</h1> 

			<form onSubmit={this.submitUpdate}>

				<div className="row">

				 	<div className="col-sm-6" >

				 		{/*  UPDATES TITLE    */}
				 		<h2 className="glyphicon glyphicon"><strong>Title: </strong> {this.state.title}</h2>
				 		{ 
		       		(this.state.inputText) ? 
		       		(
				        <input 
				        	onChange={this.handleEditingChange.bind(this, 'title')} type="text" name="title" value={this.state.title} required="required" className="form-control" autoFocus/>
		       		):
		       		(<p></p>) 
		       	}

				 		<div className="thumbnail clearfix" style={{border: '0px',width: '300px'}}>
							<img className="img-responsive" src={this.state.post.image}/>
						</div>
				 	</div>



				 	<div className="col-sm-6" >
				 		{ 
		       		(this.state.inputText) ? 
		       		(
				        <span>
							 		<img onClick={this.cancelEditing} title="Cancel" style={{border: '0px',width: '100px', marginTop: '-79px'}}  className="img-responsive pull-right" src='https://cdn4.iconfinder.com/data/icons/meBaze-Freebies/512/delete.png' />
						 		</span>
		       		):
		       		(<p></p>) 
		       	}

		       	<span>
					 		<img onClick={this.handleEditing} title="Edit this post" style={{border: '0px',width: '100px', marginTop: '-79px'}}  className="img-responsive pull-right" src='http://icons.iconarchive.com/icons/osullivanluke/orb-os-x/512/Text-Edit-icon.png' />
				 		</span>
				 	</div>


			  </div>
	      

	      {/*  UPDATES DESCRIPTION/BODY    */}

	      <h3 className="glyphicon glyphicon"><strong>Description: </strong> {this.state.body}</h3>


	      { 
       		(this.state.inputText) ? 
       		(
		        <textarea 
		        	onChange={this.handleEditingChange.bind(this, 'body')} type="text" name="body"value={this.state.body} style={{backgroundColor:'rgba(5, 244, 222, 0.36)'}} className="form-control" required/>
       		):
       		(<p></p>) 
       	}

	      
	      <h2>Product Information</h2>
	      {/*  UPDATES BRAND    */}
	      <h4>Brand: {this.state.brand}</h4>
	      { 
       		(this.state.inputText) ? 
       		(
		        <input 
		        	onChange={this.handleEditingChange.bind(this, 'brand')} type="text" placeholder="New Brand" value={this.state.brand} style={{backgroundColor:'rgba(5, 244, 222, 0.36)'}} className="form-control" required/>
       		):
       		(<p></p>) 
       	}


	      {/*  UPDATES YEAR    */}
	      <h4>Year: {this.state.year}</h4>
	      { 
       		(this.state.inputText) ? 
       		(
		        <input 
		        	onChange={this.handleEditingChange.bind(this, 'year')} type="text" placeholder="New Year" value={this.state.year} style={{backgroundColor:'rgba(5, 244, 222, 0.36)'}} className="form-control" required/>
       		):
       		(<p></p>) 
       	}


	      {/*  UPDATES PRICE    */}
	      <h4>Price: {this.state.price}</h4>
	      { 
       		(this.state.inputText) ? 
       		(
		        <input 
		        	onChange={this.handleEditingChange.bind(this, 'price')} type="text" placeholder="New Price" value={this.state.price} style={{backgroundColor:'rgba(5, 244, 222, 0.36)'}} className="form-control" required/>
       		):
       		(<p></p>) 
       	}


	      
	      {/*  UPDATES TAGS    */}
	      <h4>Condition: {this.state.tags}</h4>
	      { 
       		(this.state.inputText) ? 
       		(
		        <div className="form-group">  
	            <div className="input-group">
	            	<span className="input-group-addon"><i className="glyphicon glyphicon-list"></i></span>
	             	<select onChange={this.handleEditingChange.bind(this, 'tags')} type="text" name="tags" value={this.state.tags} className="form-control selectpicker" style={{backgroundColor:'rgba(5, 244, 222, 0.36)'}} required>
	             		<option value="">Please select</option>
	                <option value="New">New</option>
	                <option value="Semi-New">Semi-New</option>
	                <option value="Used">Used</option>
	                <option value="Broken">Broken</option>
	              </select>
	            </div>
	          </div>
       		):
       		(<p></p>) 
       	}


		  	{/*  UPDATES LOCATION    */}
		  	<h4>Location: {this.state.location}</h4>
		  	{ 
       		(this.state.inputText) ? 
       		(
		        <input 
		        	onChange={this.handleEditingChange.bind(this, 'location')} type="text" value={this.state.location} style={{backgroundColor:'rgba(5, 244, 222, 0.36)'}} className="form-control" required/>
       		):
       		(<p></p>) 
       	}


	      {/*  UPDATES ACCEPTED PAYMENTS    */}
	      <h4>Payments Accepted: {this.state.payments_accepted}</h4>
	      { 
       		(this.state.inputText) ? 
       		(
		        <input 
		        	onChange={this.handleEditingChange.bind(this, 'payments_accepted')} type="text" value={this.state.payments_accepted} style={{backgroundColor:'rgba(5, 244, 222, 0.36)'}} className="form-control" required/>
       		):
       		(<p></p>) 
       	}

       	

       	{/*  UPDATES PHONE    */}
       	<h4>Phone: {this.state.phone}</h4>
	      { 
       		(this.state.inputText) ? 
       		(
		        <input 
		        	onChange={this.handleEditingChange.bind(this, 'phone')} type="text" value={this.state.phone} style={{backgroundColor: 'rgba(5, 244, 222, 0.36)'}} className="form-control" required/>
       		):
       		(<p></p>) 
       	}<br/>


       	
       		{/*  BUTTON    */}
       		{ 
       		(this.state.inputText) ? 
       		(
		        <button onClick={this.submitUpdate} type="submit" className="btn btn-success" style={{width:'222px', fontSize:'20px'}}>Save All</button>
       		):
       		(<p></p>) 
       	}
       	
    </form>

    <h2>Ad Information</h2>
    <h4>Ad placed: {this.state.post.createdAt}</h4>
    <h4>Ad last edited: {this.state.post.updatedAt}</h4>
    <h4>Ad id: {this.state.post.id}</h4>
    

    <h2>Advertiser Information</h2>
    <h4>Advertiser: {this.state.post.author}</h4>
    <h4>Phone: {this.state.post.phone}</h4>
    <h4>UserId: {this.state.post.UserId}</h4>


	 </div>
 )
}

})
export default ManageAdSinglePost;

