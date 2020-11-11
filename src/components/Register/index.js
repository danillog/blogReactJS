import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from '../../firebase';
import './register.css';

class Register extends Component{
  constructor(props){
    super(props);
    this.state ={
        email: '',
        password: '',
        name:''
    };
    this.register = this.register.bind(this);
    this.onRegister = this.onRegister.bind(this);
  }         

  register(e){
    e.preventDefault();
    this.onRegister();
  }

  onRegister = async() =>  {
    try{
      const { name, email, password} = this.state;

      await firebase.register(name, email, password);
      this.props.history.replace('/dashboard')

    }catch(error){
      alert(error.message);
    }
  }

  render(){
    return(
      <div className="register"> 
        <h1 className="register-h1"> Novo Usuário</h1>
        <form onSubmit={ this.register } id="register" >
          <label> Nome: </label>
          <input type='text' value={this.state.name} autoFocus autoComplete="off"
          onChange={(e) => this.setState({name: e.target.value})} placeholder="João Gomes" />
           <label> Email: </label>
          <input type='text' value={this.state.email} 
          onChange={(e) => this.setState({email: e.target.value})} placeholder="email@email.com " />
           <label> Senha: </label>
          <input type='password' value={this.state.password} 
          onChange={(e) => this.setState({password: e.target.value})} />
          <button type="submit"> Cadastrar  </button>
        </form>
      </div>
    )};

}

export default withRouter(Register);