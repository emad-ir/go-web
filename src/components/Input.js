import React from 'react'

export const Input = ({ type = "text", value = "", rows = "6", placeholder = "", min = "", max = "", error = null, onChange, required, name = "" }) => (
    <div className="input-container">
        <input min={min} max={max} type={type} rows={rows} name={name} value={value} placeholder={placeholder} onChange={onChange} required={required} />
        {error && <p className="error">{error}</p>}
    </div>
);

export default Input