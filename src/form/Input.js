import React from 'react';
import { HOC } from '../module';

function Input({ type, name, placeholder, value = '', setValue }) {
    return (
        <input
            className='form-control'
            type={type || 'text'}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={e => setValue(e.target.value)} />
    );
}

export default HOC(Input);
