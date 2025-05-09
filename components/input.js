import { useId, useRef } from "react";

/**
 * This component is basically an input element but shortens a lot of code
 */
export default function Input({ name, value, label, required, type, onChange, validity }) {
    const id = useId();
    const element = useRef();

    function handleChange(e) {
        onChange(type == 'checkbox' ? e.target.checked : e.target.value);
    }

    return <>
        <label htmlFor={id}>{label}</label>
        {type == 'textarea' ? (
            <textarea
                id={id}
                name={name}
                value={value}
                required={required}
                onChange={handleChange}
                placeholder={placeholder}
                ref={element}
                className="input"
            /> 
        ) : (
            <input 
                id={id}
                className="input"
                required={required}
                value={value}
                name={name}
                type={type}
                ref={element}
                onChange={handleChange}
            />
        )}
        
        <span class="text-red-400">{validity}</span>
    </>;
}