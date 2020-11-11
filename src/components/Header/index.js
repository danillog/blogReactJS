import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';
import './header.css';

class  Header extends Component{
	constructor(props){
			super(props);
			this.state={
					linkStatus: this.updadteStatus(),
			}
			
			this.updadteStatus = this.updadteStatus.bind(this);
	}
	
	logout(){
			firebase.logout();
			localStorage.removeItem("nome");
			window.location.reload();
	}
	
	updadteStatus(){
			if(firebase.getCurrent()){
					return (<div >
						<Link to="/dashboard" id="dashboardLink" > Dashboard </Link>
						<Link to="/" onClick={ this.logout }> Sair </Link> 
					</div>)
			}else{
					return (<Link to="/login"> Entrar </Link>)
			}
	}

	render(){
	return(
			<header id="main-header">
					<div className="header-content" >
							<Link to="/">
								Micro Posts Programador
							</Link>
							{this.state.linkStatus}
					</div>
			</header>

	)}
}

export default Header;