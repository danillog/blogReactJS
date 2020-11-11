import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../firebase';
import './dashboard.css';


class Dashboard extends Component{
	constructor(props){
		super(props);
		this.state ={
			nome: localStorage.nome,
		};
	}

	async componentDidMount(){
		if(!firebase.getCurrent()){
			return this.props.history.replace('/login')
		}

		firebase.getUserName ((info) => {
			localStorage.nome = info.val().nome
			this.setState({nome: localStorage.nome });
		})
	}
	render(){
		return(
			<div id="dashboard">
				<div className="user-info">
					<h1> { this.state.nome } </h1>
					<Link to='dashboard/new' > Novo Post </Link>
				</div>
				<p> Logado com: {firebase.getCurrent()} </p>
			</div>
		)
	}
}

export default withRouter(Dashboard);