import React from 'react'

 const InputGroup=({
name,
placeholder,
value,
error,
icon,
type,
onChange
 }) => {
     return (
            <div className="input-group mb-3">
                <div className= "input-group-prepend">
                    <span className= "input-group-text">
                        <i className={icon}/>
                        </span> 
                </div>
                
            </div>
        )
    
    }
export default InputGroup