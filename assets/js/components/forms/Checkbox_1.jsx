
import React, { useState} from 'react';
import todolistsAPI from "../../services/todolistsAPI";



const Checkbox_1 = ({ name, value, error = "", label, onChange }) => {

    return (
    <div className="form-group col-12 col-sm-6 col-xl-6 my-2">
      <label className="fs-3 mb-1" htmlFor={name}>{label}</label>
      <input
        onChange={onChange}
        name={name}
        id={name}
        value={value}
        defaultChecked={value}
        type="checkbox"
      >
      </input>
      <p className="invalid-feedback">{error}</p>
    </div>
  );
};

export default Checkbox_1;