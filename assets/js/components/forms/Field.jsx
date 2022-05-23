import React from 'react';


const Field = ({name, label, value, onChange, placeholder, type = "text", error = ""}) =>
     (
        <div className="form-group col-12   my-2">
        <label className="fs-3 mb-1" htmlFor={name}>{label}</label>
        <input
            value={value}
            onChange={onChange}
            className={"form-control" + (error && " is-invalid")}
            type={type}
            placeholder={placeholder || label}
            name={name}
            id={name} />
        {error && <p className="invalid-feedback">{error}</p>}
    </div>
    );


export default Field;