import './App.css'
import React  from 'react'

const Life = ({ attempt, maxAttempt }) =>{
    return (
        <div id="life">
            { 
                attemptToLife(attempt, maxAttempt).map (
                    (value, key) => {
                        return <span key={"life_"+key} className={"life "+(value ===1  ? "full" : "empty")}></span>
                    }
                )
            }
        </div>
    )
}

function attemptToLife(attempt, maxAttempt){
    let life = []
    for (let i = 1; i <= maxAttempt; i++ ){
        if(i <= attempt ){
            life.push(0)
        }else{
            life.push(1)
        }
    }
    return life
}

export default Life;