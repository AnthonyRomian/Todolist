
import React from "react";

const Select = ({ name, value,checked, error = "", label, onChange, children }) => {
  return (
    <div className="form-group col-12 col-sm-6 col-xl-6 my-2">
      <label className="fs-3 mb-1" htmlFor={name}>{label}</label>
      <select
        onChange={onChange}
        name={name}
        id={name}
        value={value}
        className={"form-control" + (error && " is-invalid")}
        checked={checked}
      >
        {children}
      </select>
      <p className="invalid-feedback">{error}</p>
    </div>
  );
};

export default Select;