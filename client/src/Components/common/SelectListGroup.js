import React from "react";
import classnames from "classnames"

const SelectListGroup = ({
    name,
    value,
    options,
    info,
    error,
    onChange
}) =>{
    console.log('optionds',options)
    const selectOption = options.map(option=>(
    <option key={option.label} value={option.value}> 
    {option.label}
    </option>
    ));
    return(
        <div className= "form-group">
            <select
            name={name}
            className= {classnames("form-control form-control-lg",{  
                "is-invalid": error
            })}
            onChange={onChange}
            value= {value}
            > {selectOption} </select>
            {info && <small className= "form-text text-muted">{info}</small>}
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};
export default SelectListGroup