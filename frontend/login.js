import React from 'react';
import {Link,browserHistory} from 'react-router';
import { withRouter } from 'react-router'
import './style/login.css';
import {connect} from 'react-redux'; //conect library
import * as userActions from './reducers/userActions.js' //import all actions & 


var Login = React.createClass({

	getInitialState(){
		return {
			userInfo: null,
	  	email: '',
	  	password: ''
		}
	},

	handleChange(inputField,e){
		this.setState({[inputField]:e.target.value})
	},
	
	submitLogin(e){
		e.preventDefault();
		$.ajax({
		  url:'/api/login',
		  type: 'POST',
		  data: {
		  	email: this.state.email,
		  	password: this.state.password
		  }

		})
		.then((data)=>{
			this.setState({userInfo:data})
			this.props.login(data)
		})

		//passing email as props and redirect to home
		browserHistory.push('/')
		
		
	},
  
    render() {
    	console.log('login:', this.props)
	    return (
	      <div className="container">
	      	<center>
						<div style={{backgroundColor:'#e8e8e8',paddingTop:'20px'}}>
							<h2>Log in</h2>
							<div className="card">

								<img id="log" src="https://firebasestorage.googleapis.com/v0/b/interestesapp.appspot.com/o/jtnAkFHYrieKZ93N7Kf8OJdEx4Y2%2Flogin.png?alt=media&token=15aa9d1c-93b0-4001-91e1-2a21fd0298a2" /><br/><br/>

								<form onSubmit={this.submitLogin}>

									<input onChange={this.handleChange.bind(this, 'email')} type="email" name="email" placeholder="Email"  required="required"  autoFocus/>

									<input onChange={this.handleChange.bind(this,'password')} type="password"  name="password"placeholder="password" required/>

									<div id="remember" className="checkbox">
										<label><input type="checkbox"/> Remember me</label>
									</div>

									<button type="submit" className="btn btn-success">Login</button>
								</form>

							    <a href="#"> Forgot the password? </a>
							</div>
						</div>

						{
							(this.state.userInfo) ? (<p style={{color:'brown', fontSize: '20px'}}> 
		          Full name: {this.state.userInfo.firstName}  {this.state.userInfo.lastName}<br/> 
		          UserName: {this.state.userInfo.userName}<br/>
		          Email: {this.state.userInfo.email}<br/> 
		          College: {this.state.userInfo.college}<br/>  
		          Cuny Id: {this.state.userInfo.cunyId}<br/>   </p>):(<p></p>)
						}
					</center>
	      </div>
	      
	    )
  	}
})

//take obj from store turns into props, access & sets state 
// const mapStoreToProps = store => (
//   {user: store.userReducer}
// )
export default connect(null, userActions)(Login); //connects: mapStateToProps is global state in the props



