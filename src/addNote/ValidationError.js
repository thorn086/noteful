import React from 'react'

export default function ValidationError(props){
    if(props.message) {
        return(
            <div className="errorMessage">{props.message}</div>
        )
    }
    return <></>
}