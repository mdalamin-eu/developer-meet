import React from "react";
import classnames from "classnames";

const TextFieldGroup = (props) => {
    //distructering
    const { 
        name,
        type,
        placeholder,
        value,
        info,
        onChange} = props
  return (
    <div className="form-group">
      <input
        type={type}
        className={classnames("form-control form-control-lg")}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
      />
      {info && <small className="form-text text-muted">{info}</small>}
    
    </div>
  );
};

export default TextFieldGroup;