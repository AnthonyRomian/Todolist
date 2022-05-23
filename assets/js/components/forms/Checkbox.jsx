import React from 'react';

const Checkbox = ({name, value, checked, error = "", label, onChange}) => {
    return (
        <div className="form-group my-2">
            <label className="fs-3 mb-1" htmlFor={name}>{label}</label>
            <input
                className="mx-3"
                onChange={onChange}
                name={name}
                id={name}
                value={value}
                type="checkbox"
            >
            </input>
            <p className="invalid-feedback">{error}</p>
        </div>
    );
};

export default Checkbox;