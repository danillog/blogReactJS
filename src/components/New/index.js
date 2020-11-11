import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './new.css';
class New extends Component{
  constructor(props){
    super(props);
    this.state = {
      titulo:'',
      imagem: '',
      descricao: ''
    }
    this.cadastrar = this.cadastrar.bind(this);
  }
  cadastrar(){

  }
  render(){
    return(
      <div id="bodyPost">
        <header id="new" >
          <Link to="/dashboard"> Voltar </Link>
        </header>
        <form onSubmit={this.cadastrar} id="post">
          <label>Titulo:</label>
          <input type="text"  placeholder="Nome do post" value={ this.state.titulo } autoFocus
          onChange={ (e)=> this.setState({titulo: e.target.value}) } />
          <label>Url da imagem::</label>
          <input type="text"  placeholder="Url da capa" value={ this.state.imagem }
          onChange={ (e)=> this.setState({imagem: e.target.value}) } />
          <label>Descrição:</label>
          <textarea type="text"  placeholder="Descrição do post" value={ this.state.descricao }
          onChange={ (e)=> this.setState({descricao: e.target.value}) } />
          <button type="submit" > Cadastrar </button>
        </form>
      </div>
    );
  }
}

export default withRouter(New);