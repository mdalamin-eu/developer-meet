import React from "react";
import classnames from "classnames";

const TextFieldGroup = (props) => {
    //distructering
    const { 
        name,
        type,
        placeholder,
        error,
        disabled,
        value,
        info,
        onChange} = props
  return (
    <div className="form-group">
      <input
        type={type}
        className={classnames("form-control form-control-lg")}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};


export default TextFieldGroup;