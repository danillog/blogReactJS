import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../firebase';
import './new.css';

class New extends Component{
  constructor(props){
    super(props);
    this.state = {
      titulo:'',
      imagem: null,
      url: '',
      descricao: '',
      alert: '',
      progress: 0
    }
    this.cadastrar = this.cadastrar.bind(this);
    this.handleFile = this.handleFile.bind(this);
  }

  componentDidMount(){
		if(!firebase.getCurrent()){
			return this.props.history.replace('/login')
    }
  }


  cadastrar = async(e) =>{
    e.preventDefault();
    if(this.state.titulo !== '' &&
      this.state.imagem !== '' &&
      this.state.descricao !== '' &&
      this.state.image !== null &&
      this.state.url !== ''
      ){
      let posts = firebase.app.ref('posts');
      let chave = posts.push().key;
      await posts.child(chave).set({
        title: this.state.titulo,
        image: this.state.url,
        description: this.state.descricao,
        author: localStorage.nome
      });
      this.props.history.push('/dashboard')
      }else{
        this.setState({alert: 'Preencha todos os campos!'});
      }
  }
  handleFile = async (e) => {
    if(e.target.files[0]){
      const image = e.target.files[0]
      if(image.type === 'image/png' || image.type ==='image/jpeg'){
        await  this.setState({ image: image });
        this.handleUpload();
      }else{
        this.setState({
          alert: 'Por favor !! envie uma imagem do tipo PNG ou JPG',
          image: null
        });
        return null;
      }
    }
  }

  handleUpload = async () =>{
    const { image } = this.state;
    const currentUid = firebase.getCurrentUid();
    const uploadTaks = firebase.storage.ref(`images/${currentUid}/${image.name}`)
    .put(image);


    await uploadTaks.on('state_change', 
    (snapshot) => {
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      this.setState({progress});
    },
    (error =>{
      error = 'Erro imagem: ' + error;
      this.setState({alert: error })
    }),
    ()=>{
      firebase.storage.ref(`images/${currentUid}`)
      .child(image.name).getDownloadURL()
      .then(url =>{
        this.setState({ url: url})
      })
    })

 }
  render(){
    return(
      <div id="bodyPost">
        <header id="new" >
          <Link to="/dashboard"> Voltar </Link>
        </header>
        <span> {this.state.alert} </span>
        <form onSubmit={this.cadastrar} id="post">
          <label>Url da imagem:</label>
          <input type="file" id="fileImage"
          onChange={ this.handleFile } />
          {this.state.url !== '' ? 
          <img src={this.state.url} width="250" height="150" alt="Capa do post "/> 
          : 
          <progress value={this.state.progress} max="100" />
        }
          <label>Titulo:</label>
          <input type="text"  placeholder="Nome do post" value={ this.state.titulo } autoFocus
          onChange={ (e)=> this.setState({titulo: e.target.value}) } />
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