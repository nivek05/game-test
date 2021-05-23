import './App.css'
import React from 'react'

const CurrentWord = ({ currentWord, usedLetter, win }) =>{

    return(
        <div id="current_word">
            {
                currentWord.split('').map(
                (letter, key) => {
                    let status = "finded"
                   
                    if (usedLetter.indexOf(letter) === -1 ){
                       
                        if ( win === -1 ){
                            status = "lost"
                        }else{
                            status = "notFinded"
                        }
                    }
                  
                    return <span key={"letter_"+ key} className={status}>
                        { status === 'finded' ? letter : 
                            (win === -1 ? letter : "?") }
                        </span> 
                }
            )
            }
        </div>
    )
}

export default CurrentWord;