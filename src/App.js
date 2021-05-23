import React, { Component } from 'react'
import './App.css'
import Keyboard from './Keyboard'
import CurrentWord from './CurrentWord'
import Life from './Life'

class App extends Component {

  state = {
    wordTab: ["gare", "train", "livre", "chat", "chien", "mouton", "piano"],
    currentWord:null,
    alphabet :"ABCDEFGHIJKLMNOPQRSTUVWXYZ".toLowerCase().split(''),
    usedLetter:[],
    win:0, // neutre | -1 lost | 1 win
    attempt:0,
    maxAttempt:9
  
  }
  //Méthode appelée par React quand les éléments sont rendus
  componentDidMount() {
    window.addEventListener("keyup", (e) =>{
      // si touche entrée
      if(e.keyCode === 13){
        //on initialise le jeu
          this.initGame();
        console.log(e)
      }    
    })
  }

  // retourne aléatoirement le mots contenus dans le tableau wordTab
  newWord = () =>{
    const randomIndex = Math.floor(Math.random()* this.state.wordTab.length)
    return this.state.wordTab[ randomIndex ]
  }

  //Changement d'etat en fonction de la lettre clickée
  clickLetter = (letter) =>{
    if(this.state.usedLetter.indexOf(letter) === -1){
     
      const usedLetter = [letter, ...this.state.usedLetter]
      let attempt = this.state.attempt

        if(this.state.currentWord.indexOf(letter) === -1){
          attempt = this.state.attempt +1
        }
        
        let win = 1
        for(let i =0; i< this.state.currentWord.length; i++){
          if( usedLetter.indexOf(this.state.currentWord[i]) === -1 ){
              win = 0
          }
        }
        if( attempt >= this.state.maxAttempt && win === 0){
          win = -1
        }
        this.setState({ usedLetter, attempt, win})

    }else{
      //console.log("la lettre est déjà traité")
    }
  }

  //Initialisation du jeu
  initGame = () => {
  
    this.setState({
      currentWord: this.newWord(),
      usedLetter:[],
      win:0,
      attempt:0
    })
  }

  render(){
    return(
      <div id="game">
          <div id="header">
              <h1>Jeu</h1>
          </div>
          {
            (this.state.currentWord !== null) && 
              <Life
                attempt={this.state.attempt}
                maxAttempt={this.state.maxAttempt}
              />
          }
          {
            (this.state.currentWord !== null) && 
                <CurrentWord
                  currentWord={ this.state.currentWord }
                  usedLetter ={ this.state.usedLetter }
                  win ={ this.state.win }
                />
          }
          {
            (this.state.win === 0 && this.state.currentWord != null) &&
                <Keyboard
                alphabet={this.state.alphabet}
                usedLetter={this.state.usedLetter}
                action={this.clickLetter}  
                />
          }
          {
            (this.state.win === 1) &&
                <p class="win">GAGNE !!!!</p>
          }
          {
            (this.state.win === -1) &&
                <p class="win">PERDU !!!!</p>
          }
          {
            (this.state.currentWord === null || this.state.win === 1) &&
                <div id="newGame">
                  <button onClick={()=>this.initGame()} id="button-newGame">Nouvelle partie</button>
                </div>
          }
      </div>
    )
  }
}

export default App;
